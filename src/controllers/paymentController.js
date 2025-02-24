import  {  MercadoPagoConfig ,  Payment, Preference  }  from  'mercadopago' ;
import { verifySignature } from '../utils/verifySignature.js';
import Turno from '../models/turnos.js';

const  client = new MercadoPagoConfig({accessToken : process.env.ACCESS_TOKEN_MERCADO_PAGO});
console.log(process.env.ACCESS_TOKEN_MERCADO_PAGO)

export const createOrder = async (req, res)=>{
    const { turnoId } = req.params;

    try{
      const turno = await Turno.findById(turnoId).populate('profesionalId');
      console.log(turno)
      
      if (!turno || turno.isBooked) {
        return res.status(400).json({ message: "Turno no disponible" });
      }

      const precioAdelanto = turno.paymentAdvance

      // Paso 3: Inicializar el objeto API 
      const preference = new Preference(client); 
      // Crear una preferencia de pago
      const body = {
          items: [
              {
                  title: 'Seña para Turno',
                  unit_price: precioAdelanto, // Precio del turno
                  currency_id: 'ARG',
                  quantity: 1,
              },
          ],
          back_urls: {
              success: 'http://localhost:3000/api/pago-confirmado', // URL de éxito
              failure: 'http://localhost:3000/api/pago-fallido', // URL de fallo
              pending: 'http://localhost:3000/api/pago-pendiente', // URL de pago pendiente
          },
          auto_return: 'approved', // Redirigir automáticamente al cliente después del pago
          external_reference: JSON.stringify(turno), // Guardar los detalles del turno como referencia,
          notification_url: 'https://a76b-2803-9800-9024-87c3-942a-1ed9-7348-cc10.ngrok-free.app/api/webhook'
      };
  
      // Crear la preferencia en MercadoPago
      const responseMercagoPago = await preference.create({body});
      const paymentURL = responseMercagoPago.init_point
       // Devolver el ID de la preferencia para redirigir al cliente al checkout
      res.json({urlFront: paymentURL});
    }
    catch(error){
      res.status(500).json({ message: error.message });
  
    }
  }

export const webhook = async (req, res)=>{
  const { id, topic} = req.query;
  const payment = new Payment(client);
  const paymentID = id
  const signature = req.headers['x-signature'];
  const webhookey = process.env.WEB_HOOK_KEY

  if(topic === 'payment' ){
    try {
      // Consulta el estado del pago
      const paymentDetails = await payment.get({ id: paymentID });
      console.log('Estado del pago:', paymentDetails.status);

      // Aquí puedes actualizar tu base de datos o realizar otras acciones
      console.log('>>>>>>> GUARDAR DATOS EN SHEETS')
      res.status(200).send('OK');
    } catch (error) {
      console.error('Error al consultar el pago:', error);
      res.status(500).send('Error al consultar el pago');
    }
  
  }
  res.status(204)
}