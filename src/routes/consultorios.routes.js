import express from "express";
import {
  createConsultorio,
  getConsultorios,
  deleteConsultorio,
  createProfessional,
  deleteProfessional,
  getProfessionalsByConsultorios,
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

export default router;
