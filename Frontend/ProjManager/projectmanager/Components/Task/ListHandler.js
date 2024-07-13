"use client";
import React from "react";
import { useState } from "react";
import AllCaughtUp from "./AllCaughtup";
import Tasklist from "./Tasklist";
import TempData from "./TempData";
import { Reorder, motion } from "framer-motion";

const ListHandler = () => {
  const [allCaughtUp, SetallCaughtUp] = useState(false);
  const [listview, Setlistview] = useState(true);
  const [list, setList] = useState(TempData);

  // const update_data = () => {}

  return (
    <>
      <div className={`${allCaughtUp ? "block" : "hidden"}`}>
        <AllCaughtUp />
      </div>
      <div className="-mt-3 h-full overflow-y-auto pr-5 scrollbar-thin scrollbar-*-rounded-* scrollbar-thumb-[#757474] scrollbar-track-[#3d3d3d] ">
        <Reorder.Group values={list} onReorder={setList}>
          {list.map((item) => (
            <Reorder.Item value={item} key={item.id} axis="y">
              <Tasklist
                TaskName={item.TaskName}
                Status={item.Status}
                Serial={item.Serial}
                setlistSpread={Setlistview}
                listSpread={listview}
                Description={item.Description}
                className=""
              />
            </Reorder.Item>
          ))}
        </Reorder.Group>
      </div>
    </>
  );
};

export default ListHandler;
