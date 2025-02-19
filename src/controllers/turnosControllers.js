import Turno from "../models/turnos.js";
// import Profesional from "../models/Profesional.js";
import Consultorio from "../models/consultorios.js";
import { generateSlots } from "../utils/generateSlots.js";

export const getAvailableSlots = async (req, res) => {
  const { professionalId, month, year } = req.params;

  try {
    const monthData = parseInt(month, 10) - 1;
    const yearData = parseInt(year, 10);
    
    // Crear fecha de inicio del mes (primer día a las 00:00:00 hora local)
    const startDateOfSlots = new Date(yearData, monthData, 1);
    startDateOfSlots.setHours(0, 0, 0, 0); // Asegura que sea a medianoche (hora local)

    // Crear fecha de fin del mes (último día a las 23:59:59 hora local)
    const endOfSlots = new Date(yearData, monthData + 1, 0);
    endOfSlots.setHours(23, 59, 59, 999); // Asegura que sea el último minuto del mes


    // Buscar los turnos que no están reservados en el rango de fechas
    const turno = {
      isBooked: false,
      profesionalId: professionalId,
      date: { $gte: startDateOfSlots, $lte: endOfSlots }
    };
    
    console.log(turno);  // Para ver el objeto de búsqueda

    const slots = await Turno.find(turno);

    if (!slots || slots.length === 0) {
      return res.status(401).json({ message: "No se encontraron turnos disponibles", slots });
    }

    res.status(200).json(slots);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
}; //todos los turnos disponibles ese mes, de ese anio

export const bookTurno = async (req, res) => {
  const { turnoId } = req.params;

  try {
    const turno = await Turno.findById(turnoId);
    if (!turno || turno.isBooked) {
      return res.status(400).json({ message: "Turno no disponible" });
    }

    turno.isBooked = true;
    await turno.save();
    res.status(200).json({ message: "Turno reservado con éxito" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const createTurnos = async (req, res) =>{
  try {
    const { consultorioId, month, year } = req.body;
    const consultorio = await Consultorio.findById(consultorioId).populate(
      "professionals"
    );
    console.log(consultorio)
    if (!consultorio)
      return res.json({ message: "consultorio no encontrado" });

    // Generar y guardar los turnos para cada profesional
    const savedSlots = [];
    for (const profesional of consultorio.professionals) {
      const slots = generateSlots(profesional, month, year);

      // Guardar los turnos en la base de datos
      const savedTurnos = await Turno.insertMany(slots);
      savedSlots.push(...savedTurnos);
    }

    res.status(201).json({ message: 'Turnos generados y guardados con éxito', slots: savedSlots });

  } catch (error) {
    res.status(500).json({ message: error.message });
  }
}

export const getAllSlots = async (req, res) => {
  try{
    const allSlots = await Turno.find()
  if(!allSlots){
    res.status(401).json({message: "Error al obtener los turnos"})
  }
  res.send({message: "turnos obtenidos con exito",
    allSlots
  })
  } catch(error){
    res.status(500).json({message: "error al objetener los turnos", error: error.message})
  }
}
