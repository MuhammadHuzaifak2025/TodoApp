// import { response } from "express";
import asynchandler from "../utils/AsyncHandler.js";
import User from "../models/User.models.js";
import jwt from "jsonwebtoken";
import ApiResponse from "../utils/ResponseHandling.js";
import ApiError from "../utils/ErrorHandling.js";

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

  const token = jwt.sign(
    {
      username: user.username,
      id: user._id,
    },
    process.env.JWT_SECRET,
    {
      expiresIn: "30d",
    }
  );

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

export { CreateUser, GetListUser };
