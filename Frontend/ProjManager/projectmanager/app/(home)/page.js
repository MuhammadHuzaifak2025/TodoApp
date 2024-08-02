import React from "react";
import Herosection from "../../Components/HeroSection/Herosection";
import Taskheader from "@/Components/Task/Taskheader";
import ListHandler from "@/Components/Task/ListHandler";
import Navbar from "@/Components/NavBar/Navbar";
// import { useEffect, useState } from "react";

export default function Home() {
  return (
    <div className="text-white">
      {/* <Navbar /> */}
      {/* <Herosection User="Huzaifa" />
      <Taskheader /> */}
      <ListHandler />
    </div>
  );
}
