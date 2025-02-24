import  { Payment, Preference  }  from  'mercadopago' ;
import Turno from '../models/turnos.js';
import { getClient } from '../utils/getClientMP.js';
import { saveTurnoAndWritingSheet } from '../utils/saveTurnoandWritingSheets.js';


export const createOrder = async (req, res)=>{
    const { turnoId } = req.params;
    const {nombre, dni} = req.body
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
              success: 'http://localhost:3000/api/pago-confirmado', // URL de éxito
              failure: 'http://localhost:3000/api/pago-fallido', // URL de fallo
              pending: 'http://localhost:3000/api/pago-pendiente', // URL de pago pendiente
          },
          auto_return: 'approved', // Redirigir automáticamente al cliente después del pago
          external_reference: JSON.stringify({turnoId:turno._id, nombreCliente:nombre, dniCliente:dni}), // Guardar los detalles del turno como referencia,

          notification_url: 'https://8e8b-2803-9800-9024-87c3-1035-7b00-1516-e6ed.ngrok-free.app/api/webhook'
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

      if(paymentDetails.status != 'approved') return res.status(400).json({message: 'pago no aprobado'})

      // Obtener el external_reference del pago
      const externalReference = paymentDetails.external_reference;

      // Convertir el external_reference de vuelta a un objeto
      const externalData = JSON.parse(externalReference);

      // Extraer los datos del objeto
      const turnoId = externalData.turnoId;

      const data = {nombre:externalData.nombreCliente,
        dni:externalData.dniCliente
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