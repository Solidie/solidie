import React, { useMemo } from "react";
import MaterialReactTable from "material-react-table";

export const SubscriptionDetailTable = () => {
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
    <MaterialReactTable
      columns={columns}
      data={data}
      state={{ density: "compact" }}
      enableTopToolbar={false}
      muiTopToolbarProps={{ className: "!bg-primary" }}
      muiBottomToolbarProps={{ className: "!bg-primary" }}
      muiTableBodyCellProps={{
        className: "!text-tertiary !bg-primary ",
      }}
      muiTableHeadCellProps={{
        className: "!text-tertiary !bg-primary font-black ",
      }}
      muiTablePaperProps={{
        className:
          " z-10 !shadow-none !rounded-2xl !bg-primary overflow-hidden px-6 pt-4",
      }}
      enableRowNumbers
    />
  );
};

export default SubscriptionDetailTable;

export const data = [
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
];
