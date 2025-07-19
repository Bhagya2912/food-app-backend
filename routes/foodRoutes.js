import express from 'express';
import authMiddleware from '../middlewares/authMiddleware.js';
import adminMiddleware from '../middlewares/adminMiddleware.js';
import { createFoodController, deleteFoodController, getAllFoodController, getSingleFoodController, orderStatusController, placeOrderController, updateFoodController } from '../controllers/foodControllers.js';

const router = express.Router();

//route
//create food
router.post('/create',authMiddleware,createFoodController);

//GET ALL FOOD
router.get('/getAll',authMiddleware,getAllFoodController);

//get single food 
router.get('/get/:id',getSingleFoodController);

//get Food By restaurant
router.get('/getByRestaurant/:id',getAllFoodController);

//update food
router.put('/update/:id',updateFoodController);

//delete Food
router.delete('/delete/:id',authMiddleware,deleteFoodController);

//place order
router.post('/placeorder',authMiddleware,placeOrderController);

//order status
router.post('/orderstatus/:id',authMiddleware,adminMiddleware,orderStatusController);

export default router;

