import React from "react";
import ReleaseManagmentTable from '../../components/inventory/ReleaseManagementTable.jsx'

const InventoryReleaseManagment = (params) => {
  console.log(params);
  return (
    <div className="text-tertiary flex flex-col gap-4 w-full h-full">
      {/* Header */}
      <div className="flex justify-between items-center w-full">
        <h1 className="text-3xl font-bold">Release Managment</h1>
      </div>
      {/* Apps Table */}
      <ReleaseManagmentTable />
    </div>
  );
};

export default InventoryReleaseManagment;
