import mongoose from "mongoose";

// Schema
const OrderSchema = new mongoose.Schema(
   {
     foods:
        [
            {type:mongoose.Schema.Types.ObjectId,
        ref:'Foods'}
        ],

     payment:{},

     buyer:{type:mongoose.Schema.Types.ObjectId,
        ref:'User'},
    
    status:{
        type:String,
        enum: ['preparing','prepare','on the way','delivery'],
        default:"preparing",
    },
    },
    { timestamps: true});

const order = mongoose.model('Orders', OrderSchema);//that name 'orders' is db name 


export default order;