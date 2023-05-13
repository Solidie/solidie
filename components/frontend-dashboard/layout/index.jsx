import React, { useState } from "react";
import Topbar from "../components/navigation/Topbar.jsx";
import Sidebar from "../components/navigation/Sidebar.jsx";

export default function Layout({ children }) {
  const [sidebarOpen, setSidebarOpen] = useState(true);

  return (
    <div className="bg-primary h-screen w-full !min-h-max flex flex-col overflow-y-clip">
      <Topbar {...{ sidebarOpen, setSidebarOpen }} />
      <div className="flex flex-grow w-full overflow-clip">
        <Sidebar {...{ sidebarOpen }} />
        <div className="p-7 w-full bg-content-bg border-l border-white">
          {children}
        </div>
      </div>
    </div>
  );
}
