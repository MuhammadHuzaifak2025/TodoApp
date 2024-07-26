import { Router } from "express";
import { CreateUser, GetListUser, GetUserById, Authenticate_User } from "../controllers/user.controller.js";
import Authenticate_Header from "../middlewares/Authentication.js"; 

const UserRouter = Router();

UserRouter.route("/user").get(Authenticate_Header,GetListUser);
UserRouter.route("/user/:id").get(Authenticate_Header,GetUserById);
UserRouter.route("/user").post(CreateUser);
UserRouter.route("/user/login").post(Authenticate_User);

export default UserRouter;
