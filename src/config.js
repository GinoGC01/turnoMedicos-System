import { config } from "dotenv"
config()


export const PORT = 3000
export const URL = `http://localhost:`

export const HOST = `${URL}${PORT}`

export const NGROK_URL = 'https://5d57-2803-9800-9024-87df-6d0d-20e9-5561-1bd6.ngrok-free.app/api/webhook' //actualizar

export const MERCADOPAGO_API_KEY = process.env.MERCADOPAGO_API_KEY
export const MERCADOPAGO_WEB_HOOK_KEY = process.env.MERCADOPAGO_WEB_HOOK_KEY



export const SPREADSHEET_ID = "1FEyvn7Syw5Wukm1CdtF2M6lVYkt8il8d6ndqq97xMRY"

export const SHEET_NAME = "Test-ProFast" //nombre fijo que lleva la hoja

export const GOOGLE_JSON_KEY = {
  type: process.env.type,
  project_id: process.env.project_id,
  private_key_id: process.env.private_key_id,
  private_key: process.env.private_key,
  client_email: process.env.client_email,
  client_id: process.env.client_id,
  auth_uri: process.env.auth_uri,
  token_uri: process.env.token_uri,
  auth_provider_x509_cert_url: process.env.auth_provider_x509_cert_url,
  client_x509_cert_url: process.env.client_x509_cert_url,
  universe_domain: process.env.universe_domain
};


