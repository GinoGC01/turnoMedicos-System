import mongoose from "mongoose";

const turnoSchema = new mongoose.Schema({
  profesionalId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Profesional",
    required: true,
  },
  date: { type: Date, required: true },
  startTime: { type: String, required: true },
  endTime: { type: String, required: true },
  isBooked: { type: Boolean, default: false },
  paymentAdvance:{type: Number, default: 5000}
});

export default mongoose.model("Turno", turnoSchema);
