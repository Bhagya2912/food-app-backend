import express from 'express';
import authMiddleware from '../middlewares/authMiddleware.js';
import { createRestaurantController, deleteRestaurantController, getAllRestaurantController, getRestaurantByIdController } from '../controllers/restaurantController.js';


const router = express.Router();

//routes
//create restaurant ||| post
router.post('/create', authMiddleware,createRestaurantController);

//route
//GET ALL RESTAURANTS || GET
router.get('/getAll',getAllRestaurantController);

//get single restaurant by its id || get
router.get('/get/:id',getRestaurantByIdController);

//delete restaurant ||delete
router.delete('/delete/:id',authMiddleware,deleteRestaurantController);

export default router;