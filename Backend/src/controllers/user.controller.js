import bcrypt from "bcrypt";
import asynchandler from "../utils/AsyncHandler.js";
import User from "../models/User.models.js";
import jwt from "jsonwebtoken";
import ApiResponse from "../utils/ResponseHandling.js";
import ApiError from "../utils/ErrorHandling.js";
import { where } from "sequelize";
import GenerateToken from "../utils/GenerateToken.js";

const CreateUser = asynchandler(async (req, res, next) => {
  const { firstName, username, lastName, age, email, password } = req.body;

  if (!firstName || !username || !lastName || !age || !email || !password) {
    next(new ApiError(400, "Please fill all fields"));
  }

  const UserExsist = await User.findOne({ where: { username: username } });
  if (UserExsist) {
    return next(new ApiError(400, "Username Already Exsist"));
  }

  const user = await User.create({
    firstName: firstName,
    username: username,
    lastName: lastName,
    age: age,
    email: email,
    password: password,
  });

  const token = GenerateToken(user);
  user.password = undefined;
  const Resp = new ApiResponse(
    200,
    { user },
    "User created successfully",
    token
  );
  res.status(200).json(Resp);
});

const GetListUser = asynchandler(async (req, res, next) => {
  const users = await User.findAll({
    attributes: { exclude: ["password", "createdAt", "updatedAt"] },
  });
  const Resp = new ApiResponse(200, users, "List of all users");
  res.status(200).json(Resp);
});

const GetUserById = asynchandler(async (req, res, next) => {
  const id = req.user_id;
  const user = await User.findOne({
    where: { id: req.user_id },
  });
  console.log(user);
  if (!user) {
    return next(new ApiError(404, "User not found"));
  }
  user.password = undefined;
  const Resp = new ApiResponse(200, user, "User found");
  res.status(200).json(Resp);
});

const Authenticate_User = asynchandler(async (req, res, next) => {
  const token = req.cookies["auth-token"];
  console.log(token);
  if (token) {
    let decoded;
    try {
      decoded = jwt.verify(token, process.env.JWT_SECRET);
    } catch (error) {}
    if (decoded) {
      const User_Obj = await User.findOne({ where: { id: decoded.id } });
      const Resp = new ApiResponse(
        200,
        { username: User_Obj.username },
        "User Logged In"
      );
      res.status(200).json(Resp);
    }
  }
  const { username, password } = req.body;

  const User_Obj = await User.findOne({ where: { username: username } });
  if (!User_Obj) {
    next(new ApiError(400, "Username does not exist"));
  }
  const loggedin = await bcrypt.compare(password, User_Obj.password);
  if (loggedin) {
    res.cookie("auth-token", GenerateToken(User_Obj), {
      httpOnly: true,
      secure: true, // Use secure cookies in production
      maxAge: 3600 * 1000, // 1 hour
      path: "/",
    });
    const Resp = new ApiResponse(
      200,
      { username: User_Obj.username, token: GenerateToken(User_Obj) },
      "User Logged In"
    );
    res.status(200).json(Resp);
  } else {
    next(new ApiError(400, "incorrect UserName and Password"));
  }
});

const UpdateUser = asynchandler(async (req, res, next) => {
  const { firstName, username, lastName, age, email, password } = req.body;
  let updateData = {};
  const saltRounds = parseInt(process.env.SALT_ROUNDS, 10);

  if (firstName !== undefined) updateData.firstName = firstName;
  if (lastName !== undefined) updateData.lastName = lastName;
  if (username !== undefined) updateData.username = username;
  if (password !== undefined)
    updateData.password = await bcrypt.hash(password, saltRounds);
  if (email !== undefined) updateData.email = email;
  if (age !== undefined) updateData.age = age;

  const user = await User.update(updateData, {
    where: { id: req.user_id },
    returning: true,
  });
  const User_Obj = await User.findOne({ where: { id: req.user_id } });
  res.json(User_Obj);
});

const DeleteUser = asynchandler(async (req, res, next) => {
  const user = await User.findOne({ where: { id: req.user_id } });
  if (!user) {
    next(new ApiError(404, "User Object Not Found"));
  }
  await User.destroy({ where: { id: req.user_id } });
  const Resp = new ApiResponse(200, {}, "User object Deleted");
  res.status(200).json(Resp);
});

const LogoutUser = asynchandler(async (req, res, next) => {
  try {
    res.cookie("auth-token", "", {
      httpOnly: true,
      secure: true,
      maxAge: 0,
    });
    res.status(200).json({ message: "User Logged Out" });
  } catch (error) {
    throw new ApiError(500, "Error Logging Out");
  }
});
export {
  Authenticate_User,
  CreateUser,
  GetListUser,
  GetUserById,
  UpdateUser,
  DeleteUser,
  LogoutUser,
};
