import express from 'express';
import authMiddleware from '../middlewares/authMiddleware.js';
import { deleteProfileController, getUserController, resetPasswordController, updatePasswordController, updateUserController } from '../controllers/userControllers.js';

const router = express.Router();

//GET USER || GET
router.get('/getUser', authMiddleware, getUserController); // ✅ middleware added

//update user
router.put('/updateUser', authMiddleware, updateUserController);

//reset password
router.post('/resetPassword',resetPasswordController);

//UPDATE PASSWORD
router.post('/updatePassword',authMiddleware,updatePasswordController);

//DELETE ACCOUNT 
router.delete('/deleteUser/:id',deleteProfileController);

export default router;
