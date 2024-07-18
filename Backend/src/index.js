import dotenv from "dotenv";
dotenv.config();

import sequelize from "./db/index.js";
import app from "./app.js";
import { SyncAllModels, VerifyConnection } from "./db/index.js";

// Verify the database connection
VerifyConnection()
  .then(() => {

    app.listen(1000, () => {
      console.log("Listening on port 1000");
    });


    SyncAllModels();
  })
  .catch((err) => {
    console.error("Unable to connect to the database:", err);
  });
