import { Router } from "express";
import { CreateUser, GetListUser } from "../controllers/user.controller.js";

const UserRouter = Router();

UserRouter.route("/user").post(CreateUser);
UserRouter.route("/users").get(GetListUser);

export default UserRouter;
