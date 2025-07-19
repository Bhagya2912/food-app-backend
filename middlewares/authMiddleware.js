/* global process */
import JWT from 'jsonwebtoken';

const authMiddleware = (req, res, next) => {
  try {
    const authHeader = req.headers['authorization'];
    if (!authHeader || !authHeader.startsWith('Bearer ')) {
      return res.status(401).send({
        success: false,
        message: 'Unauthorized - No or Invalid Token',
      });
    }

    const token = authHeader.split(' ')[1];
    const decoded = JWT.verify(token, process.env.JWT_SECRET);

    req.user = decoded; // ✅ attach decoded { id: user._id } to req.user
    next();
  } catch (error) {
    console.error("🔥 JWT Verify Error:", error.message);
    res.status(401).send({
      success: false,
      message: 'Unauthorized user',
    });
  }
};

export default authMiddleware;


