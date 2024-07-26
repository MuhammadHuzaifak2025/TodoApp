import jwt from "jsonwebtoken";

const Authenticate_Header = (req, res, next) => {
  try {
    const token = req.header("auth-token");
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    if (!decoded) {
      throw new Error("Invalid Token");
    }
    next();
  } catch (err) {
    return res.status(400).json({ error: "Invalid Token", message: err.message });
  }
};

export default Authenticate_Header;
