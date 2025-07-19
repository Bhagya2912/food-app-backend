import foodModel from '../models/foodModel.js';
import orderModel from '../models/OrderModel.js';
//create food
export const createFoodController =async (req,res) => {
    try {
        const {title,description,price,imageUrl,foodTags ,category,code,isAvailabe,restaurant,rating,ratingCount} = req.body;
        if(!title || !description || !price ||!restaurant){
            return res.status(500).send({
                   success:false,
                   message:'Please Provide all fields',
            })
        }
        const newFood = new foodModel({title,description,price,imageUrl,foodTags ,category,code,isAvailabe,restaurant,rating,ratingCount});

        await newFood.save()
        res.status(201).send({
            success:true,
            message:'New Food Item Created',
            newFood,
        });
    } catch (error) {
        console.log(error),
        res.status(500).send({
            success:false,
            message:'Error in create food API',
            error,
        })
    }
}

//get all food
export const getAllFoodController =async (req,res) => {
    try {
        const foods = await foodModel.find({});
        if(!foods){
            return res.status(404).send({
                success:false,
                message:'no food items was found',
            })
        }
        res.status(200).send({
            success:true,
            totalFoods: foods.length,
            foods,
        })
    } catch (error) {
        console.log(error),
        res.status(500).send({
            success:false,
            messsage:'Error in get all Api',
            error,
        })
    }
}

//get single food 
export const getSingleFoodController =async (req,res) => {
    try {
        const foodId = req.params.id;
        const food = await foodModel.findById(foodId);
         if(!foodId){
            return res.status(404).send({
                success:false,
                message:"Pease Provide ID",
            })
        }
 
        if(!food){
            return res.status(404).send({
                success:false,
                message:"No food Found its id",
            })
        }
        res.status(200).send({
            success:true,
            food,
        })
    } catch (error) {
        console.log(error)
        res.status(500).send({
            success:false,
            message:'Error in get Single Food API',
            error,
        })
    }
}

//get Food By restaurant
export const getFoodByRestaurantController = async (req,res) => {
  try {
    const restaurantId = req.params.id;
    if (!restaurantId) {
      return res.status(404).send({
        success: false,
        message: 'Please provide Restaurant Id',
      });
    }

    const food = await foodModel.find({ restaurant: restaurantId });

    if (!food ) {
      return res.status(404).send({
        success: false,
        message: "No food found for this restaurant id",
      });
    }

    res.status(200).send({
      success: true,
      message: "Food based on restaurant",
      food,
    });

  } catch (error) {
    console.error(error);
    res.status(500).send({
      success: false,
      message: "Error in get Food by Restaurant ID API",
      error,
    });
  }
};

//update food
export const updateFoodController = async (req, res) => {
  try {
    const foodID = req.params.id;

    if (!foodID) {
      return res.status(404).send({
        success: false,
        message: "Please provide food ID",
      });
    }

    // ✅ Check if food exists
   const food = await foodModel.findById(foodID);
    if (!food) {
      return res.status(404).send({
        success: false,
        message: "Food item not found",
      });
    }

    // ✅ Extract data from request body
    const {
      title,
      description,
      price,
      imageUrl,
      foodTags,
      category,
      code,
      isAvailabe,
      restaurant,
      rating,
    } = req.body;

    // ✅ Update the food item
    const updatedFood = await foodModel.findByIdAndUpdate(
      foodID,
      {
        title,
        description,
        price,
        imageUrl,
        foodTags,
        category,
        code,
        isAvailabe,
        restaurant,
        rating,
      },
      { new: true } // ✅ return the updated document
    );

    res.status(200).send({
      success: true,
      message: "Food item was updated",
      food: updatedFood,
    });

  } catch (error) {
    console.error(error);
    res.status(500).send({
      success: false,
      message: "Error in Update Food API",
      error,
    });
  }
};

//delete food
export const deleteFoodController =async (req,res) =>{
    try {
        const foodId = req.params.id;
        if(!foodId){
            return res.status(404).send({
                success:false,
                message:"Provide food id",
            })
        }
        const food = await foodModel.findById(foodId);
        if(!food){
            return res.status(404).send({
                success:false,
                message:"nO FOOD FOUND WITH THIS ID",
            })
        }
        await foodModel.findByIdAndDelete(foodId);
        res.status(404).send({
            success:true,
            message:"food item Deleted",
        })
    } catch (error) {
        console.log(error);
        res.status(500).send({
            success:false,
            message:"error in dlete food api",
            error,
        })
    }
}

//place order
export const placeOrderController =async (req,res) => {
    try {
        const {cart} = req.body;
        if(!cart ){
          return res.status(500).send({
            success:false,
            message:'please food cart or payment method'
          })
        }
        let total = 0; 
        //calculation
        cart.map((i) =>{
          total =total + i.price;
        });
        const newOrder = new orderModel({
          foods:cart,
          payment:total,
          buyer: req.body.id,
        });
       await newOrder.save();//save data in database
        res.status(201).send({
          success:true,
          message:"Oredr place successfully",
          newOrder,
        })
    } catch (error) {
        console.log(error)
        res.status(500).send({
            success:false,
            message:'Error in placed order',
            error,
        })
    }
}

//change order status
export const orderStatusController =async (req,res) => {
  try {
      const orderId = req.params.id;
      if(!orderId){
        return res.status(404).send({
          success:false,
          message:"Please Provide valid order id ",
        })
      }
      const {status} = req.body;
      const order = await orderModel.findByIdAndUpdate(orderId,{status}, {new:true})
      res.status(200).send({
        success:true,
        message:"order status updated",
        order,
      })
  } catch (error) {
        console.log(error);
        res.status(500).send({
          success:false,
          message:"Error in Order Status API",
          error,
        })
  }
};