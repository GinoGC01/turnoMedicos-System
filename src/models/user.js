import mongoose from "mongoose";
const atentionSchema = new mongoose.Schema({
    profesionalId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Profesional",
      },
    servicioId: {
        type: String,
    },
    turnoId:{
        type: mongoose.Schema.Types.ObjectId,
        ref: "Turno",
    }
})

const userSchema = new mongoose.Schema({
  dni: { type: String, required: true, unique: true},
  edad:{type: Number, required: true, unique: true},
  nombre : { type: String, required: true },
  atentions: [{type: atentionSchema}],
});

export default mongoose.model("User", userSchema);
