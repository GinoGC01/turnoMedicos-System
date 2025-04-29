import User from '../models/user.js'
import { verificationAuth } from '../utils/verifications/auth.js'
import bcrypt from 'bcryptjs'
import { genericPassV0 } from '../utils/generateGenericPass.js'
import jwt from 'jsonwebtoken'
import { JWT_KEY } from '../config.js'

export class authController {
  static async registerUser (req, res) {
    const { nombre, edad, dni, email, telefono, password } = req.body
    const { status, message } = verificationAuth.validateRegister({ nombre, edad, dni, email, telefono, password })
    if (status !== 200) return res.status(status).json(message)

    try {
      const emailExist = await User.find({ email })
      const dniExist = await User.find({ dni })
      if (emailExist.length === 1 && emailExist[0] === email) return res.json({ message: 'Email existente' })
      if (dniExist.length === 1 && dniExist[0] === dni) return res.json({ message: 'DNI existente' })
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

    res.json({ message: 'Usuario registrado con exito' })
  }

  static async registerUserBySlot (data) {
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

  static async login (req, res) {
    const { dni, password } = req.body

    try {
      const user = await User.find({ dni })

      if (user.length === 0) res.status(201).json({ message: 'Usuario inexistente' })

      const verifyPass = bcrypt.compare(password, user[0].password)

      if (verifyPass) {
        const token = jwt.sign({
          id: user[0]._id,
          username: user[0].nombre,
          dni: user[0].dni
        },
        JWT_KEY, {
          expiresIn: '1h'
        })

        const userSend = {
          nombre: user[0].nombre,
          edad: user[0].edad,
          dni: user[0].dni,
          email: user[0].email,
          telefono: user[0].telefono,
          atenciones: user[0].atentions
        }
        res.status(200)
          .cookie('access_token', token, {
            httpOnly: true
          })
          .json({ user: userSend, token })
        return
      }

      res.send('Contrasenia incorrecta')
    } catch (error) {
      console.error(error)
      res.status(401).json({ message: 'Error al loguear', error })
    }
  } // to do -> review user send

  static async logout (req, res) {
    res.clearCookie('access_token').json({ message: 'sesion cerrada', closeStatus: true })
  }

  static async getUserProfile (req, res) {
    const { user } = req.session
    if (user) {
      const { id } = user
      try {
        const result = await User.findById(id)
        if (!result) {
          console.log('error al encontrar usuarios')
          const response = { message: 'error al encontrar usuarios', status: 'Error find users', result }
          return res.status(401).json(response)
        }

        const userFinded = {
          nombre: result.nombre,
          edad: result.edad,
          dni: result.dni,
          email: result.email,
          telefono: result.telefono,
          atenciones: result.atentions

        }
        return res.status(200).json(userFinded)
      } catch (error) {
        console.error(error)
      }
    }
    res.json({ message: 'inicia sesion para continuar', sesionStatus: false })
  }
}
