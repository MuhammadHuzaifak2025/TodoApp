"use client";
import React, { useEffect, useState } from "react";

const Herosection = ({ User }) => {
  const [UserName, SetUser] = useState(" ");

  const today = new Date();
  const date = today.getDate();
  const month = today.getMonth() + 1;
  const year = today.getFullYear();

  const formattedDate = ` ${date}/${month}/${year}`;

  useEffect(() => {
    SetUser(User);
  }, [User]);

  return (
    <div className="flex justify-between mt-7 mr-5 font-semibold text-xl items-baseline">
      <div>
        <h1
          className={` ${UserName === " " ? "hidden" : "block"}`}
        >
          Good Morning <span className="font-bold text-2xl">{UserName}</span>,
        </h1>
      </div>
      <div className="font-bold">
        <h1>Date : {formattedDate} </h1>
      </div>
    </div>
  );
};

export default Herosection;
