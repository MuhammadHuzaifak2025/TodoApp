"use client";
import React from "react";
import { useState, useEffect } from "react";
import AllCaughtUp from "./AllCaughtup";
import Tasklist from "./Tasklist";
import TempData from "./TempData";
import { Reorder, motion, useScroll } from "framer-motion";
import Filter from "./Filter";
import axios from "axios";
import getCookie from "@/app/api/getcookie";

const ListHandler = () => {
  const { scrollYProgress } = useScroll();
  const [allCaughtUp, SetallCaughtUp] = useState(false);
  const [listview, Setlistview] = useState(true);
  const [list, setList] = useState([]);
  const [TaskUpdated, setTaskUpdated] = useState(true);

  // const update_data = () => {}
  useEffect(() => {
    const getTask = async () => {
      try {
        const token = getCookie("auth-token");
        const tasklist = await axios.get(
          "http://localhost:8000/api/v1/tasks/",
          {
            headers: { "auth-token": token },
            withCredentials: true, // Include cookies with the request
          }
        );
        setTaskUpdated(false);
        console.log(tasklist.data);
        // console.log(TempData);
        setList(tasklist.data);
      } catch (error) {
        console.log(error);
      }
    };
    getTask();
  }, [TaskUpdated]);

  return (
    <>
      <div className={`${allCaughtUp ? "block" : "hidden"}`}>
        <AllCaughtUp />
      </div>
      <motion.div
        style={{ scaleX: scrollYProgress }}
        className="-mt-3 h-[420px] overflow-y-auto pr-5 scrollbar-thin scrollbar-thumb-[#757474] scrollbar-track-[#3d3d3d] "
      >
        <Reorder.Group values={list} onReorder={setList}>
          {list.map((item) => (
            <Reorder.Item value={item} key={item.taskid} axis="y">
              <Tasklist
                TaskUpdated={TaskUpdated}
                setTaskUpdated={setTaskUpdated}
                TaskName={item.taskname}
                Status={item.status}
                taskid={item.taskid}
                setlistSpread={Setlistview}
                listSpread={listview}
                Description={item.description}
                className=""
              />
            </Reorder.Item>
          ))}
        </Reorder.Group>
      </motion.div>
      <Filter />
    </>
  );
};

export default ListHandler;
