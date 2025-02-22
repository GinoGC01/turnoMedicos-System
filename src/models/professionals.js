import mongoose from "mongoose";

const profesionalSchema = new mongoose.Schema({
  name: { type: String, required: true },
  profession: { type: String, required: true },
  availability: {
    daysOn: [{ type: String }],
    workingHours: {
      start: { type: String },
      end: { type: String },
    },
  },
  consultorio: { type: mongoose.Schema.Types.ObjectId, ref: "Consultorio" },
  paymentAdvance: {type: Number, required: true},
  services: [
    {
      description: { type: String, required: true },
      divisa: { type: String, required: true },
      duration: { type: Number, required: true },
      id: { type: String, required: true, unique: true },
      price: { type: Number, required: true },
      title: { type: String, required: true },
      contacto: [{ type: String}],
      category:{type: String, required: true}
    },
  ],
});

export default mongoose.model("Profesional", profesionalSchema);
