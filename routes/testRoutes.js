import express from 'express';
import { testUserController } from '../controllers/testController.js'; // make sure to include .js

// router object
const router = express.Router();

// routes
router.get('/test-user', testUserController);

// export
export default router;
