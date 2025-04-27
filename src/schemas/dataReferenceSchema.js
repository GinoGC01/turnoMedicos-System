import Joi from 'joi'

export const dataReferenceSchema = Joi.object({
  nombre: Joi.string().required(),
  dni: Joi.string().required(),
  edad: Joi.string().required(),
  id: Joi.string().required(),
  service: Joi.object({
    description: Joi.string().required(),
    divisa: Joi.string().required(),
    duration: Joi.number().required(),
    id: Joi.string().required(),
    price: Joi.number().required(),
    title: Joi.string().required(),
    contacto: Joi.array().items(Joi.string()).required(),
    category: Joi.string().required()
  }).required(),
  telefono: Joi.string().required(),
  email: Joi.string().email().required(),
  profesionalId: Joi.object().required(),
  nombreConsultorio: Joi.string().required(),
  turno: Joi.object({
    date: Joi.date().required(),
    startTime: Joi.string().required(),
    endTime: Joi.string().required(),
    status: Joi.string().required(),
    paymentAdvance: Joi.number().required(),
    profesionalId: Joi.object({
      availability: Joi.object().required(),
      name: Joi.string().required(),
      profession: Joi.string().required(),
      paymentAdvance: Joi.number().required(),
      services: Joi.array().required()
    }).required()
  }).required()
})
