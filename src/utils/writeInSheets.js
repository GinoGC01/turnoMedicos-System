import { writeToSheet } from "../controllers/googleSheets.js";
import { SHEET_NAME, SPREADSHEET_ID } from "../config.js";


export const writeInSheet = async (turno) =>{
    const {nombre, dni, edad, especialista, profesion, fecha, hora, payment_id, payment_payer_email, payment_payer_identification, payment_transaction_amount,payment_net_received_amount, payment_fecha  } = turno


    if (!nombre || !especialista || !fecha || !hora || !dni || !profesion || !payment_id || !payment_payer_email || !payment_transaction_amount || !payment_net_received_amount || !edad) {
        const error = {
            message: "Faltan datos requeridos: nombre, especialista, fecha u hora.",
            status: "error"
        }
        return error
      }

      const values = [[nombre, dni, edad, especialista, profesion, fecha, hora, payment_id, payment_payer_email, payment_payer_identification, payment_transaction_amount,payment_fecha, payment_net_received_amount]];
    
      try {
        const response = await writeToSheet(SPREADSHEET_ID, SHEET_NAME, values);
        if (response) {
            const susces = { message: "Turno agendado correctamente", status:"susces" }
            return susces
        }
      } catch (error) {
        console.error("Error al escribir en sheets", error);
        return { message: "Error, turno no agendado" }
      }
}