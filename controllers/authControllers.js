// authControllers.js
/* global process */
import userModel from '../models/userModel.js'; // ✅ import the model
import bcrypt from 'bcryptjs';
import JWT from 'jsonwebtoken';

//register
export const registerController = async (req, res) => {
  try {
    const { userName, email, password, phone, address,answer } = req.body;

    // Validation
    if (!userName || !email || !password || !address || !phone || !answer) {
      return res.status(400).send({
        success: false,
        message: 'Please provide all fields',
      });
    }

    // Check if user already exists
    const existing = await userModel.findOne({ email });
    if (existing) {
      return res.status(400).send({
        success: false,
        message: 'Email already registered. Please login.',
      });
    }

    //hashing password
    var salt =bcrypt.genSaltSync(10);
    const hashedPassword = await bcrypt.hash(password,salt);

    // Create new user
    const user = await userModel.create({
      userName,
      email,
      password:hashedPassword, // ✅ store hashed password
      address,
      phone,
      answer,
    });

    res.status(201).send({
      success: true,
      message: 'Successfully registered',
      user,
    });
  } catch (error) {
    console.error(error);
    res.status(500).send({
      success: false,
      message: 'Registration failed',
      error,
    });
  }
};

//login
export const loginController = async (req,res) => {
  try {
    const {email,password} = req.body
    //validation
    if(!email || !password){
      return res.status(500).send({
        success:false,
        message:"Please Provide Email or Password",
      })
    }
    //check user
    const user = await userModel.findOne({email});
    if(!user){
      return res.status(404).send({
        success:false,
        message:'User Not Found',
      })
    }
    //CHECK USER PASSWORD || COMPARE PASSWORD
    const isMatch = await bcrypt.compare(password, user.password)
    if(!isMatch){
      return res.status(500).send({
        success:false,
        message: "Invalid Credentials",
      })
    }
    //token create
    const token = JWT.sign({id:user._id}, process.env.JWT_SECRET,{
      expiresIn: "7d",
    });
    user.password=undefined; //then password not shows inpostman
    res.status(200).send({
      success:true,
      message:'Login Successfully',
      token,
      user,
    })
  } catch (error) {
    console.log(error)
    res.status(500).send({
      success:false,
      message:'Error In login API',
      error,
    })
    
  }
}




