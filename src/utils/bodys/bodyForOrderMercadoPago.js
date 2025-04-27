import { HOST, NGROK_URL } from '../../config.js'

export const bodyForOrderMercadoPago = (dataReference) => {
  const precioAdelanto = dataReference.service.price * 0.5

  const body = {
    items: [
      {
        title: `Seña para Turno: ${dataReference.turno.profesionalId.profession} - ${dataReference.service.title}`,
        unit_price: precioAdelanto,
        currency_id: 'ARS',
        quantity: 1
      }
    ],
    back_urls: {
      success: `${HOST}/api/pago-confirmado`,
      failure: `${HOST}/api/pago-fallido`,
      pending: `${HOST}/api/pago-pendiente`
    },
    auto_return: 'approved', // Redirigir automáticamente al cliente después del pago
    notification_url: NGROK_URL // necesario actualizar en desarrollo
  }
  return body
}
