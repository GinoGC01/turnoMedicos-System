import mongoose from "mongoose";

// Definir el esquema del consultorio
const consultorioSchema = new mongoose.Schema({
  name: { type: String, required: true }, // Nombre del consultorio
  location: { type: String, required: true }, // Ubicación del consultorio
  professionals: [{ type: mongoose.Schema.Types.ObjectId, ref: "Profesional" }], // Referencia a los profesionales
  about: {
    description: { type: String }, // Descripción del consultorio
    horarios: [
      {
        day: { type: String }, // Días de atención
        hours: { type: String }, // Horarios de atención
      },
    ],
    metodosPago: [{ type: String }], // Métodos de pago aceptados
    segurosAceptados: [{ type: String }], // Seguros médicos aceptados
    status: { type: Boolean }, // Estado del consultorio (activo/inactivo)
  },
  achivements: [{ type: String }], // Logros del consultorio
  backgroundImg: { type: String }, // Imagen de fondo del consultorio
  category: { type: String }, // Categoría del consultorio
  contact: [{ type: String }], // Información de contacto
  informationOfService: { type: String }, // Información sobre los servicios
  portfolio: {
    status: { type: Boolean }, // Estado del portafolio
    images: [
      {
        date: { type: String }, // Fecha de la imagen
        description: { type: String }, // Descripción de la imagen
        image: { type: String }, // URL de la imagen
        type: { type: String }, // Tipo de imagen
      },
    ],
  },
  presentation: {
    title: { type: String }, // Título de la presentación
    body: { type: String }, // Cuerpo de la presentación
  },
  profession: { type: String }, // Profesión principal del consultorio
  pruralProfession: { type: String }, // Profesión en plural
  profileImg: { type: String }, // Imagen de perfil del consultorio
  profileType: { type: String }, // Tipo de perfil (agencia/empresa)
  testimonios: [
    {
      client: { type: String }, // Nombre del cliente
      date: { type: String }, // Fecha del testimonio
      feedback: { type: String }, // Comentario del cliente
      profileImg: { type: String }, // Imagen del cliente
      punctuation: { type: Number }, // Puntuación del cliente
    },
  ],
  verify: { type: Boolean }, // Verificación del consultorio
});

// Crear el modelo Consultorio
const Consultorio = mongoose.model("Consultorio", consultorioSchema);

export default Consultorio;
