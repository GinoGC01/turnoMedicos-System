import { config } from "dotenv"
config()


export const PORT = 3000
export const HOOST = `http://localhost:${PORT}`

export const MERCADOPAGO_API_KEY = process.env.MERCADOPAGO_API_KEY
export const MERCADOPAGO_WEB_HOOK_KEY = process.env.MERCADOPAGO_WEB_HOOK_KEY