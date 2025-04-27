import express from 'express'
import { ConsultoriosController } from '../controllers/consultoriosControllers.js'

const router = express.Router()

router.post('/create-consultorio', ConsultoriosController.createConsultorio)
router.get('/get-consultorios', ConsultoriosController.getConsultorios)
router.delete('/delete-consultorio/:id', ConsultoriosController.deleteConsultorio)

router.post('/create-professional/:id', ConsultoriosController.createProfessional)
router.delete('/delete-professional/:id', ConsultoriosController.deleteProfessional)
router.get(
  '/get-professionalsByConsultorios/:id',
  ConsultoriosController.getProfessionalsByConsultorios
)

// temporally
router.delete('/delete-all-professionals', ConsultoriosController.deleteAllProfessionals)
router.get('/get-all-professionals', ConsultoriosController.getAllProfessionals)

export default router
