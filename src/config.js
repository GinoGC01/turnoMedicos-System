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


export const GOOGLE_JSON_KEY = {
    type: "service_account",
    project_id: "upheld-rain-450520-r8",
    private_key_id: "6a30b99822a8f076ad49276b7a07b1362c3e0826",
    private_key: "-----BEGIN PRIVATE KEY-----\nMIIEvQIBADANBgkqhkiG9w0BAQEFAASCBKcwggSjAgEAAoIBAQDCYdUHF5R4qIJI\nrNGG0rI57snb7mYRtXn97B47r02mDXP+jbIkmEczU7y75jezplbqPg9kGWZ3WY4U\nRrKuD7ljFTRQCWbJl7Roz8w1QiJQPPB05iDsLLu8E35dOiWUWYqmDghKhcrRsqcO\nx6ad5+Svtu1ap1EdCO+jsAVReAJPDHEIrEgfK0mu7CLA9wY6O1735NOtRiSl3UPa\n8oF6OFcfeenXk1E41dUwMN7iryse9RSdBhI1xRYN8jyuhKfJtipLaFEeBOXJWoCZ\nHmzDor89aFpVzP4RQ11B4tRBhW2C+A6a3LDcPcnUvzn1bNOcMprGtc4HyJl+7WKj\n7RwY0CJzAgMBAAECggEAQnswX00WyA+mA5Ir1UdRkpPTcUd/nFXro8dybapezciz\nH+A5id+VFn5wwfkSmvxspI/WNr+jNnWoLNIjQXn6R2OUsT0N7SvYFbLgXmTAlJ3L\nBchBgVUpXkFyihMdkDfxvip1dnt86yyFi34IQ+BwbBKN6l/oU5xfTaYho4P+kicP\nL/yFkG3chE2cQOKudHO5UpOuhJ1rPsiBFmcskwmX5Bd5y16hGm7M7WDrfQ+/JzR0\n6NpdT+Z0T4seeIBfBMk+wRIMtkqRjm/7HglUJuUa1kqzYVA+P0Mp0yMnK4vE8VsD\nyGh+3hUKKqxRu+HU647ITeWKNsvJ6wp7Xufan2rhLQKBgQD4ySjox4KJI7fHqYMw\njTyMrcmR0LHX56oDZNtJmlkZ8s60mx9Wp7UFy9GksPTSYmlgG5k4FbehB0fHzcwx\nCHlHSDZzDnutxpswkxDbvoHwP6ZfHrfbgxYzBufFnvyOh6VXNeaFxfBwezuZtwBD\nK+PU7Y2FVOHxwUHkB+8vrql5tQKBgQDIBM/Hj6zaWo9tetFF7WLOFUK42Yw1n8tP\nI3j9UNHh+Wl8cAJVKLMg4VDSLonppKyYxvFaW/KpH69LEy5exMCnBlxW7VfwKm4F\nkCWmzyA6qO0vh5stz5YnNMAtb3/zgocKeob9zR87sTBiPd6RJHIoQEfs0rKRBq/H\nTPu69TWkhwKBgGBp5NbBas8m7nQMN3E7avnB59oAnMtlVjfWgD03+cvak0zeyPhW\nKgtC/83pXheiV+ANEgXwNKfNIH5IPRfLhuSfEarpM/kWfNIITII8hDLNF/bI+sux\nM4s2499sS8gYvXTcyKeTHCkbOO/LQejGO5crMKs5SA7erGBoysMZ10f5AoGAUokB\nwCQ+PF/wHUn3vvYktks5nBNQ8vO8LizCCS1nXerQJ2QE4mUH/YJcGk7P49Rq0CQP\nhay5ZiZH7B+/G6XupT1PryMDDXxEqBECKGIBt5LrRJidZPrqx8TRpC4FS1NKK/3B\nZEtXHwePoopLI/M5E/jqdQPAYW2z7PaMTWpPt1MCgYEAxBCvBhpPyE5Wan1ABpK/\nQcr4uR74PA2X6Cnbh9lhYHWzg2BjIJSJ5d2n7BKss7SUwkSWunA1GpcWqexJVkA5\nZRmNAVUZfrZ826j50hzVa2yTm1IkAI3pdNoHv/gQJCAG+JMOhNDGs6J5Qur9FhX9\nEZla1rtEz/e7arDxZ5N9g2o=\n-----END PRIVATE KEY-----\n",
    client_email: "gino-ciancia@upheld-rain-450520-r8.iam.gserviceaccount.com",
    client_id: "117736865612037147188",
    auth_uri: "https://accounts.google.com/o/oauth2/auth",
    token_uri: "https://oauth2.googleapis.com/token",
    auth_provider_x509_cert_url: "https://www.googleapis.com/oauth2/v1/certs",
    client_x509_cert_url: "https://www.googleapis.com/robot/v1/metadata/x509/gino-ciancia%40upheld-rain-450520-r8.iam.gserviceaccount.com",
    universe_domain: "googleapis.com"
  }