// route/AuthRouter.js
import express from "express";
import { register, login } from "../controller/AuthController.js";
import { registerValidation, loginValidation } from "../middleware/AuthValidation.js";

const router = express.Router();

router.post("/register", registerValidation, register);
router.post("/login", loginValidation, login);

export default router;
