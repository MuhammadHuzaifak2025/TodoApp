import React from "react";
import Image from "next/image";
import Link from "next/link";
import CreateTaskPopup from "./CreateTaskPopup";
import { useState } from "react";

const AllCaughtUp = ({ onTaskCreated }) => {
  const [taskCreated, setTaskCreated] = useState(false);

  return (
    <div className="flex flex-col justify-center items-center mt-[15%] font-semibold text-4xl">
      <div className="flex">
        <Image
          src={"/AllCaughtup.png"}
          width={80}
          height={80}
          alt="All Caught Up"
          className="mr-7"
        />
        <div className="items-center text-center">
          <div className="flex items-center">
            <h1>You Are All Caught Up - No Pending Task</h1>
          </div>
          {/* <Link
            href="/"
            className="items-center text-2xl font-bold hover:underline decoration-wavy text-[#3d91fb] decoration-[#ffffff] hover:decoration-[#3d91fb] hover:text-[#ffffff]"
          >
            Create A New Task
          </Link> */}
          <CreateTaskPopup onTaskCreated={onTaskCreated} />
        </div>
      </div>
    </div>
  );
};

export default AllCaughtUp;
