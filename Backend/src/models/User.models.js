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
    tableName: "User",
  }
);

(async () => {
  try {
    await sequelize.query("SELECT 1 FROM `User` LIMIT 1;");
  } catch (error) {
    if (error.name === "SequelizeDatabaseError") {
      try {
        await sequelize.sync();
        console.log("User table has been created.");
      } catch (syncError) {
        console.error("Error creating User table:", syncError);
      }
    } else {
      console.error("Unexpected error:", error);
    }
  }
})();

export default User;
