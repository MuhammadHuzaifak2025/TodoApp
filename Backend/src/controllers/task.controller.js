import bcrypt from "bcrypt";
import asynchandler from "../utils/AsyncHandler.js";
import ApiResponse from "../utils/ResponseHandling.js";
import ApiError from "../utils/ErrorHandling.js";
import GenerateToken from "../utils/GenerateToken.js";
import Task from "../models/Task.models.js";
import User from "../models/User.models.js";
import { where } from "sequelize";
import moment from "moment"
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
  const Taskobj = await Task.findOne({
    where: { taskid: req.params.id, userId: req.user_id },
    attributes: { exclude: ["userId"] },
  });
  const Resp = new ApiResponse(200, Taskobj, "Message Found");
  if (Taskobj == null) {
    next(new ApiError(404, "Task Not Found"));
  } else res.status(200).json(Resp);
});

const UpdateTask = asynchandler(async (req, res, next) => {
  const { TaskName, TaskDetails, EstimationDate, DueDate, status } = req.body;

  let NewTask = {};
  if (TaskName !== undefined) NewTask.TaskName = TaskName;
  if (TaskDetails !== undefined) NewTask.TaskDetails = TaskDetails;
  if (EstimationDate !== undefined) NewTask.EstimationDate = EstimationDate;
  if (DueDate !== undefined) NewTask.DueDate = DueDate;
  if (status !== undefined) NewTask.status = status;

  // const task = await Task.update({ where: {} });
});

const CreateTask = asynchandler(async (req, res, next) => {
  const { TaskName, TaskDetails, EstimationDate, DueDate, Status } = req.body;
  const UserId = req.id;

  
  if (!(TaskName || UserId || TaskDetails || Status)) {
    return next(
      new ApiError(
        400,
        "Required Fields are not provided. Required Fields are: Status, TaskDetails, TaskName"
      )
    );
  }

  
  const estimationDate = moment(EstimationDate, moment.ISO_8601, true);
  const dueDate = moment(DueDate, moment.ISO_8601, true);

  // Check if the dates are valid
  if (!estimationDate.isValid() || !dueDate.isValid()) {
    return next(new ApiError(400, "Invalid date format"));
  }

  try {
    const TaskObj = await Task.create({
      taskname: TaskName,
      description: TaskDetails,
      status: Status,
      duedate: DueDate,
      EstimatedTime: estimationDate,
      userId: UserId,
    });

    if (TaskObj) {
      return res.status(200).json(new ApiResponse(200, TaskObj, "Task Created"));
    } else {
      return next(new ApiError(400, "Error Creating Task"));
    }
  } catch (error) {
    return next(new ApiError(500, "Internal Server Error"));
  }
});

export { getTaskList, getTask, CreateTask };
