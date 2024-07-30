import { Router } from "express";
import Authenticate_Header from "../middlewares/Authentication.js";
import {
  getTask,
  getTaskList,
  CreateTask,
  UpdateTask,
  Delete_Task,
} from "../controllers/task.controller.js";
const TaskRouter = Router();

TaskRouter.route("/task/").get();
TaskRouter.route("/tasks/:id/").get(Authenticate_Header, getTask);
TaskRouter.route("/tasks/").get(Authenticate_Header, getTaskList);
TaskRouter.route("/tasks/").post(Authenticate_Header, CreateTask);
TaskRouter.route("/tasks/:id/").put(Authenticate_Header, UpdateTask);
TaskRouter.route("/tasks/:id/").delete(Authenticate_Header, Delete_Task);

export default TaskRouter;
