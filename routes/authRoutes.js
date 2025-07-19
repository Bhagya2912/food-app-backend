import express from "express";
import { loginController, registerController } from "../controllers/authControllers.js"; // Add `.js` if needed

const router = express.Router();

// routes
router.post('/register', registerController);

//LOGIN || POST
router.post('/login',loginController);

// ✅ export properly for ESM
export default router;
