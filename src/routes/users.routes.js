import { deleteAllUsers, getAllUsers } from "../controllers/userControllers.js"
import express from "express"
const router = express.Router()

router.delete('/delete-AllUsers', deleteAllUsers)
router.get('/get-AllUsers', getAllUsers)


export default router