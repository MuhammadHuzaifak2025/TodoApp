import express from "express";
import cookieparser from "cookie-parser";
import cors from "cors";
import {
  ErrorHandlerMiddleWare,
  ServerErrorMiddleWare,
} from "./middlewares/GlobalError.js";

const app = express();

app.use(
  cors({
    origin: 'http://localhost:3000',
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
import TaskRouter from "./routes/task.router.js";

app.use("/api/v1", UserRouter);
app.use("/api/v1", TaskRouter);
app.use("*", ServerErrorMiddleWare);
app.use(ErrorHandlerMiddleWare);

export default app;
