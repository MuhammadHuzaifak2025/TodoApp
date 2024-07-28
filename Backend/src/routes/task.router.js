import { Router } from "express";
import Authenticate_Header from "../middlewares/Authentication.js";
import { getTaskList } from "../controllers/task.controller.js";
const TaskRouter = Router();

TaskRouter.route("/task/").get();
TaskRouter.route("/tasks/").get(Authenticate_Header, getTaskList);

export default TaskRouter;
