import { authController } from '../controllers/authControllers.js'
import { UsersController } from '../controllers/userControllers.js'
import express from 'express'
const router = express.Router()

router.delete('/delete-AllUsers', UsersController.deleteAllUsers)
router.get('/get-AllUsers', UsersController.getAllUsers)

// to do router for user views

router.post('/register', authController.registerUser)
router.post('/login', authController.login)
router.post('/logout', authController.logout)
router.get('/profile', authController.getUserProfile)
export default router
