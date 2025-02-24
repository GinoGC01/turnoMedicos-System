import  {MercadoPagoConfig}  from  'mercadopago' ;
import { MERCADOPAGO_API_KEY } from '../config.js';

export const getClient = ()=>{
    const  client = new MercadoPagoConfig({accessToken : MERCADOPAGO_API_KEY});
    return client
  }