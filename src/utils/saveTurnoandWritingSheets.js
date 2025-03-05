import { writeInSheet } from "./writeInSheets.js";
import { sheetSlot } from "./sheetSlot.js";
import { checkAvailabilitySlot } from "./checkAvailabiltySlot.js";

export const saveTurnoAndWritingSheet = async (turnoId, data) => {
  try {
    const responseSlot = await checkAvailabilitySlot(turnoId, data.servicio_id)

    const {profesional, slotsToBook, initialTurno} = responseSlot
    
    // Escribir en la hoja de cálculo
    const response = await writeInSheet(sheetSlot(profesional, initialTurno, data));

    if (response.status === 'error') {
      console.log('error al escribir en la hoja de sheets')
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