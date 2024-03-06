import React from "react";
import Sidebar from "../components/Sidebar";
import Navbar from "../components/Navbar";
import { useSelector } from "react-redux";

const Layout = ({ children }) => {
  const Auth = useSelector((state) => state.Auth);
  return (
    <div className="h-screen w-screen flex overflow-x-hidden">
      <Sidebar />

      <div className={`w-full ${Auth.openMenu ? "sm:w-4/5": "w-full"} `}>
        <Navbar />
        <div className="p-4">{children}</div>
      </div>
    </div>
  );
};

export default Layout;
