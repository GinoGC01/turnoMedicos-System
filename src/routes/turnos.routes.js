import express from "express";
import {
  getAvailableSlots,
  bookTurno,
  createTurnos,
  getAllSlots,
  deleteAvailableSlots,
  deleteSlot,
} from "../controllers/turnosControllers.js";
const router = express.Router();

router.get("/:professionalId/:month/:year", getAvailableSlots);
router.post("/:turnoId/book", bookTurno);
router.post('/generate-slots', createTurnos)
router.get('/get-allSlots', getAllSlots)
router.delete('/delete/:professionalId/:month/:year', deleteAvailableSlots)
router.delete('/delete-slot', deleteSlot)


export default router;
