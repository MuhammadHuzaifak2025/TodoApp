"use client";
import React from "react";
import { useState, useEffect } from "react";
import AllCaughtUp from "./AllCaughtup";
import Tasklist from "./Tasklist";
import { Reorder, motion, useScroll } from "framer-motion";
import Filter from "./Filter";
import axios from "axios";
import getCookie from "@/app/api/getcookie";
import { TaskProvider } from "@/context/Taskupdates";
import useTaskUpdate from "@/context/Taskupdates";

const ListHandler = () => {
  const { scrollYProgress } = useScroll();
  const [allCaughtUp, SetallCaughtUp] = useState(false);
  const [listview, Setlistview] = useState(true);
  const [list, setList] = useState([]);
  const [taskUpdated, setTaskUpdated] = useState();

  const updatetask = (value) => {
    console.log("The Task is Updated");
    setTaskUpdated(value);
  };
  // const update_data = () => {}
  useEffect(() => {
    const getTask = async () => {
      try {
        Setlistview(true);
        const token = getCookie("auth-token");
        const tasklist = await axios.get(
          "http://localhost:8000/api/v1/tasks/",
          {
            headers: { "auth-token": token },
            withCredentials: true, // Include cookies with the request
          }
        );
        if (tasklist.data.length === 0) {
          SetallCaughtUp(true);
        }
        setTaskUpdated(false);
        console.log(tasklist.data);
        // console.log(TempData);
        setList(tasklist.data);
      } catch (error) {
        console.log(error);
      }
    };
    getTask();
  }, [taskUpdated]);

  return (
    <>
      <TaskProvider value={{ taskUpdated, updatetask }}>
        <div className={`${allCaughtUp ? "block" : "hidden"}`}>
          <AllCaughtUp />
        </div>

        <motion.div
          initial={{ scaleX: 0.01 }}
          animate={{ scaleX: scrollYProgress }}
          transition={{ duration: 0.5 }}
          className={`${
            !allCaughtUp
              ? "-mt-3 h-[420px] overflow-y-auto pr-5 scrollbar-thin scrollbar-thumb-[#757474] scrollbar-track-[#3d3d3d]"
              : "hidden"
          }`}
        >
          <Reorder.Group values={list} onReorder={setList}>
            {list.map((item) => (
              <Reorder.Item value={item} key={item.taskid} axis="y">
                <Tasklist
                  setTaskUpdated={setTaskUpdated}
                  TaskName={item.taskname}
                  Status={item.status}
                  taskid={item.taskid}
                  setlistSpread={Setlistview}
                  listSpread={listview}
                  Description={item.description}
                  Due_Date={item.duedate}
                  EstimationDate={item.estimationdate}
                  className=""
                />
              </Reorder.Item>
            ))}
          </Reorder.Group>
        </motion.div>
        <div className={`${allCaughtUp ? "mt-32" : ""}`}>
          <Filter />
        </div>
      </TaskProvider>
    </>
  );
};

export default ListHandler;
