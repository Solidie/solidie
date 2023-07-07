import React, { useEffect, useLayoutEffect, useState } from "react";
import Topbar from "../navigation/Topbar.jsx";
import Sidebar from "../navigation/Sidebar.jsx";
import { Scrollbar } from "../../utilities/commons";
import { cn } from "../../utilities/helpers.jsx";

export default function Layout({ children }) {
  const [sidebarOpen, setSidebarOpen] = useState(true);

  useEffect(() => {
    if(window.innerWidth < 1040) {
      setSidebarOpen(false)
    }
  },[window.innerWidth])

  return (
    <div className={"theme-light bg-content-bg text-tertiary w-full !min-h-max !h-full flex flex-col overflow-y-clip".classNames()}>
      <Topbar {...{ sidebarOpen, setSidebarOpen }} />
      <div className={" relative flex flex-grow w-full min-h-max h-full overflow-clip".classNames()}>
        <Scrollbar scrollAreaRootClassName={cn(
                    sidebarOpen
                    ? " !sticky lg:!sticky sm:!absolute sm:inset-0 left-0 "
                    : " hidden lg:flex ",
          "bg-brand-white z-50 w-max !min-w-max h-full md:shadow-xl ")} scrollAreaViewportclassName={"bg-brand-white w-max [_div]:!w-max [_div]:!min-w-max".classNames()}>
          <Sidebar {...{ sidebarOpen, setSidebarOpen }} />
        </Scrollbar>
        <Scrollbar scrollAreaViewportClassName={" w-full"}>
          <div className={"p-7 pb-10 pt-4 max-w-screen-xl  min-h-max h-max w-full " + (sidebarOpen ? " hidden sm:block " : "  ")}>
            {children}
          </div>
        </Scrollbar>
      </div>
    </div>
  );
}
