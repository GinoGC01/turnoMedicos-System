import Turno from "../models/turnos.js";
import Consultorio from "../models/consultorios.js";
import Profesional from "../models/professionals.js"
import { generateSlots } from "../utils/generateSlots.js";
import { findAvailableSlotsByMonthYear } from "../utils/findAvailableSlotsByMonthYear.js";
import { writeInSheet } from "../utils/writeInSheets.js";
import { sheetSlot } from "../utils/sheetSlot.js";
import mercadopago from 'mercadopago'

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


export const bookTurno = async (req, res) => {
  const { turnoId } = req.params;

  try {
    const turno = await Turno.findById(turnoId);
    
    if (!turno || turno.isBooked) {
      return res.status(400).json({ message: "Turno no disponible" });
    }

    turno.isBooked = true;
    await turno.save();


    const profesional = await Profesional.findById(turno.profesionalId)


    const response = await writeInSheet(sheetSlot(profesional, turno, req.body))

    if(!response){
      return res.status(500).json({ message: "Error al escribir en sheets" })
    }

    res.status(200).json({ message: "Turno reservado con éxito", status: 'susces' });
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
    if (!consultorio)
      return res.json({ message: "consultorio no encontrado" });

    // Generar y guardar los turnos para cada profesional
    const savedSlots = [];
    for (const profesional of consultorio.professionals) {
      const slotTime = 1 //TO DO: revisar en services.duration
      const slots = generateSlots(profesional, month, year, slotTime);

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
