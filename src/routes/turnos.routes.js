import express from "express";
import {
  getAvailableSlots,
  bookTurno,
  createTurnos,
  getAllSlots,
} from "../controllers/turnosControllers.js";
const router = express.Router();

router.get("/:professionalId/:month/:year", getAvailableSlots);
router.post("/:turnoId/book", bookTurno);
router.post('/generate-slots', createTurnos)
router.get('/get-allSlots', getAllSlots)

export default router;
