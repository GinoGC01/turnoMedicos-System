import Turno from "../models/turnos.js";
import Profesional from "../models/professionals.js";
import { writeInSheet } from "./writeInSheets.js";
import { sheetSlot } from "./sheetSlot.js";
import { calculateMinDuration } from "./calculateMinDurationSvProfesional.js";

export const saveTurnoAndWritingSheet = async (turnoId, data) => {
  try {
    // Obtener el turno inicial
    const initialTurno = await Turno.findById(turnoId);
    if (!initialTurno || initialTurno.status !== 'available') {
      return { message: "Turno no disponible", status: false };
    }

    // Obtener el profesional y el servicio
    const profesional = await Profesional.findById(initialTurno.profesionalId).populate("services");
    const service = profesional.services.find((s) => s.id === data.servicio_id);

    if (!service) {
      return { message: "Servicio no encontrado", status: false };
    }

    // Calcular cuántos slots base se necesitan
    const baseSlotDuration = calculateMinDuration(profesional) * 60 // Duración de cada slot base en minutos
    const serviceDuration = service.duration * 60 //duracion del servicio en minutos
    const slotsNeeded = Math.ceil(serviceDuration / baseSlotDuration);

    // Obtener los slots base consecutivos necesarios
    const slotsToBook = await Turno.find({
      profesionalId: initialTurno.profesionalId,
      date: initialTurno.date,
      startTime: { $gte: initialTurno.startTime },
      status: "available",
    })
      .sort({ startTime: 1 })
      .limit(slotsNeeded);

    // Verificar si hay suficientes slots disponibles
    if (slotsToBook.length < slotsNeeded) {
      return { message: "No hay suficientes turnos disponibles", status: false };
    }

    // Escribir en la hoja de cálculo
    const response = await writeInSheet(sheetSlot(profesional, initialTurno, data));

    if (response.status === 'error') {
      return { message: "Error al escribir en sheets", status: false };
    }

    // Marcar los slots como "booked"
    for (const slot of slotsToBook) {
      slot.status = 'booked';
      await slot.save();
    }

    return { message: "Turno reservado y datos guardados en sheets", status: true };
  } catch (error) {
    return { message: error.message, status: false };
  }
}