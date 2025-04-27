import crypto from 'crypto'

// Función para verificar la firma webhook mercado pago
export function verifySignature (webhookSecret, body, signature) {
  const hash = crypto
    .createHmac('sha256', webhookSecret)
    .update(JSON.stringify(body))
    .digest('hex')

  return hash === signature
}
