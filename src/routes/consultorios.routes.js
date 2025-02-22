import express from "express";
import {
  createConsultorio,
  getConsultorios,
  deleteConsultorio,
  createProfessional,
  deleteProfessional,
  getProfessionalsByConsultorios,
  deleteAllProfessionals,
  getAllProfessionals,
} from "../controllers/consultoriosControllers.js";

const router = express.Router();

router.post("/create-consultorio", createConsultorio);
router.get("/get-consultorios", getConsultorios);
router.delete("/delete-consultorio/:id", deleteConsultorio);

router.post("/create-professional/:id", createProfessional);
router.delete("/delete-professional/:id", deleteProfessional);
router.get(
  "/get-professionalsByConsultorios/:id",
  getProfessionalsByConsultorios
);

//temporally
router.delete('/delete-all-professionals', deleteAllProfessionals)
router.get('/get-all-professionals', getAllProfessionals)


export default router;
