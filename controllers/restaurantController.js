import restaurantModel from '../models/restaurantModel.js';

export const createRestaurantController =async (req,res) => {
    try {
        const {title,imageUrl,foods,time,pickup,delivery,isOpen,logoUrl,rating,ratingCount,Code,coords,} = req.body;
       //validation
       if(!title || !coords){
        return res.status(500).send({
            success:false,
            message:"please provide title and address",
        });
       }
       const newRestaurant = new restaurantModel({title,imageUrl,foods,time,pickup,delivery,isOpen,logoUrl,rating,ratingCount,Code,coords,})
       await newRestaurant.save();
       res.status(201).send({
        success:true,
        message:"New Restaurant Created Successfully",
       })
    } catch (error) {
        console.log(error);
        res.status(500).send({
            success:false,
            message:'Error In create a Restaurant API',
        })
    }
};

//GET ALL RESTAURANT
export const getAllRestaurantController =async (req,res) => {
    try {
        const restaurants = await restaurantModel.find({})
        if(!restaurants){
            return res.status(404).send({
                success:false,
                message:"No Restaurant Found",
            })
        }
        res.status(200).send({
            success:true,
            totalCount:restaurants.length,
            restaurants,
        })
    } catch(error) {
        console.log(error)
        res.status(500).send({
            success:false,
            message: 'Error In Create Restaurant API',
            error,
        })

    }
};

//get single restaurant by its id
export const getRestaurantByIdController =async (req,res) => {
    try {
        const restaurantId = req.params.id;
        if(!restaurantId){
            return res.status(404).send({
                success:false,
                message:"please provide restaurant ID",
            })       
        }
        //find restaurant
        const restaurant = await restaurantModel.findById(restaurantId)
        if(!restaurant){
            return res.status(404).send({
                success:false,
                message:'no reataurat found'
            })
        }
        res.status(200).send({
            succes:true,
            restaurant,
        })
    } catch(error) {
        console.log(error);
        res.status(500).send({
             success:false,
             message:'Error In Get Restaurant by id Api',
             error
        })
    }
}

//delete Restaurant 
export const deleteRestaurantController = async (req,res) => {
    try {
        const restaurantId = req.params.id;
        if(!restaurantId ){
            return res.status(404).send({
                success:false,
                message: 'No Restaurant Found QR Provide Restaurant ID',
            });
        }
        await restaurantModel.findByIdAndDelete(restaurantId);
        res.status(200).send({
            success: true,
            message: "Restaurant Deleted Successfully",
        });
    } catch (error) {
        console.log(error);
        res.status(500).send({
            success:false,
            message:'Error in delete restaurant API',
            error,
        });
    }
};