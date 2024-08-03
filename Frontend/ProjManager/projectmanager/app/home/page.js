import React from "react";
import Herosection from "../../Components/HeroSection/Herosection";
import Taskheader from "@/Components/Task/Taskheader";
import ListHandler from "@/Components/Task/ListHandler";
import Navbar from "@/Components/NavBar/Navbar";

function Home() {
  return (
    <div className="text-white">
      <ListHandler />
    </div>
  );
}
export default Home;
