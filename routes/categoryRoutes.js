import express from 'express';
import authMiddleware from '../middlewares/authMiddleware.js';
import { createCatController, deleteCatContoller, getAllCatController,  updateCatController } from '../controllers/categoryController.js';


const router = express.Router();

//routes
//create Category
router.post('/create',authMiddleware,createCatController);

//GET All CATEGORY
router.get('/getAll',getAllCatController);

//UPdate cat
router.put('/update/:id',authMiddleware,updateCatController);

//delet cat
router.delete('/delete/:id',authMiddleware,deleteCatContoller);

export default router;


