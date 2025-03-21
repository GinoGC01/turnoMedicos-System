import  { Payment, Preference  }  from  'mercadopago' ;
import Turno from '../models/turnos.js';
import { getClient } from '../utils/mercadoPago/getClientMP.js';
import { saveTurnoAndWritingSheet } from '../utils/saveTurnoandWritingSheets.js';
import { checkAvailabilitySlot } from '../utils/verifications/checkAvailabiltySlot.js';
import { bodyForOrderMercadoPago } from '../utils/bodys/bodyForOrderMercadoPago.js';
import { checkUserExistAndSave } from '../utils/verifications/checkUserExist.js';


export const createOrder = async (req, res)=>{
    const { turnoId } = req.params; //turno inicial
    const {nombre, dni, edad, servicioId} = req.body

    if(!turnoId || !nombre || !edad || !dni || !servicioId){
      return res.status(400).json({ status:false, message: "Faltan datos" });
    }
    try{
      const response = await checkAvailabilitySlot(turnoId, servicioId)
      const turno = await Turno.findById(turnoId).populate('profesionalId');

      
      if (!turno || turno.status != 'available' || response.availabilitySlot != 'available' ) {
        return res.status(400).json({ message: "Turno no disponible" });
      }

      const externalDataReference = {
        nombre,
        dni,
        edad,
        id: turno.id,
        service: response.service,
        profesionalId: turno.profesionalId._id,
        turno
      }

      const preference = new Preference(getClient()); 
      const body = bodyForOrderMercadoPago(externalDataReference)
  
      // Crear la preferencia en MercadoPago
      const responseMercadoPago = await preference.create({body});
      const paymentURL = responseMercadoPago.init_point
      
      res.json({urlFront: paymentURL});
    }
    catch(error){
      res.status(500).json({ message: error.message });
    }
}

export const webhook = async (req, res)=>{
  const { id, topic} = req.query;
  const payment = new Payment(getClient());

  if(topic === 'payment' ){
    try {
      // Consulta el estado del pago
      const paymentDetails = await payment.get({ id });

      if(paymentDetails.status != 'approved') return res.status(400).json({error: 'pago no aprobado', status: 'Error'})

      // Obtener el external_reference del pago
      const externalReference = paymentDetails.external_reference;

      // Convertir el external_reference de vuelta a un objeto
      const externalData = JSON.parse(externalReference);

      // Extraer los datos del objeto
      const turnoId = externalData.turnoId;

      const data = {
        nombre:externalData.nombreCliente,
        dni:externalData.dniCliente,
        edad:externalData.edadCliente,
        profesionalId:externalData.profesionalId,
        turnoId : externalData.turnoId,
        servicio_id:externalData.IdServicioProfesional,
        payment_id: paymentDetails.id,
        payment_description: paymentDetails.description,
        payment_payer_email: paymentDetails.payer.email, // Email del comprador
        payment_payer_identification: paymentDetails.payer.identification.number, // Número de identificación del comprador (DNI COMPRADOR)
        payment_status: paymentDetails.status, // Estado del pago (ej: "approved")
        payment_status_detail: paymentDetails.status_detail, // Detalle del estado (ej: "accredited")
        payment_transaction_amount: paymentDetails.transaction_amount, // Monto total de la transacciónpayment_
        payment_net_received_amount: paymentDetails.transaction_details.net_received_amount, // Monto neto recibido
        payment_total_paid_amount: paymentDetails.transaction_details.total_paid_amount, // Monto total pagado
        payment_date_approved: paymentDetails.date_approved, // Fecha y hora de aprobación del pago
      };

      const user = await checkUserExistAndSave(data)
      console.log(user) // to do form by user information

      if(!user){
        return res.status(400).jason({message: "Error la registrar usuario", user})
      }

      const turnoGuardado = await saveTurnoAndWritingSheet(turnoId, data)
      if(!turnoGuardado) res.status(400).json({error:'error al guardar el turno'})
      res.status(200).json({message:'turno guardado con exito'});
    } catch (error) {
      console.error('Error al consultar el pago:', error);
      res.status(500).send('Error al consultar el pago');
    }
  
  }
  res.status(204)
}
