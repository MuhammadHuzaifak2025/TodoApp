import sequelize from "../db/index.js";
import DataTypes from "sequelize";

const User = sequelize.define(
  "User",
  {
    firstName: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    lastName: {
      type: DataTypes.STRING,
    },
  },
  {
    tableName: "Users",
  }
);

export default User;
