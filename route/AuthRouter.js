import express, { Router } from "express"
import register from "../controller/AuthController.js"
import registerValidation from "../middleware/AuthValidation.js"


const router = express.Router();


router.post('/register', register, registerValidation);

export default router;