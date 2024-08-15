import { createContext, useContext, useState } from "react";

// Create a context with a default value
export const TaskContext = createContext({
  taskUpdated: false,
  updatetask: () => {},
});

export const TaskProvider = TaskContext.Provider;

export default function useTaskUpdate() {
  return useContext(TaskContext);
}
