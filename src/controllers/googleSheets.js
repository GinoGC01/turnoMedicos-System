import { google } from "googleapis";
import { GOOGLE_JSON_KEY } from "../config.js";

const credentials = typeof GOOGLE_JSON_KEY === 'string' ? JSON.parse(GOOGLE_JSON_KEY) : GOOGLE_JSON_KEY;

const auth = new google.auth.GoogleAuth({
  credentials: credentials,
  scopes: "https://www.googleapis.com/auth/spreadsheets",
});

const sheets = google.sheets({ version: "v4", auth });

async function getNextEmptyRow(spreadsheetId, sheetName) {
  try {
    // Obtener los valores de la columna A (o cualquier columna que siempre tenga datos)
    const response = await sheets.spreadsheets.values.get({
      spreadsheetId,
      range: `${sheetName}!A:A`, // Consultar solo la columna A
    });

    const values = response.data.values;

    // Si no hay valores, la próxima fila vacía es la primera (fila 1)
    if (!values || values.length === 0) {
      return 1;
    }

    // La próxima fila vacía es la longitud de los valores + 1
    return values.length + 1;
  } catch (error) {
    console.error("Error al obtener la próxima fila vacía:", error);
    throw error;
  }
}

export async function writeToSheet(spreadsheetId, sheetName, values) {
  try {
    //próxima fila vacía
    const nextRow = await getNextEmptyRow(spreadsheetId, sheetName);

    // rango dinámico ("Test-ProFast!A2:D2")
    const range = `${sheetName}!A${nextRow}:D${nextRow}`;

    const request = {
      spreadsheetId,
      range,
      valueInputOption: "RAW",
      resource: { values },
    };

    // Escribir los datos en la hoja
    const response = await sheets.spreadsheets.values.append(request);
    console.log("Datos escritos en la hoja:", response.data);
    return response.data;
  } catch (error) {
    console.error("Error al escribir en la hoja:", error);
    throw error;
  }
}
