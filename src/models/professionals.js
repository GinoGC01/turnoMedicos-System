import mongoose from "mongoose";
import { Schema } from "mongoose";

// Schema para los horarios de trabajo (bloques de horarios)
const WorkingHoursSchema = new Schema({
  start: { type: String, required: true }, // Hora de inicio (ej: "09:00")
  end: { type: String, required: true }, // Hora de fin (ej: "17:00")
});

// Schema para los días con horarios parciales
const PartialDaySchema = new Schema({
  day: { type: String, required: true }, // Día de la semana (ej: "Monday")
  workingHours: { type: [WorkingHoursSchema], required: true }, // Bloques de horarios
});

// Schema para los servicios ofrecidos por el profesional
const ServiceSchema = new Schema({
  description: { type: String, required: true }, // Descripción del servicio
  divisa: { type: String, required: true }, // Moneda (ej: "ARS")
  duration: { type: Number, required: true }, // Duración en minutos (ej: 30)
  id: { type: String, required: true }, // ID del servicio
  price: { type: Number, required: true }, // Precio del servicio
  title: { type: String, required: true }, // Título del servicio
  contacto: { type: [String], required: true }, // Contacto (teléfono, email)
  category: { type: String, required: true }, // Categoría del servicio
});

// Schema principal para el profesional
const profesionalSchema = new Schema({
  name: { type: String, required: true }, // Nombre del profesional
  profession: { type: String, required: true }, // Profesión (ej: "Médico General")
  availability: {
    daysOn: { type: [String], required: true }, // Días que trabaja (ej: ["Monday", "Tuesday"])
    workingHours: { type: WorkingHoursSchema, required: true }, // Horario completo por defecto
    partialDays: { type: [PartialDaySchema], default: [] }, // Días con horarios parciales
  },
  paymentAdvance: { type: Number, required: true }, // Pago por adelantado
  services: { type: [ServiceSchema], required: true }, // Servicios ofrecidos
});

export default mongoose.model("Profesional", profesionalSchema);
