import React from "react";
import { MenuIcon } from "./icons";
import UserProfile from "./UserProfile.jsx";

const Topbar = ({ sidebarOpen, setSidebarOpen, frontendDashboardData }) => {
  return (
    <div className="h-max py flex justify-between items-center border-b-2 border-white">
      <div className="w-max py-4 px-6 flex justify-between items-center gap-4">
        <div
          onClick={() => setSidebarOpen(!sidebarOpen)}
          className="hover:shadow-none active:outline active:outline-tertiary/10 cursor-pointer shadow-sm shadow-tertiary w-max h-max bg-tertiary text-primary text-xl p-1 rounded-md"
        >
          <MenuIcon />
        </div>
        <div className="h-max w-max select-none">
          <img
            src="https://img.logoipsum.com/288.svg"
            className="select-none w-max h-8 object-contain"
            alt="Logo"
          />
        </div>
      </div>
      <div className="flex-grow w-full flex justify-end items-center px-4">
        <UserProfile {...{ frontendDashboardData }} />
      </div>
    </div>
  );
};

export default Topbar;
