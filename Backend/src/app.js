import express from "express";
import cookieparser from "cookie-parser";
import cors from "cors";

const app = express();

app.use(
  cors({
    origin: process.env.CORS,
    credentials: true,
  })
);

app.use(
  express.json({
    limit: "50kb",
  })
);
app.use(
  express.urlencoded({
    extended: true,
    limit: "50kb",
  })
);

app.use(express.static("public"));

app.use(cookieparser());


import UserRouter from "./routes/user.router.js";


app.use("/users", UserRouter)


export default app;
