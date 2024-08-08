"use client";
import React, { useState, useEffect, useCallback } from "react";
import { motion } from "framer-motion";
import axios from "axios";

const Details = ({
  TaskUpdated,
  setTaskUpdated,
  taskid,
  TaskName,
  Serial,
  Status,
  Description,
  setlistSpread,
  AllViewHandler,
  Color,
  EstimationDate,
  Due_Date,
}) => {
  const Spread = () => {
    setlistSpread(true);
    AllViewHandler(true);
  };

  const [EditBool, SetEditBool] = useState(false);
  const [taskname, SetTaskName] = useState(TaskName);
  const [description, SetDescription] = useState(Description);
  const [status, SetStatus] = useState(Status);
  const [duedate, SetDueDate] = useState(Due_Date);
  const [estimatedtime, SetEstimatedTime] = useState(EstimationDate);
  const [isDeleting, setIsDeleting] = useState(false);

  const Editable = () => {
    SetEditBool(true);
  };

  const DeleteTask = async () => {
    setIsDeleting(true); // Start the delete animation
    try {
      const resp = await axios.delete(
        `http://localhost:8000/api/v1/tasks/${Serial}`,
        { withCredentials: true }
      );
      if (resp.status === 200) {
        setTaskUpdated(!TaskUpdated);
        setTimeout(() => {
          Spread();
        }, 1100);
      }
      console.log(resp);
    } catch (error) {
      console.log(error);
    }
  };

  const SaveChanges = async (event) => {
    event.preventDefault();
    SetEditBool(false);

    try {
      const resp = await axios.put(
        `http://localhost:8000/api/v1/tasks/${Serial}`,
        {
          taskname: taskname,
          description: description,
          status: status,
          duedate: duedate,
          estimationdate: estimatedtime,
        },
        { withCredentials: true }
      );
      if (resp.status === 200) {
        setTaskUpdated(!TaskUpdated);
      }
      console.log(resp);
    } catch (error) {
      console.log({
        Serial,
        TaskName,
        Description,
        Status,
        Due_date,
        Estimated_Time,
      });
      console.log(error);
    }
  };

  return (
    <motion.div
      drag
      dragConstraints={{ left: 0, right: 0, top: 0, bottom: 0 }}
      className={`border-4 rounded-2xl max-h-fit mx-auto p-4 my-4 overflow-y-hidden overflow-x-hidden scrollbar-thin ${
        isDeleting ? "delete-animation" : ""
      }`}
      style={{ borderColor: Color }}
      initial={{ opacity: 1 }}
      animate={{ opacity: isDeleting ? 0 : 1, x: isDeleting ? 300 : 0 }}
      transition={{ duration: 2 }}
    >
      <form onSubmit={SaveChanges}>
        <div className="flex items-center justify-between mb-2">
          <h1 className="text-xl font-bold">
            Task Name :
            <span className={`${EditBool ? "hidden" : ""}`}>
              {" " + taskname}
            </span>
            <span className={`${EditBool ? "pl-1" : "hidden"}`}>
              <input
                className="bg-black w-40 h-8 text-left items-center rounded-xl focus:border-blue-500"
                type="text"
                value={taskname}
                onChange={(e) => SetTaskName(e.target.value)}
              />
            </span>
          </h1>

          <h3 className="mr-4">
            Status:{" "}
            <span className={`${EditBool ? "hidden" : "text-sm"}`}>
              {" " + status}
            </span>
            <span className={`${EditBool ? "text-sm " : "hidden"}`}>
              <select
                value={status}
                onChange={(e) => SetStatus(e.target.value)}
                className="bg-black w-20 text-sm rounded-xl h-6 items-center focus:border-blue-500"
                required
              >
                <option value="">Select status</option>
                <option value="pending">Pending</option>
                <option value="complete">Complete</option>
                <option value="expired">expired</option>
              </select>
            </span>
          </h3>
        </div>
        <div>
          <div className="flex justify-start">
            <p className="p-0 m-0 pl-4">Estimated Time: {estimatedtime} </p>
            <p className="p-0 m-0 pl-4">Due Date: </p>
            <span className={`${!EditBool? "flex text-white":"hidden"}`}>{duedate}</span>
            <input
              type="date"
              value={duedate}
              onChange={(e) => SetDueDate(e.target.value)}
              className={`${
                EditBool
                  ? "border border-gray-300 bg-black  rounded-lg focus:outline-none focus:border-blue-500 mb-1 ml-2 text-white"
                  : "hidden"
              }`}
            />
          </div>
          <div className="text-left m-3 pt-3 font-semibold h-36 overflow-y-hidden overflow-x-hidden pr-3 scrollbar-thin">
            <span className={`${EditBool ? "hidden" : ""}`}>
              {"Description " + description}
            </span>
            <span
              className={`${EditBool ? "pl-1 overflow-x-hidden" : "hidden"}`}
            >
              <textarea
                className="text-wrap bg-black p-1 w-full rounded-xl h-full overflow-x-hidden text-left scrollbar-thin items-center focus:border-blue-500"
                value={description}
                onChange={(e) => SetDescription(e.target.value)}
              />
            </span>
          </div>
        </div>
        <div className="py-5 flex justify-start ml-3">
          <button
            type="submit"
            className={`${
              !EditBool
                ? "hidden"
                : "w-2/12 mr-3 border-2 border-[#56ff2c] pr-4 text-xl pl-4 pt-1 pb-1 rounded-md text-center font-bold hover:bg-[#56ff2cdc]"
            }`}
          >
            Save
          </button>
          <button
            type="button"
            className={`${
              EditBool
                ? "hidden"
                : "w-2/12 mr-3 border-2 border-[#ffbd03] pr-4 text-xl pl-4 pt-1 pb-1 rounded-md text-center font-bold hover:bg-[#ffbd03]"
            }`}
            onClick={Editable}
          >
            Edit
          </button>
          <button
            type="button"
            onClick={DeleteTask}
            className="w-2/12 mr-3 border-2 border-[#c5416d] pr-4 pl-4 pt-1 text-xl pb-1 rounded-md text-center font-bold hover:bg-[#c5416d]"
          >
            Delete
          </button>
          <button
            type="button"
            className="w-3/12 mr-3 border-2 border-[#5dbea3] text-xl pr-4 pl-4 pt-1 pb-1 rounded-md text-center font-bold hover:bg-[#5dbea3]"
          >
            Mark As Done
          </button>
        </div>
      </form>
      <div className="flex justify-center">
        <button onClick={Spread} className="mr-5 mb-1 ">
          Show Less
        </button>
      </div>
    </motion.div>
  );
};

export default Details;
