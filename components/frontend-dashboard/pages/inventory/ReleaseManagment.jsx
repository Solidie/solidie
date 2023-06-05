import React from "react";
import ReleaseManagmentTable from "../../components/inventory/ReleaseManagementTable.jsx";
import ApplicationVersionForm from "../../components/inventory/ApplicationVersionForm.jsx";
import { Link } from "react-router-dom";
import { ArrowLeftIcon } from "@radix-ui/react-icons";

const InventoryReleaseManagment = (params) => {
  return (
    <div className="text-tertiary flex flex-col gap-8 w-full h-max min-h-full">
      {/* Header */}
      <div className="flex flex-col justify-center w-full gap-4">
        <Link to="/dashboard/inventory">
          <button className="flex gap-2 justify-around items-center w-max bg-primary hover:bg-primary/70 focus:text-green-900 focus:outline-green-900 text-tertiary font-bold text-sm px-6 py-2 rounded-full shadow-xl active:animate-bounce shadow-primary border border-tertiary/5 cursor-pointer">
            <ArrowLeftIcon />
            Back
          </button>
        </Link>
        <h1 className="text-3xl font-bold">Release Managment</h1>
      </div>
      {/* Apps Table */}
      <div className="bg-tertiary/20 p-2 space-y-4 rounded-lg">
        <ReleaseManagmentTable />
      </div>
      <ApplicationVersionForm />
    </div>
  );
};

export default InventoryReleaseManagment;
