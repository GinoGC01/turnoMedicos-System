import { HOST, NGROK_URL } from "../config.js";


export const bodyForOrderMercadoPago = (dataExternalReference)=>{
    const precioAdelanto =  dataExternalReference.service.price * 0.5
    const referenciasExternas = {
        turnoId:dataExternalReference.id, 
        nombreCliente:dataExternalReference.nombre, 
        dniCliente:dataExternalReference.dni, 
        edadCliente:dataExternalReference.edad, 
        IdServicioProfesional:dataExternalReference.servicioId}

    const body = {
              items: [
                  {
                      title: `Seña para Turno: ${dataExternalReference.turno.profesionalId.profession} ${dataExternalReference.turno.profesionalId.name}
                        • Servicio: ${dataExternalReference.service.title}`,
                      unit_price: precioAdelanto,
                      currency_id: 'ARS',
                      quantity: 1,
                  },
              ],
              back_urls: {
                  success: `${HOST}/api/pago-confirmado`,
                  failure: `${HOST}/api/pago-fallido`,
                  pending: `${HOST}/api/pago-pendiente`,
              },
              auto_return: 'approved', // Redirigir automáticamente al cliente después del pago
              external_reference: JSON.stringify(referenciasExternas),
              notification_url: NGROK_URL //necesario actualizar en desarrollo
          };
    return body
}