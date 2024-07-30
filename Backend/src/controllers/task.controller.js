import bcrypt from "bcrypt";
import asynchandler from "../utils/AsyncHandler.js";
import ApiResponse from "../utils/ResponseHandling.js";
import ApiError from "../utils/ErrorHandling.js";
import GenerateToken from "../utils/GenerateToken.js";
import Task from "../models/Task.models.js";
import User from "../models/User.models.js";
import { where } from "sequelize";
import moment from "moment";
const getTaskList = asynchandler(async (req, res, next) => {
  const user_id = req.user_id;
  const userTasks = await Task.findAll({
    where: { userid: user_id },
    attributes: [
      "taskid",
      "taskname",
      "description",
      "status",
      "duedate",
      "estimationdate",
    ],
  });
  res.json(userTasks);
});

const getTask = asynchandler(async (req, res, next) => {
  const Taskobj = await Task.findOne({
    where: { taskid: req.params.id, userid: req.user_id },
    attributes: { exclude: ["userid"] },
  });
  const Resp = new ApiResponse(200, Taskobj, "Message Found");
  if (Taskobj == null) {
    next(new ApiError(404, "Task Not Found"));
  } else res.status(200).json(Resp);
});

const UpdateTask = asynchandler(async (req, res, next) => {
  const { taskname, description, estimationdate, duedate, status } = req.body;

  let NewTask = {};
  if (!(taskname || description || status)) {
    return next(
      new ApiError(
        400,
        "Required Fields are not provided. Required Fields are: Status, TaskDetails, TaskName \nNote Check Spelling"
      )
    );
  }

  if (taskname !== undefined) NewTask.taskname = taskname;
  if (description !== undefined) NewTask.description = description;
  if (estimationdate !== undefined)
    NewTask.estimationdate = new Date(estimationdate);
  if (duedate !== undefined) NewTask.duedate = new Date(duedate);
  if (status !== undefined) NewTask.status = status;

  const task = await Task.update(NewTask, {
    where: { taskid: parseInt(req.params.id) },
  });

  if (!(task[0] === 0)) {
    const updatedtask = await Task.findOne({
      where: { taskid: req.params.id, userid: req.user_id },
      attributes: { exclude: ["userid"] },
    });
    res.status(200).json(new ApiResponse(200, updatedtask, "Task Updated"));
  } else {
    next(new ApiError(400, "Error Updating Task"));
  }
});

const CreateTask = asynchandler(async (req, res, next) => {
  const { TaskName, TaskDetails, EstimationDate, DueDate, Status } = req.body;
  const userid = req.user_id;

  if (!(TaskName || userid || TaskDetails || Status)) {
    return next(
      new ApiError(
        400,
        "Required Fields are not provided. Required Fields are: Status, TaskDetails, TaskName"
      )
    );
  }

  const estimationDate = new Date(EstimationDate);
  const DueDate_D = new Date(DueDate);

  const TaskObj = await Task.create({
    taskname: TaskName,
    description: TaskDetails,
    status: Status,
    duedate: DueDate_D,
    estimationdate: estimationDate,
    userid: userid,
  });

  if (TaskObj) {
    return res.status(200).json(new ApiResponse(200, TaskObj, "Task Created"));
  } else {
    return next(new ApiError(400, "Error Creating Task"));
  }

  return next(new ApiError(500, "Internal Server Error"));
});

const Delete_Task = asynchandler(async (req, res, next) => {
  const Task_obj = await Task.findOne({
    where: { userid: req.user_id, taskid: req.params.id },
  });
  if (!Task_obj) {
    next(new ApiError(404, "Task Not Found"));
  }

  const DelTask = await Task.destroy({
    where: { userid: req.user_id, taskid: req.params.id },
  });
  if (DelTask) {
    res.status(200).json(new ApiResponse(200, Task_obj, "Task Deleted"));
  }
});

export { getTaskList, getTask, CreateTask, UpdateTask, Delete_Task };
