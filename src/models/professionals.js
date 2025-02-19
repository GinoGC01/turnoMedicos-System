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
});

export default mongoose.model("Profesional", profesionalSchema);
