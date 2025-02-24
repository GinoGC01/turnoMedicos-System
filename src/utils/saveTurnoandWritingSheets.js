import Turno from "../models/turnos.js";
import Profesional from "../models/professionals.js";
import { writeInSheet } from "./writeInSheets.js";
import { sheetSlot } from "./sheetSlot.js";

export const saveTurnoAndWritingSheet = async (turnoId, data) => {
    try {
        const turno = await Turno.findById(turnoId);
        if (!turno || turno.isBooked) {
          const responseFindedTurno = { message: "Turno no disponible", status: false }
          return responseFindedTurno;
        }
    
        const profesional = await Profesional.findById(turno.profesionalId)
        const response = await writeInSheet(sheetSlot(profesional, turno, data))
    
        if(response.status === 'error'){
            const responseSaveSlot = { message: "Error al escribir en sheets", status: false }
            console.log(responseSaveSlot)
            return responseSaveSlot
        }

        const responseSaveSlot = { message: "Datos guardados en sheets", status: true }
        turno.isBooked = true;
        await turno.save();
        return responseSaveSlot
      } catch (error) {
        return { message: error.message };
      }
}