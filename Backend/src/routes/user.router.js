import { Router } from "express";
import Temp from '../controllers/temp.js'

const UserRouter = Router();

UserRouter.route("/temp").get(Temp)


export default UserRouter;
