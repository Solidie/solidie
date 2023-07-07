import React from "react";
import { MenuIcon } from "./icons";
import UserProfile from "./UserProfile.jsx";

const Topbar = ({ sidebarOpen, setSidebarOpen, frontendDashboardData }) => {
  return (
    <div className={"bg-brand-white h-max py flex justify-between items-center ".classNames()}>
      <div className={"w-max py-4 px-6 flex justify-between items-center gap-4".classNames()}>
        <div
          onClick={() => setSidebarOpen(!sidebarOpen)}
          className={"hover:shadow-none active:outline active:outline-tertiary/10 cursor-pointer shadow-sm shadow-tertiary w-max h-max bg-tertiary text-primary text-xl p-1 rounded-md".classNames()}
        >
          <MenuIcon />
        </div>
        <div className={"h-max w-max select-none".classNames()}>
          <img
            src={`https://img.logoipsum.com/${233 + Math.floor(Math.random() * (43 - 33 + 1))}.svg`}
            className={"w-32 max-h-8 select-none object-contain".classNames()}
            alt=""
          />
        </div>
      </div>
      <div className={"flex-grow w-full flex justify-end items-center sm:px-4 ".classNames()}>
        <UserProfile {...{ frontendDashboardData }} />
      </div>
    </div>
  );
};

export default Topbar;
