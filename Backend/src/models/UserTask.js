import User from "./User.models.js";
import Task from "./Task.models";

User.hasMany(Task, {
  foreignKey: "userId",
  as: "tasks",
});

Task.belongsTo(User, {
  foreignKey: "userId",
  as: "user",
});