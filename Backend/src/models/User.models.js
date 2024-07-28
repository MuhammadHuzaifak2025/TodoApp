import { DataTypes } from "sequelize";
import sequelize from "../db/index.js";
import bcrypt from "bcrypt";
import dotenv from "dotenv";

dotenv.config();
const saltRounds = parseInt(process.env.SALT_ROUNDS, 10);

const User = sequelize.define("User", {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  },
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
}, {
  tableName: "Users",
  hooks: {
    beforeSave: async (user, options) => {
      if (user.changed("password")) {
        user.password = await bcrypt.hash(user.password, saltRounds);
      }
    },
    beforeUpdate: async (user, options) => {
      if (user.changed("password")) {
        user.password = await bcrypt.hash(user.password, saltRounds);
      }
    },
  },
});

export default User;
