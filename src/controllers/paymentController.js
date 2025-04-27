import { Payment, Preference } from 'mercadopago'
import Turno from '../models/turnos.js'
import { getClient } from '../utils/mercadoPago/getClientMP.js'
import { checkAvailabilitySlot } from '../utils/verifications/checkAvailabiltySlot.js'
import { bodyForOrderMercadoPago } from '../utils/bodys/bodyForOrderMercadoPago.js'
import { webhookPayment } from '../utils/mercadoPago/webhookPayment.js'
import { dataReferenceSchema } from '../schemas/dataReferenceSchema.js'
import Consultorio from '../models/consultorios.js'
import { Mutex } from 'async-mutex'

let dataReference = null

const mutex = new Mutex() // Mutex global

export class PaymentController {
  static async createOrder (req, res) {
    const { turnoId } = req.params // turno inicial
    const { nombre, dni, edad, email, telefono, servicioId } = req.body
    const release = await mutex.acquire() // Bloquea el recurso

    if (!turnoId || !nombre || !edad || !dni || !servicioId || !telefono || !email) {
      return res.status(400).json({ status: false, message: 'Faltan datos' })
    }

    try {
      const response = await checkAvailabilitySlot(turnoId, servicioId)
      const turno = await Turno.findById(turnoId).populate('profesionalId')
      const consultorio = await Consultorio.find({ professionals: turno.profesionalId._id }) // revisar esta funcion\

      if (!turno || turno.status !== 'available' || response.availabilitySlot !== 'available') {
        return res.status(400).json({ message: 'Turno no disponible' })
      }

      const newDataReference = {
        nombre,
        dni,
        edad,
        telefono,
        email,
        id: turno.id,
        service: response.service,
        profesionalId: turno.profesionalId._id,
        nombreConsultorio: consultorio[0].name,
        turno
      }

      const { error, value } = dataReferenceSchema.validate(newDataReference, { allowUnknown: true })

      if (error) {
        const response = { message: 'Error de validacion de datos', error: error.details }
        console.error(response)
        return res.status(400).json(response)
      } else {
        console.log('--->>> objeto válido')
        dataReference = value
      }

      const preference = new Preference(getClient())
      const body = bodyForOrderMercadoPago(dataReference)

      // Crear la preferencia en MercadoPago
      const responseMercadoPago = await preference.create({ body })
      const paymentURL = responseMercadoPago.init_point

      res.json({ urlFront: paymentURL })
    } catch (error) {
      res.status(500).json({ message: error.message })
    } finally {
      release()
    }
  }

  static async webhook (req, res) {
    const { id, topic } = req.query
    const payment = new Payment(getClient())
    const release = await mutex.acquire() // Bloquea
    try {
      if (topic === 'payment' && dataReference !== null) {
        const response = await webhookPayment(payment, id, dataReference)
        dataReference = null
        res.status(response.status).json(response.json)
      }

      res.status(204)
    } catch (error) {
      console.error(error)
      res.status(400).json({ errorMessage: 'error WEBHOOK', error })
    } finally {
      release()
    }
  }
}
