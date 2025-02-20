import { writeToSheet } from "../controllers/googleSheets.js";
export const writeInSheet = async (turno) =>{
    const {nombre, dni, especialista, profesion, fecha, hora} = turno
    if (!nombre || !especialista || !fecha || !hora || !dni || !profesion ) {
        const error = {
            message: "Faltan datos requeridos: nombre, especialista, fecha o hora.",
            status: "error"
        }
        return error.message
      }
    
      const spreadsheetId = "1FEyvn7Syw5Wukm1CdtF2M6lVYkt8il8d6ndqq97xMRY";
      const sheetName = "Test-ProFast"; // Nombre fijo de la hoja
    
      const values = [[nombre, dni,  especialista, profesion, fecha, hora]];
    
      try {
        const response = await writeToSheet(spreadsheetId, sheetName, values);
        if (response) {
            const susces = { message: "Turno agendado correctamente", status:"susces" }
            return susces
        }
      } catch (error) {
        console.error("Error al escribir en sheets", error);
        return { message: "Error, turno no agendado" }
      }
}