import  { Payment, Preference  }  from  'mercadopago' ;
import Turno from '../models/turnos.js';
import { getClient } from '../utils/getClientMP.js';
import { saveTurnoAndWritingSheet } from '../utils/saveTurnoandWritingSheets.js';
import { HOST, NGROK_URL } from '../config.js';


export const createOrder = async (req, res)=>{
    const { turnoId } = req.params;
    const {nombre, dni, edad} = req.body
    try{
      const turno = await Turno.findById(turnoId).populate('profesionalId');
      
      if (!turno || turno.isBooked) {
        return res.status(400).json({ message: "Turno no disponible" });
      }

      const precioAdelanto = turno.paymentAdvance

      const preference = new Preference(getClient()); 

      const body = {
          items: [
              {
                  title: `Seña para Turno: ${turno.profesionalId.profession} ${turno.profesionalId.name}`,
                  unit_price: precioAdelanto, // Precio del turno
                  currency_id: 'ARS',
                  quantity: 1,
              },
          ],
          back_urls: {
              success: `${HOST}/api/pago-confirmado`, // URL de éxito
              failure: `${HOST}/api/pago-fallido`, // URL de fallo
              pending: `${HOST}/api/pago-pendiente`, // URL de pago pendiente
          },
          auto_return: 'approved', // Redirigir automáticamente al cliente después del pago
          external_reference: JSON.stringify({turnoId:turno._id, nombreCliente:nombre, dniCliente:dni, edadCliente:edad}), // Guardar los detalles del turno como referencia,

          notification_url: NGROK_URL
      };
  
      // Crear la preferencia en MercadoPago
      const responseMercadoPago = await preference.create({body});
      const paymentURL = responseMercadoPago.init_point
       // Devolver el ID de la preferencia para redirigir al cliente al checkout
      res.json({urlFront: paymentURL});
    }
    catch(error){
      res.status(500).json({ message: error.message });
  
    }
}

export const webhook = async (req, res)=>{
  const { id, topic} = req.query;
  const payment = new Payment(getClient());

  if(topic === 'payment' ){
    try {
      // Consulta el estado del pago
      const paymentDetails = await payment.get({ id });

      if(paymentDetails.status != 'approved') return res.status(400).json({error: 'pago no aprobado', status: 'Error'})

      // Obtener el external_reference del pago
      const externalReference = paymentDetails.external_reference;

      // Convertir el external_reference de vuelta a un objeto
      const externalData = JSON.parse(externalReference);

      // Extraer los datos del objeto
      const turnoId = externalData.turnoId;

      const data = {
        nombre:externalData.nombreCliente,
        dni:externalData.dniCliente,
        edad:externalData.edadCliente,
        payment_id: paymentDetails.id,
        payment_description: paymentDetails.description,
        payment_payer_email: paymentDetails.payer.email, // Email del comprador
        payment_payer_identification: paymentDetails.payer.identification.number, // Número de identificación del comprador (DNI COMPRADOR)
        payment_status: paymentDetails.status, // Estado del pago (ej: "approved")
        payment_status_detail: paymentDetails.status_detail, // Detalle del estado (ej: "accredited")
        payment_transaction_amount: paymentDetails.transaction_amount, // Monto total de la transacciónpayment_
        payment_net_received_amount: paymentDetails.transaction_details.net_received_amount, // Monto neto recibido
        payment_total_paid_amount: paymentDetails.transaction_details.total_paid_amount, // Monto total pagado
        payment_date_approved: paymentDetails.date_approved, // Fecha y hora de aprobación del pago
      };

      const turnoGuardado = await saveTurnoAndWritingSheet(turnoId, data)
      if(!turnoGuardado) res.status(400).json({error:'error al guardar el turno'})
      res.status(200).json({message:'turno guardado con exito'});
    } catch (error) {
      console.error('Error al consultar el pago:', error);
      res.status(500).send('Error al consultar el pago');
    }
  
  }
  res.status(204)
}