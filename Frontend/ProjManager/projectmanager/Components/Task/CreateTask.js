import React, { useState } from "react";
import axios from "axios";
import useTaskUpdate from "@/context/Taskupdates";
const CreateTask = ({ onTaskCreated }) => {
  const [taskName, setTaskName] = useState("");
  const [description, setDescription] = useState("");
  const [status, setStatus] = useState("");
  const [dueDate, setDueDate] = useState("");
  const [estimatedTime, setEstimatedTime] = useState("");
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const { setTaskUpdated } = useTaskUpdate();

  const handleCreateTask = async (e) => {
    e.preventDefault();
    try {
      const resp = await axios.post(
        "http://localhost:8000/api/v1/tasks",
        {
          TaskName: taskName,
          TaskDetails: description,
          Status: "pending",
          DueDate: dueDate,
          EstimationDate: estimatedTime,
        },
        { withCredentials: true }
      );
      if (resp.status === 200) {
        setSuccess("Task created successfully!");
        onTaskCreated();
        setTaskName("");
        setDescription("");
        setStatus("");
        setDueDate("");
        setEstimatedTime("");
        setTaskUpdated(true);
      }
    } catch (error) {
      setError("Error creating task. Please try again.");
    }
  };

  return (
    <div className="max-w-screen-xl mx-auto bg-white p-8 rounded-lg shadow-lg">
      <form onSubmit={handleCreateTask} className="">
        <div className="flex justify-between items-center ">
          <h2 className="text-2xl font-bold mb-4 text-gray-800">
            Create a Task
          </h2>
        </div>
        {success && <div className="text-green-500 mb-4">{success}</div>}
        {error && <div className="text-red-500 mb-4">{error}</div>}
        <div className="mb-4">
          <label className="block text-gray-700 font-medium mb-2">
            Task Name
          </label>
          <input
            type="text"
            value={taskName}
            onChange={(e) => setTaskName(e.target.value)}
            className="w-full p-2 border border-gray-300 rounded-lg focus:outline-none focus:border-blue-500"
            placeholder="Enter task name"
            required
          />
        </div>
        <div className="mb-4">
          <label className="block text-gray-700 font-medium mb-2">
            Description
          </label>
          <textarea
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            className="w-full p-2 border border-gray-300 rounded-lg focus:outline-none focus:border-blue-500"
            placeholder="Enter task description"
            rows="3"
            required
          />
        </div>

        <div className="mb-4 flex space-x-8">
          <div className="w-1/2">
            <label className="block text-gray-700 font-medium mb-2">
              Due Date
            </label>
            <input
              type="date"
              value={dueDate}
              onChange={(e) => setDueDate(e.target.value)}
              className="w-full p-2 border border-gray-300 rounded-lg focus:outline-none focus:border-blue-500"
              required
            />
          </div>
          <div className="w-1/2">
            <label className="block text-gray-700 font-medium mb-2">
              Estimated Time
            </label>
            <input
              type="date"
              value={estimatedTime}
              onChange={(e) => setEstimatedTime(e.target.value)}
              className="w-full p-2 border border-gray-300 rounded-lg focus:outline-none focus:border-blue-500"
              placeholder="Enter estimated time"
              required
            />
          </div>
        </div>
        <button
          type="submit"
          className="w-full bg-blue-500 text-white py-2 rounded-lg font-medium hover:bg-blue-600 transition duration-300"
        >
          Create Task
        </button>
      </form>
    </div>
  );
};

export default CreateTask;
