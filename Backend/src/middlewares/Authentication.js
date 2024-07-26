import jwt from "jsonwebtoken";
import User from "../models/User.models.js";
import ApiError from "../utils/ErrorHandling.js";

const Authenticate_Header = async (req, res, next) => {
  try {
    const token = req.header("auth-token");
    if (!token) {
      throw new ApiError("Token not provided", 401);
    }

    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    if (!decoded) {
      throw new ApiError("Invalid Token", 401);
    }

    req.username = decoded.username;
    req.user_id = decoded.id;

    const user = await User.findOne({ where: { id: decoded.id } });
    if (!user) {
      throw new ApiError(401, "User not found or deleted");
    }

    next();
  } catch (err) {
    return res
      .status(err.statusCode || 400)
      .json({ error: "Invalid Token", message: err.message });
  }
};

export default Authenticate_Header;
