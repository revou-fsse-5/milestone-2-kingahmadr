// import React from "react";
import CategoryTab from "../components/CategoryTab";
import Navbar from "../components/Navbar";
import { Outlet } from "react-router-dom";
const HomePage = () => {
  return (
    <div>
      <Navbar />
      <CategoryTab />
      <Outlet />
    </div>
  );
};

export default HomePage;
