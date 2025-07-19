import mongoose from "mongoose";

// Schema
const foodSchema = new mongoose.Schema(
 {
   title:{
    type:String,
    required:[true, 'Food Title is require'],
   },
   description:{
    type:String,
    required:[true,'Food Discription is required'],
   },
   price:{
    type:Number,
    required:[true,'food price is required'],
   },
   imageUrl:{
    type: String,
    default:
        "https://png.pngtree.com/png-vector/20220708/ourmid/pngtree-fast-food-logo-png-image_5763171.png"
  },
   foodTags : {
    type:String,
   },
   category:{
    type:String,
   },
   code:{
    type:String,
   },
   isAvailabe:{
    type:Boolean,
    default:true,
   },
   restaurant:{
    type:mongoose.Schema.Types.ObjectId,
    ref:'Restaurant',
    required:true,
   },
   rating:{
    type:Number,
    default:5,
    min:1,
    max:5,
   },
   ratingCount:{
    type:String,
   }
},
    { timestamps: true});

const food = mongoose.model('Foods', foodSchema);


export default food;