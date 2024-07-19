import { Router } from "express";
import {CreateUser} from '../controllers/temp.js'

const UserRouter = Router();

UserRouter.route("/").get(CreateUser)


export default UserRouter;
