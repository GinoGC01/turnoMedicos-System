import { authController } from '../controllers/authControllers.js'
import { UsersController } from '../controllers/userControllers.js'
import express from 'express'
const router = express.Router()

router.delete('/delete-AllUsers', UsersController.deleteAllUsers)
router.get('/get-AllUsers', UsersController.getAllUsers)
router.post('/register', authController.register)

export default router
