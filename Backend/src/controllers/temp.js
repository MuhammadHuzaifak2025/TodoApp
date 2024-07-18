// import { response } from "express";
import asynchandler from "../utils/AsyncHandler.js";

const Temp = asynchandler(async (req, res) => {
  res.status(200).json({
    Message : "Hello World"
  })
});

export default Temp;
