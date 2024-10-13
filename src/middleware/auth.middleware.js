import { verifyToken } from "../utils/jwt.utils.js";
import User from "../models/user.model.js";

const authMiddleware = async (req, res, next) => {
  const token = req.header("Authorization")?.replace("Bearer ", "");

  if (!token) {
    return res.status(401).json({ error: "No token provided" });
  }

  try {
    const claims = verifyToken(token);
    const user = await User.findOne({ email: claims.email });
    if (!user) {
      return res.status(401).json({ error: "User does not exist" });
    }

    req.email = claims.email;

    next();
  } catch (error) {
    return res.status(401).json({ error: "Invalid token" });
  }
};

export { authMiddleware };
