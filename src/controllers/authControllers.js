import User from '../models/user.js'
import { verificationAuth } from '../utils/verifications/auth.js'
import bcrypt from 'bcryptjs'
import { genericPassV0 } from '../utils/generateGenericPass.js'

export class authController {
  static async register (req, res) {
    const { nombre, edad, dni, email, telefono, password } = req.body
    const { status, message } = verificationAuth.validateRegister({ nombre, edad, dni, email, telefono, password })
    if (status !== 200) return res.status(status).json(message)

    try {
      const emailExist = await User.find({ email })
      const dniExist = await User.find({ dni })
      if (emailExist) return res.json({ message: 'Email existente' })
      if (dniExist) return res.json({ message: 'DNI existente' })
      const hashPass = await bcrypt.hash(password, 10)

      const newUser = new User({
        nombre,
        edad,
        dni,
        email,
        telefono,
        password: hashPass,
        atentions: [] // Inicializa el arreglo de atenciones
      })

      newUser.save()
    } catch (error) {
      console.error(error)
      res.status(400).json({ message: 'error authControllers' }) // review
    }

    res.json(status)
  }

  static async registerBySlot (data) {
    const { dni, nombre, edad, profesionalId, servicioId, turnoId, email, telefono, fechaTurno } = data
    const { status, message } = verificationAuth.validateRegister({ dni, nombre, edad, email, telefono, fechaTurno })
    // Validación
    if (status !== 200) {
      return { status, message }
    }

    const { pass } = genericPassV0(nombre, dni)

    try {
      const dateTurno = new Date(fechaTurno)
      const hashPass = bcrypt.hash(pass, 10)

      // crea usuario
      const newUser = new User({
        nombre,
        edad,
        dni,
        email,
        telefono,
        password: hashPass,
        atentions: [{ profesionalId, servicioId, turnoId, dateTurno }] // Inicializa el arreglo de atenciones
      })
      const savedUser = await newUser.save()
      return { message: 'Usuario registrado con éxito', user: savedUser, status: 'registered' }
    } catch (error) {
      console.error('Error en checkUserExistAndSave:', error)
      return { message: 'Error al consultar usuario', status: 'error' }
    }
  }
}
