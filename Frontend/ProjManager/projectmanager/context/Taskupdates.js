import { createContext, useContext, useState } from "react";

// Create a context with a default value
export const TaskContext = createContext({
  taskUpdated: false,
  setTaskUpdated: () => {},
});

// TaskProvider component to wrap your components
export const TaskProvider = ({ children }) => {
  const [taskUpdated, setTaskUpdated] = useState(false);
  console.log(taskUpdated);
  return (
    <TaskContext.Provider value={{ taskUpdated, setTaskUpdated }}>
      {children}
    </TaskContext.Provider>
  );
};

// Custom hook to use the TaskContext
export default function useTaskUpdate() {
  return useContext(TaskContext);
}
