import sequelize from "../db/index.js";
import DataTypes from "sequelize";

const Task = sequelize.define(
  "task",
  {
    taskid: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
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
    EstimatedTime: {
      type: DataTypes.DATEONLY,
      allowNull: false,
    },
  },
  {
    tableName: "taskS",
  }
);

export default Task;
