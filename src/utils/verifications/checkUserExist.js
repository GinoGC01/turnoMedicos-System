import { authController } from '../../controllers/authControllers.js'
import User from '../../models/user.js'
import { verificationAuth } from './auth.js'

export const checkUserExistAndSave = async (data) => {
  const { dni, nombre, edad, profesionalId, servicioId, turnoId, email, telefono, fechaTurno } = data
  const { status, message } = verificationAuth.validateRegister({ dni, nombre, edad, email, telefono, fechaTurno })

  // Validación
  if (status !== 200) {
    return { status, message }
  }

  try {
    const user = await User.findOne({ dni })
    const dateTurno = new Date(fechaTurno)

    if (!user) {
      await authController.registerBySlot(data)
    } else {
      const nuevaAtencion = { profesionalId, servicioId, turnoId, dateTurno }
      // delete atention registered
      const updateAtentions = await User.updateOne({ dni }, { $push: { atentions: nuevaAtencion } }) // agrega la nueva atención
      return { message: 'Atención agregada a usuario existente', status: 'already registered', updateAtentions }
    }
  } catch (error) {
    console.error('Error en checkUserExistAndSave:', error)
    return { message: 'Error al consultar usuario', status: 'error' }
  }
}
