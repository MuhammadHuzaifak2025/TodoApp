const UserValidate = async (req, res, next) => {
  const token = req.header("auth-token");
  if (!token) {
    res.status(401).json({
      error: "User not Accessed",
    });
  }
  next();
};