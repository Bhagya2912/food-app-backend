import mongoose from "mongoose";

// Schema
const userSchema = new mongoose.Schema({
  userName: {
    type: String,
    required: [true, 'user name is required']
  },
  email: {
    type: String,
    required: [true, 'email is required'],
    unique: true,
  },
  password: {
    type: String,
    required: [true, 'password is required']
  },
  address: {
    type: Array,
  },
  phone: {
    type: String,
    required: [true, 'phone number is required'],
  },
  usertype: {
    type: String,
    required: [true, 'user type is required'],
    default: 'client',
    enum: ['client', 'admin', 'vendor', 'driver']
  },
  profile: {
    type: String,
    default: 'https://static.vecteezy.com/system/resources/thumbnails/000/439/863/small_2x/Basic_Ui__28186_29.jpg',
  },
  answer: {
     type:String,
     required:[true,'Answer is required'],
  },
},{timestamps:true});


const User = mongoose.model('User', userSchema);


export default User;
