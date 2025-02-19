import Consultorio from "../models/consultorios.js";
import Profesional from "../models/professionals.js";

export const createConsultorio = async (req, res) => {
  const {
    name,
    location,
    professionals,
    about,
    achivements,
    portfolio,
    presentation,
    testimonios,
    verify,
  } = req.body;

  try {
    const newConsultorio = new Consultorio({
      name,
      location,
      professionals,
      about,
      achivements,
      portfolio,
      presentation,
      testimonios,
      verify,
    });

    await newConsultorio.save();
    res.status(201).json(newConsultorio);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

//all consultorios
export const getConsultorios = async (req, res) => {
  try {
    const consultorios = await Consultorio.find();
    if (consultorios.length != 0)
      return res.json({ message: "consultorios disponibles", consultorios });
    res.json({
      message: "No hay consultorios medicos disponibles en este momento",
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const deleteConsultorio = async (req, res) => {
  const { id } = req.params;
  try {
    const resultado = await Consultorio.findByIdAndDelete(id);
    if (!resultado)
      return res.status(404).json({ mensaje: "Documento no encontrado" });
    res.send({ message: "Consultorio Eliminado", nombre: resultado.name });
  } catch (error) {
    console.error("Error al eliminar consultorio:", error);
  }
};

export const createProfessional = async (req, res) => {
  const { name, profession, availability } = req.body;
  const { id } = req.params;

  try {
    const resultado = await Consultorio.findById(id);
    if (!resultado)
      return res.status(200).send({
        message:
          "vaya, parece que no tiene consultorio asignado. Revisa los datos.",
      });
    const ConsultorioID = resultado._id;
    const newProfesional = new Profesional({
      name,
      profession,
      availability,
      consultorio: ConsultorioID,
    });

    await newProfesional.save();

    // Agregar el ID del profesional al arreglo `professionals` del consultorio
    resultado.professionals.push(newProfesional._id);
    await resultado.save();
    console.log(
      "Profesional agregado al consultorio:",
      resultado.professionals
    );
    res.status(201).json({
      message: "Profesional creado y asignado con exito",
      newProfesional,
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const deleteProfessional = async (req, res) => {
  const { id } = req.params;
  try {
    const resultado = await Profesional.findByIdAndDelete(id);
    if (!resultado)
      return res.status(404).json({ mensaje: "Documento no encontrado" });
    res.send({ message: "Profesional Eliminado", nombre: resultado.name });
  } catch (error) {
    console.error("Error al eliminar el profesional:", error);
  }
};

export const getProfessionalsByConsultorios = async (req, res) => {
  const { id } = req.params;
  try {
    const consultorio = await Consultorio.findById(id).populate(
      "professionals"
    );
    if (consultorio)
      return res.json({ message: "consultorio creado", consultorio });
    res.json({
      message: "No se encontro consultorio medico",
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
