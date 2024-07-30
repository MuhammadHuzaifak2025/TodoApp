// models/associations.js
import User from "./User.models.js";
import Task from "./Task.models.js";

// Define associations
User.hasMany(Task, { foreignKey: "userid", as: "tasks" });
Task.belongsTo(User, { foreignKey: "userid", as: "user" });

// Sync all models with associations
const syncModels = async () => {
  try {
    await User.sync();
    await Task.sync();
    console.log("Models synchronized successfully.");
  } catch (error) {
    console.error("Error synchronizing models:", error);
  }
};

export default syncModels;
