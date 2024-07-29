import sequelize from "../db/index.js";
import DataTypes from "sequelize";
import User from "./User.models.js";
const Task = sequelize.define(
  "task",
  {
    taskid: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    userId: {
      type: DataTypes.INTEGER,
      references: {
        model: User, // name of the target table
        key: "id", // key in the target table
      },
    },
    taskname: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    description: {
      type: DataTypes.TEXT,
      allowNull: false,
    },
    status: {
      type: DataTypes.ENUM,
      values: ["pending", "complete", "expired"],
      allowNull: false,
      defaultValue: "pending",
    },
    duedate: {
      type: DataTypes.DATEONLY,
      allowNull: true,
    },
    estimationdate: {
      type: DataTypes.DATEONLY,
      allowNull: false,
    },
  },
  {
    tableName: "tasks",
  }
);

export default Task;
