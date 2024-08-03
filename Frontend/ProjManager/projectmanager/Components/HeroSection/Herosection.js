"use client";
import React, { useEffect, useState } from "react";
import axios from "axios";
import getCookie from "../../app/api/getcookie";

const Herosection = ({ User }) => {
  const [UserName, SetUser] = useState(" ");

  const today = new Date();
  const date = today.getDate();
  const month = today.getMonth() + 1;
  const year = today.getFullYear();

  const formattedDate = ` ${date}/${month}/${year}`;

  useEffect(() => {
    const getUserDetails = async () => {
      const authToken = getCookie("auth-token"); // Use the correct cookie name

      try {
        const resp = await axios.get("http://localhost:8000/api/v1/user", {
          withCredentials: true,
        });
        console.log(resp.data.data);
        SetUser(resp.data.data.firstName + " " + resp.data.data.lastName); // Assuming response contains userName
      } catch (error) {
        console.log(error);
        console.error(
          "Error fetching data:",
          error.response ? error.response.data : error.message
        );
      }
    };

    getUserDetails();
  }, []);

  return (
    <div className="flex justify-between mr-5 font-semibold text-xl items-baseline">
      <div>
        <h1 className={` ${UserName === " " ? "hidden" : "block"}`}>
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
