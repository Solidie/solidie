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
    <div className="theme-light bg-content-bg text-tertiary w-full !min-h-max !h-full flex flex-col overflow-y-clip">
      <Topbar {...{ sidebarOpen, setSidebarOpen }} />
      <div className=" relative flex flex-grow w-full min-h-max h-full overflow-clip">
        <Scrollbar scrollAreaRootClassName={cn(
                    sidebarOpen
                    ? " !sticky lg:!sticky sm:!absolute sm:inset-0 left-0 "
                    : " hidden lg:flex ",
          "bg-brand-white z-50 w-max !min-w-max h-full md:shadow-xl ")} scrollAreaViewportClassName="bg-brand-white w-max [_div]:!w-max [_div]:!min-w-max">
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
