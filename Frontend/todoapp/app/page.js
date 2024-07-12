import Navbar from "../Components/NavBar/Navbar";
import Herosection from "../Components/HeroSection/Herosection";
import Taskheader from "@/Components/Task/Taskheader";
import ListHandler from "@/Components/Task/ListHandler";
// import { useEffect, useState } from "react";

export default function Home() {
  return (
    <div className="ml-20 mr-20">
      <Navbar />
      <Herosection User="Huzaifa" />
      <Taskheader />
      <ListHandler />

    </div>
  );
}
