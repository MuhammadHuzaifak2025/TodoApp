"use client";
import React from "react";
import Image from "next/image";
import Link from "next/link";
import axios from "axios";
const Navbar = () => {
  const LogoutUser = () => {
    try {
      axios
        .get("http://localhost:8000/api/v1/user/logout", {
          withCredentials: true,
        })
        .then((response) => {
          console.log(response);
          window.location.href = "http://localhost:3000";
        });
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <div className="text-white">
      <nav className="flex justify-between">
        <ul className="p-3 flex items-center">
          <li>
            <Image src={"/tasks.png"} width={40} height={40} />
          </li>
          <li className="pl-2 decoration-4 font-bold">Task Manager</li>
        </ul>
        <ul className="flex m-3 text-white font-semibold cursor-pointer">
          {/* <li className="m-3">Home</li>
          <li className="m-3">About</li>
          <li className="m-3">Contact</li>
          <li className="m-3">Logout</li> */}
          <Link className="m-3" href="/home">
            Home
          </Link>
          <Link className="m-3" href="/Activities">
            Activities
          </Link>
          <Link className="m-3" href="/Report">
            Report
          </Link>
          <button className="m-3" onClick={LogoutUser}>
            Logout
          </button>
        </ul>
      </nav>
    </div>
  );
};

export default Navbar;
