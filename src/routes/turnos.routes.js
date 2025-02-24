import express from "express";
import {
  getAvailableSlots,
  bookTurno,
  createTurnos,
  getAllSlots,
  deleteAvailableSlots,
  deleteSlot,
  deleteAllSlots,
  getAllSlotsByProfessionals,
} from "../controllers/turnosControllers.js";
import { createOrder, webhook } from "../controllers/paymentController.js";
const router = express.Router();

router.get("/:professionalId/:month/:year", getAvailableSlots);
router.post("/:turnoId/book", bookTurno);
router.post('/generate-slots', createTurnos)
router.get('/get-allSlots', getAllSlots)
router.get('/get-allSlotsByProfessional/:id', getAllSlotsByProfessionals)
router.delete('/delete/:professionalId/:month/:year', deleteAvailableSlots)
router.delete('/delete-slot', deleteSlot)

//payment
router.post('/create-order/:turnoId', createOrder )
router.get('/pago-confirmado', (req,res)=>{res.send('Pago confirmado')})
router.get('/pago-fallido', (req,res)=>{res.send('Pago fallido')})
router.get('/pago-pendiente', (req,res)=>{res.send('Pago pendiente')})
router.post('/webhook', webhook)

//temporally
router.delete('/delete-AllSlots/:profesionalId', deleteAllSlots)



export default router;
