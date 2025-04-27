import express from 'express'
import {
  TurnosControllers
} from '../controllers/turnosControllers.js'
import { PaymentController } from '../controllers/paymentController.js'
const router = express.Router()

router.get('/:professionalId/:month/:year', TurnosControllers.getAvailableSlots)
router.post('/generate-slots', TurnosControllers.createTurnos)
router.get('/get-allSlots', TurnosControllers.getAllSlots)
router.get('/get-allSlotsByProfessional/:id', TurnosControllers.getAllSlotsByProfessionals)
router.delete('/delete/:professionalId/:month/:year', TurnosControllers.deleteAvailableSlots)
router.delete('/delete-slot', TurnosControllers.deleteSlot)

// payment
router.post('/create-order/:turnoId', PaymentController.createOrder)
router.get('/pago-confirmado', (req, res) => { res.send('Pago confirmado') })
router.get('/pago-fallido', (req, res) => { res.send('Pago fallido') })
router.get('/pago-pendiente', (req, res) => { res.send('Pago pendiente') })
router.post('/webhook', PaymentController.webhook)

// temporally
router.delete('/delete-AllSlots/:profesionalId', TurnosControllers.deleteAllSlots)

export default router
