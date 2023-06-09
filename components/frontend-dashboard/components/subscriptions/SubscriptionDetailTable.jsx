import React, { useMemo, useState } from "react";
import { DataTable } from "../ui/table/data-table.jsx";

export const SubscriptionDetailTable = () => {
  const [data, setData] = useState([
    {
      webSites: "http://localhost/tutor-test",
      licenseKey: "1597A-4123 ..... 8NSCK-943",
      expires: "Never",
      status: "Revoked",
    },
    {
      webSites: "http://localhost/tutor-test",
      licenseKey: "1597A-4123 ..... 8NSCK-943",
      expires: "Never",
      status: "Revoked",
    },
    {
      webSites: "http://localhost/tutor-test",
      licenseKey: "1597A-4123 ..... 8NSCK-943",
      expires: "Never",
      status: "Revoked",
    },
    {
      webSites: "http://localhost/tutor-test",
      licenseKey: "1597A-4123 ..... 8NSCK-943",
      expires: "Never",
      status: "Revoked",
    },
    {
      webSites: "http://localhost/tutor-test",
      licenseKey: "1597A-4123 ..... 8NSCK-943",
      expires: "Never",
      status: "Revoked",
    },
  ]) 

  const columns = useMemo(
    //column definitions...
    () => [
      {
        accessorKey: "webSites",
        header: "WEBSITE (4/∞)",
      },
      {
        accessorKey: "licenseKey",
        header: "LICENSE KEY",
        enableClickToCopy: true
      },
      {
        accessorKey: "expires",
        header: "EXPIRES",
        size: 20,
      },
      {
        accessorKey: "status",
        header: "Status",
        size: 20,
        Cell: ({ cell }) => {
            return <div className="!bg-tertiary text-primary rounded-lg px-2 py-1 shadow-md w-max">{cell.getValue()}</div>
        }
      },
    ],
    []
    //end
  );

  return (
    <DataTable
      data={data}
      columns={columns}
      enableToolbar={false}
    />
  );
};

export default SubscriptionDetailTable;
