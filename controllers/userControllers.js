import userModel from '../models/userModel.js';
import bcrypt from 'bcryptjs';

export const getUserController = async (req, res) => {
  try {
    const userId = req.user?.id; // ✅ comes from middleware

    if (!userId) {
      return res.status(401).send({
        success: false,
        message: 'User ID not found in token',
      });
    }

    const user = await userModel.findById(userId).select('-password'); // ✅ exclude password

    if (!user) {
      return res.status(404).send({
        success: false,
        message: 'User not found',
      });
    }

    res.status(200).send({
      success: true,
      message: 'User fetched successfully',
      user,
    });
  } catch (error) {
    console.error("Get User Error:", error);
    res.status(500).send({
      success: false,
      message: 'Error in Get User',
      error,
    });
  }
};

//  Update User Controller (using token's user ID)
export const updateUserController = async (req, res) => {
  try {
    //find User
    const userId = req.user?.id;
    //Validation
    if (!userId) {
      return res.status(401).send({
        success: false,
        message: 'User ID not found in token',
      });
    }

    const user = await userModel.findById(userId);
    if (!user) {
      return res.status(404).send({
        success: false,
        message: 'User not found',
      });
    }

    //  Update allowed fields
    const { userName, address, phone } = req.body;
    if (userName) user.userName = userName;
    if (address) user.address = address;
    if (phone) user.phone = phone;

    await user.save();

    res.status(200).send({
      success: true,
      message: 'User updated successfully',
    });
  } catch (error) {
    console.error("Update User Error:", error);
    res.status(500).send({
      success: false,
      message: 'Error In Update User Api',
      error,
    });
  }
};

//Update user Password
export const updatePasswordController = async (req, res) => {
  try {
    const userId = req.user?.id;

    if (!userId) {
      return res.status(401).send({
        success: false,
        message: "Unauthorized: User ID not found",
      });
    }

    const user = await userModel.findById(userId);

    if (!user) {
      return res.status(404).send({
        success: false,
        message: "User Not Found",
      });
    }

    const { oldPassword, newPassword } = req.body;

    if (!oldPassword || !newPassword) {
      return res.status(400).send({
        success: false,
        message: "Please provide both old and new passwords",
      });
    }

    const isMatch = await bcrypt.compare(oldPassword, user.password);

    if (!isMatch) {
      return res.status(400).send({
        success: false,
        message: "Invalid old password",
      });
    }

    const salt = bcrypt.genSaltSync(10);
    user.password = await bcrypt.hash(newPassword, salt);

    await user.save({ validateBeforeSave: false });

    res.status(200).send({
      success: true,
      message: "Password Updated!",
    });
  } catch (error) {
    console.error(error);
    res.status(500).send({
      success: false,
      message: "Error in Password Update API",
      error,
    });
  }
};

//reset password
export const resetPasswordController =async (req,res) => {
  try {
      const {email,newPassword, answer} =req.body;
      if(!email || !newPassword || !answer){
        return res.status(500).send({
          success:false,
          message:'please provide all fileds',
        })
      }
      const user = await userModel.findOne({email,answer})
      if(!user){
        return res.status(500).send({
          success:false,
          message:'User Not Found or Invalid answer',
        })
      }
      //hashing password
      var salt =bcrypt.genSaltSync(10);
      const hashedPassword = await bcrypt.hash(newPassword,salt);
      user.password = hashedPassword,
      await user.save();
      res.status(200).send({
        success:true,
        message:'Password Reset Successfully',
      })
  } catch (error) {
          console.log(error);
          res.status(500).send({
             success:false,
             message:'error in password reset API',
             error
          })
  }
};

//delete Account
export const deleteProfileController =async (req,res) => {
   try {
      await userModel.findByIdAndDelete(req.params.id)
      return res.status(200).send({
        success:true,
        messsage: "Your account has been deleted ",
      });
   } catch (error) {
      console.log(error)
      res.status(500).send({
        success:false,
        message:'Error In delete Profile API',
        error,
      })
   }
};