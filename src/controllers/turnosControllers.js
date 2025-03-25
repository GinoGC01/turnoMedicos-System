import Turno from "../models/turnos.js";
import Consultorio from "../models/consultorios.js";
import { generateSlots } from "../utils/generateSlots.js";
import { findAvailableSlotsByMonthYear } from "../utils/findAvailableSlotsByMonthYear.js";

export const getAvailableSlots = async (req, res) => {
  const { professionalId, month, year } = req.params;

  try {
    const turno = findAvailableSlotsByMonthYear(professionalId, month, year)
    const slots = await Turno.find(turno);

    if (!slots || slots.length === 0) {
      return res.status(401).json({ message: "No se encontraron turnos disponibles", slots });
    }

    res.status(200).json(slots);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
}; //todos los turnos disponibles ese mes, de ese anio

export const createTurnos = async (req, res) =>{
  try {
    const { consultorioId, month, year } = req.body;
    const consultorio = await Consultorio.findById(consultorioId).populate(
      "professionals"
    );
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
    if(!allSlots || allSlots.length === 0){
      return res.status(401).json({message: "No se registran turnos"})
    }
   res.send({message: "turnos obtenidos con exito",
      allSlots
    })
  } catch(error){
    res.status(500).json({message: "error al objetener los turnos", error: error.message})
  }
}

export const getAllSlotsByProfessionals = async (req, res) => {
  const {id} = req.params
  try{
    const allSlotsByProfessional = await Turno.find({profesionalId: id, status: 'available'})
    if(!allSlotsByProfessional){
      return res.status(401).json({message: "Error al obtener los turnos", satatus:"Error"})
    }

    if(allSlotsByProfessional.length === 0){
      return res.status(200).json({message: "No se registran turnos para este profesional", status:"No slots are registered"})

    }
      
   res.json({message: "turnos obtenidos con exito",
    allSlotsByProfessional
    })
  } catch(error){
    res.status(500).json({message: "error al objetener los turnos", error: error.message})
  }
}

export const deleteAvailableSlots = async (req, res)=>{
  const { professionalId, month, year } = req.params;
  
  try {
    const turno = findAvailableSlotsByMonthYear(professionalId, month, year)
    const slots = await Turno.deleteMany(turno);

    if (!slots || slots.length === 0) {
      return res.status(401).json({ message: "No se registran turnos disponibles", slots });
    }
    res.status(200).json({message:"turnos no tomados eliminados con exito",slots});
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
}

export const deleteSlot = async (req, res)=>{
  const {id}= req.body
  try{
    const slot = await Turno.deleteOne({_id:id})
    if(!slot)return res.status(401).json({message: "no se encontro el turno"})
    res.json({message:'turno eliminado con exito'})
  }catch(error){
    res.status(500).json({error: error.message})
  }
}

// temporally

export const deleteAllSlots = async (req, res)=>{
  const {profesionalId}= req.params
  try{
    const slot = await Turno.deleteMany({profesionalId})
    if(!slot)return res.status(401).json({message: "no se encontro el turno"})
    res.json({message:'turnos eliminados con exito'})
  }catch(error){
    res.status(500).json({error: error.message})
  }
} // delete all slots from professional in all ranges of dates, booked or not booked.
