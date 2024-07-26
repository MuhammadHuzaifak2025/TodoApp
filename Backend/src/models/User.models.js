import sequelize from "../db/index.js";
import DataTypes from "sequelize";
import dotenv from "dotenv";
import bcrypt from "bcrypt";

dotenv.config();
const saltRounds = parseInt(process.env.SALT_ROUNDS, 10);

const User = sequelize.define(
  "User",
  {
    firstName: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    username: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
    },
    lastName: {
      type: DataTypes.STRING,
    },
    age: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    email: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    password: {
      type: DataTypes.STRING,
      allowNull: false,
    },
  },
  {
    tableName: "Users",
    hooks: {
      beforeSave: async (user, options) => {
        console.log("Before Save");
        if (user.changed("password")) { 
          user.password = await bcrypt.hash(user.password, saltRounds);
        }
      },
      beforeUpdate: async (user, options) => {
        console.log("Before Save");
        if (user.changed("password")) {
          user.password = await bcrypt.hash(user.password, saltRounds);
        }
      },
    },
  }
);

export default User;
