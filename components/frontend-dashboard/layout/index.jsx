import React, { useState } from "react";
import Topbar from "../components/navigation/Topbar.jsx";
import Sidebar from "../components/navigation/Sidebar.jsx";
import { Scrollbar } from "../components/common";

export default function Layout({ children }) {
  const [sidebarOpen, setSidebarOpen] = useState(true);

  return (
    <div className="bg-primary text-tertiary h-screen w-full !min-h-max flex flex-col overflow-y-clip">
      <Topbar {...{ sidebarOpen, setSidebarOpen }} />
      <div className="flex flex-grow w-full overflow-clip">
        <Scrollbar scrollAreaRootClassName="z-10 w-max !min-w-max" scrollAreaViewportClassName="w-max [_div]:!w-max [_div]:!min-w-max">
          <Sidebar {...{ sidebarOpen }} />
        </Scrollbar>
        <Scrollbar>
          <div className={"p-7 h-max min-h-full w-full bg-content-bg border-l border-tertiary/10 " + (sidebarOpen ? " hidden sm:block " : "  ")}>
            {children}
          </div>
        </Scrollbar>
      </div>
    </div>
  );
}
