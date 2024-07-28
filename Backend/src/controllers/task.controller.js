import bcrypt from "bcrypt";
import asynchandler from "../utils/AsyncHandler.js";
import ApiResponse from "../utils/ResponseHandling.js";
import ApiError from "../utils/ErrorHandling.js";
import GenerateToken from "../utils/GenerateToken.js";
import Task from "../models/Task.models.js";
import User from "../models/User.models.js";
import { where } from "sequelize";
const getTaskList = asynchandler(async (req, res, next) => {
  const user_id = req.user_id;
  const userTasks = await Task.findAll({
    where: { userId: user_id },
    attributes: [
      "taskid",
      "taskname",
      "description",
      "status",
      "duedate",
      "EstimatedTime",
    ],
  });
  res.json(userTasks);
});

const getTask = asynchandler(async (req, res, next) => {
  await   
});
export { getTaskList };
