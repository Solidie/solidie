import React, { useEffect, useLayoutEffect, useState } from "react";
import Topbar from "../components/navigation/Topbar.jsx";
import Sidebar from "../components/navigation/Sidebar.jsx";
import { Scrollbar } from "../components/common";

export default function Layout({ children }) {
  const [sidebarOpen, setSidebarOpen] = useState(true);

  useEffect(() => {
    if(window.innerWidth < 1040) {
      setSidebarOpen(false)
    }
  },[window.innerWidth])

  return (
    <div className="bg-content-bg text-tertiary w-full !min-h-max !h-full flex flex-col overflow-y-clip">
      <Topbar {...{ sidebarOpen, setSidebarOpen }} />
      <div className="  flex flex-grow w-full min-h-max h-full overflow-clip">
        <Scrollbar scrollAreaRootClassName="bg-brand-white z-10 w-max !min-w-max h-full border-r border-brand-white " scrollAreaViewportClassName="bg-brand-white w-max [_div]:!w-max [_div]:!min-w-max">
          <Sidebar {...{ sidebarOpen, setSidebarOpen }} />
        </Scrollbar>
        <Scrollbar scrollAreaViewportClassName={" w-full"}>
          <div className={"p-7 pb-10 max-w-screen-xl  min-h-max h-max w-full " + (sidebarOpen ? " hidden sm:block " : "  ")}>
            {children}
          </div>
        </Scrollbar>
      </div>
    </div>
  );
}
