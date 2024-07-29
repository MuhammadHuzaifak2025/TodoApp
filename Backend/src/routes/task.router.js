import { Router } from "express";
import Authenticate_Header from "../middlewares/Authentication.js";
import {
  getTask,
  getTaskList,
  CreateTask,
} from "../controllers/task.controller.js";
const TaskRouter = Router();

TaskRouter.route("/task/").get();
TaskRouter.route("/tasks/:id/").get(Authenticate_Header, getTask);
TaskRouter.route("/tasks/").get(Authenticate_Header, getTaskList);
TaskRouter.route("/tasks/").post(Authenticate_Header, CreateTask);

export default TaskRouter;
