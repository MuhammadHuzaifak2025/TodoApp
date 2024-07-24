import { Router } from "express";
import { CreateUser, GetListUser } from "../controllers/user.controller.js";

const UserRouter = Router();

UserRouter.route("/user").post(CreateUser);
UserRouter.route("/user").get(GetListUser);

export default UserRouter;
