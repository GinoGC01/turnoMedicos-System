import { google } from "googleapis";
import path from "path";
import { fileURLToPath } from "url";

// Convertir la URL del módulo a una ruta de archivo
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Ruta absoluta al archivo google.json
const keyFilePath = path.join(__dirname, "../credentials/google.json");

const auth = new google.auth.GoogleAuth({
  keyFile: keyFilePath, // Usar la ruta absoluta
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
    // Obtener la próxima fila vacía
    const nextRow = await getNextEmptyRow(spreadsheetId, sheetName);

    // Construir el rango dinámico (por ejemplo, "Test-ProFast!A2:D2")
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
