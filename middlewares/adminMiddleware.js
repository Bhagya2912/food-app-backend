
import userModel from "../models/userModel.js"

const adminMiddleware = async (req, res, next) => {
  try {
    console.log("Decoded user in adminMiddleware:", req.user); // ✅ Add this for debugging

    const user = await userModel.findById(req.user.id);

    if (!user) {
      return res.status(404).send({
        success: false,
        message: "User not found",
      });
    }

    if (user.usertype !== "admin") {
      return res.status(401).send({
        success: false,
        message: "Only Admin Access",
      });
    }

    next();
  } catch (error) {
    console.error(error);
    res.status(500).send({
      success: false,
      message: "Unauthorized user",
      error,
    });
  }
};

export default adminMiddleware;