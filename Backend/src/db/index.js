import Sequelize from "sequelize";
import dotenv from "dotenv";

dotenv.config();

const sequelize = new Sequelize(
  process.env.todo_DATABASENAME,
  process.env.todo_USER,
  process.env.todo_PASSWORD,
  {
    dialect: "mysql",
    pool: {
      max: 5,
      idle: 30000,
      acquire: 60000,
    },
  }
);

const VerifyConnection = () => {
  return new Promise((resolve, reject) => {
    sequelize
      .authenticate()
      .then(() => {
        console.log("Connection has been established successfully.");
        resolve();
      })
      .catch((error) => {
        console.error("Unable to connect to the database:", error);
        reject(error);
      });
  });
};


const SyncAllModels = () => {
  return new Promise((resolve, reject) => {
    sequelize
      .sync()
      .then(() => {
        console.log("All tables have been Synced.");
        resolve();
      })
      .catch((syncError) => {
        console.error("Error creating tables:", syncError);
        reject(syncError);
      });
  });
};

export default sequelize;
export { SyncAllModels, VerifyConnection };