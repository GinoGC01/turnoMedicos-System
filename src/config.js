import { config } from "dotenv"
config()


export const PORT = 3000
export const URL = `http://localhost:`

export const HOST = `${URL}${PORT}`

export const NGROK_URL = 'https://4f0c-2803-9800-9024-87c3-a188-90b6-cab1-405d.ngrok-free.app/api/webhook' //actualizar

export const MERCADOPAGO_API_KEY = process.env.MERCADOPAGO_API_KEY
export const MERCADOPAGO_WEB_HOOK_KEY = process.env.MERCADOPAGO_WEB_HOOK_KEY



export const SPREADSHEET_ID = "1FEyvn7Syw5Wukm1CdtF2M6lVYkt8il8d6ndqq97xMRY"

export const SHEET_NAME = "Test-ProFast" //nombre fijo que lleva la hoja


