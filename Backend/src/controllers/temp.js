// import { response } from "express";
import asynchandler from "../utils/AsyncHandler.js";
import User from "../models/User.models.js";

const CreateUser = asynchandler(async (req, res) => {
  await User.create({
    firstName: "Muhammad",
    username: "MuhammadHUzaifa",
    lastName: "Huzaifa",
    age: 21,
    email: "mhuzaifa91@gmail.com",
    password: "Huzaifa123",
  });
  res.status(200).json({
    Message: "Hello World",
  });
});

export { CreateUser };
