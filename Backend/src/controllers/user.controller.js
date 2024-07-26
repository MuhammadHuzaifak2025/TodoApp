// import { response } from "express";
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
  const id = req.params.id;
  const user = await User.findOne({
    where: { id: req.params.id },
    attributes: { exclude: [("password", "createdAt", "updatedAt")] },
  });
  if (!user) {
    return next(new ApiError(404, "User not found"));
  }
  const Resp = new ApiResponse(200, user, "User found");
  res.status(200).json(Resp);
});

const Authenticate_User = asynchandler(async (req, res, next) => {
  const { username, password } = req.body;
  const User_Obj = await User.findOne({ where: { username: username } });
  if (!User_Obj) {
    next(new ApiError(400, "Username does not exist"));
  }
  const loggedin = await bcrypt.compare(password, User_Obj.password);
  if (loggedin) {
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

export { Authenticate_User, CreateUser, GetListUser, GetUserById };
