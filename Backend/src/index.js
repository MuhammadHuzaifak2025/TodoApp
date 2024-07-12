import dotenv from "dotenv";
import pool from "./db/index.js";
import app from "./app.js";

dotenv.config({
  path: "../",
});

await pool
  .query("SELECT 1")
  .then(() => {
    app.listen(process.env.PORT || 5000, () => {
      console.log("Hello World");
    });
    app.on(error, (error) => {
      console.log("Process Terminated Error: ", error);
    });

    app.route("api/todo/", TodoRoutes);
  })
  .catch((error) => {
    console.error("Error connecting to the database:", error.message);
  });
