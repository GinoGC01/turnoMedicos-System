import User from "../models/user.js";
import { verificationAtention } from "./verifications/verification.atentionRegistered.js";

export const checkUserExistAndSave = async (data) => {
  const { dni, nombre, edad, profesionalId, servicio_id:servicioId, turnoId } = data;

  // Validación
  if (!dni || !nombre || !edad || !profesionalId || !servicioId || !turnoId) {
    return { message: 'Faltan datos obligatorios', status: 'error' };
  }

  try {
    const user = await User.findOne({ dni });

    if (!user) {
      // crea usuario
      const newUser = new User({
        nombre,
        edad,
        dni,
        atentions: [{ profesionalId, servicioId, turnoId }] // Inicializa el arreglo de atenciones
      });
      const savedUser = await newUser.save();
      return { message: 'Usuario registrado con éxito', user: savedUser, status: 'registered' };
      
    } else {
      const nuevaAtencion = { profesionalId, servicioId, turnoId };
      const atentionRegistered = verificationAtention(user, nuevaAtencion);
      if(atentionRegistered) return { message: 'Atención existente', status: 'atention registered'};
      const updateAtentions = await User.updateOne({ dni }, { $push: { atentions: nuevaAtencion } }); // agrega la nueva atención
      return { message: 'Atención agregada a usuario existente', status: 'already registered', updateAtentions};
    }
  } catch (error) {
    console.error('Error en checkUserExistAndSave:', error);
    return { message: 'Error al consultar usuario', status: 'error' };
  }
};