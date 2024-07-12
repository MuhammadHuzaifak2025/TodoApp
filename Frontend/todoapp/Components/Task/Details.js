"use client";
import React, { useState } from "react";
import { motion } from "framer-motion";

const Details = ({
  TaskName,
  Serial,
  Status,
  Description,
  setlistSpread,
  AllViewHandler,
  Color,
}) => {
  const Spread = () => {
    setlistSpread(true);
    AllViewHandler(true);
  };

  const [EditBool, SetEditBool] = useState(false);

  const Editable = () => {
    SetEditBool(true);
  };
  const SaveChanges = () => {
    SetEditBool(false);
  };
  return (
    <motion.div
      dragConstraints={{ left: 0, right: 0 }}
      className="border-4 rounded-2xl h-full mx-auto p-4 my-4"
      style={{ borderColor: Color }}
    >
      <form>
        <div className="flex items-center justify-between mb-2">
          <h1 className="text-xl font-bold">
            Task Name :
            <span className={`${EditBool ? "hidden" : ""}`}>
              {" " + TaskName}
            </span>
            <span className={`${EditBool ? "pl-1" : "hidden"}`}>
              <input
                className="bg-black  w-40 h-8 text-left items-center rounded-xl focus:border-blue-500"
                type="text"
                defaultValue={TaskName}
              />
            </span>
          </h1>

          <h3 className="mr-4">
            Status:{" "}
            <span className={`${EditBool ? "hidden" : "text-sm"}`}>
              {" " + Status}
            </span>
            <span className={`${EditBool ? "text-sm " : "hidden"}`}>
              <input
                className="bg-black w-20 text-sm  rounded-xl h-6  items-center focus:border-blue-500"
                type="text"
                defaultValue={Status}
              />
            </span>
          </h3>
        </div>
        <div>
          <div className="flex justify-start">
            <p className="p-0 m-0 pl-4">Estimated Time: </p>
            <p className="p-0 m-0 pl-4">Due Date: </p>
          </div>
          <div className="text-left m-3 pt-3 font-semibold h-36 overflow-y-hidden overflow-x-hidden pr-3 scrollbar-thin">
            <span className={`${EditBool ? "hidden" : ""}`}>
              {"Description " + Description}
            </span>
            <span
              className={`${EditBool ? "pl-1 overflow-x-hidden" : "hidden"}`}
            >
              <textarea
                className="text-wrap bg-black p-1 w-full rounded-xl h-full overflow-x-hidden text-left scrollbar-thin items-center focus:border-blue-500"
                defaultValue={"Description " + Description}
              />
            </span>
          </div>
        </div>
      </form>
      <div className="py-5 flex justify-start ml-3">
        <button
          className={`${
            !EditBool
              ? "hidden"
              : "w-2/12 mr-3 border-2 border-[#56ff2c] pr-4 text-xl pl-4 pt-1 pb-1 rounded-md text-center font-bold hover:bg-[#56ff2cdc]"
          }`}
          onClick={SaveChanges}
        >
          Save
        </button>
        <button
          className={`${
            EditBool
              ? "hidden"
              : "w-2/12 mr-3 border-2 border-[#ffbd03] pr-4 text-xl pl-4 pt-1 pb-1 rounded-md text-center font-bold hover:bg-[#ffbd03]"
          }`}
          onClick={Editable}
        >
          Edit
        </button>
        <button className="w-2/12 mr-3 border-2 border-[#c5416d] pr-4 pl-4 pt-1 text-xl pb-1 rounded-md text-center font-bold hover:bg-[#c5416d]">
          Delete
        </button>
        <button className="w-3/12 mr-3 border-2 border-[#5dbea3] text-xl pr-4 pl-4 pt-1 pb-1 rounded-md text-center font-bold hover:bg-[#5dbea3]">
          Mark As Done
        </button>
      </div>
      <div className="flex justify-center">
        <button onClick={Spread} className="mr-5 mb-1 ">
          Show Less
        </button>
      </div>
    </motion.div>
  );
};

export default Details;
