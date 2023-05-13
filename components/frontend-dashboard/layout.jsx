import React, { useEffect, useState } from "react";
import Topbar from "./components/navigation/Topbar.jsx";
import Sidebar from "./components/navigation/Sidebar.jsx";

export default function Layout({ children, props: { frontendDashboardData } }) {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  useEffect(() => {
    console.log(frontendDashboardData);
  });
  return (
    <div className="bg-primary h-screen w-full !min-h-max flex flex-col overflow-y-clip">
      <Topbar {...{ sidebarOpen, setSidebarOpen, frontendDashboardData }} />
      <div className="flex flex-grow w-full overflow-clip">
        <Sidebar {...{ sidebarOpen }} />
        <div className="p-7 bg-content-bg w-full shadow-2xl  border-l-2 border-white">
          {children}
        </div>
      </div>
    </div>
  );
}
