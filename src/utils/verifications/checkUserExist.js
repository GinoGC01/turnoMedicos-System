import User from "../../models/user.js";

export const checkUserExistAndSave = async (data) => {
  const { dni, nombre, edad, profesionalId, servicioId, turnoId, email, telefono, fechaTurno} = data

  // Validación
  if (!dni || !nombre || !edad || !profesionalId || !servicioId || !turnoId || !fechaTurno) {
    return { message: 'Faltan datos obligatorios', status: 'error' };
  }

  try {
    const user = await User.findOne({ dni });
    const dateTurno = new Date(fechaTurno)

    if (!user) {
      // crea usuario
      const newUser = new User({
        nombre,
        edad,
        dni,
        email,
        telefono,
        atentions: [{ profesionalId, servicioId, turnoId, dateTurno }] // Inicializa el arreglo de atenciones
      });
      const savedUser = await newUser.save();
      return { message: 'Usuario registrado con éxito', user: savedUser, status: 'registered' };
      
    } else {
      const nuevaAtencion = { profesionalId, servicioId, turnoId, dateTurno };
      //delete atention registered
      const updateAtentions = await User.updateOne({ dni }, { $push: { atentions: nuevaAtencion } }); // agrega la nueva atención
      return { message: 'Atención agregada a usuario existente', status: 'already registered', updateAtentions};
    }
  } catch (error) {
    console.error('Error en checkUserExistAndSave:', error);
    return { message: 'Error al consultar usuario', status: 'error' };
  }
};