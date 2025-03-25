import mongoose from "mongoose";
const atentionSchema = new mongoose.Schema({
    profesionalId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Profesional",
      },
    servicioId: {
        type: String, required:true
    },
    turnoId:{
        type: mongoose.Schema.Types.ObjectId,
        ref: "Turno",
    },
    dateTurno:{
      type: Date, required: true
    }
})

const userSchema = new mongoose.Schema({
  dni: { type: String, required: true, unique: true},
  edad:{type: Number, required: true},
  nombre : { type: String, required: true },
  email: {type: String, require: true, unique:true},
  telefono: {type: Number, require: true},
  atentions: [{type: atentionSchema}],
});

export default mongoose.model("User", userSchema);
