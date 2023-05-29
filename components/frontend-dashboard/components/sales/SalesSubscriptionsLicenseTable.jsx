import React, { useMemo } from "react";
import MaterialReactTable from "material-react-table";

export const SalesSubscriptionsLicenseTable = () => {
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
            return <div className="!bg-tertiary text-lightest-version rounded-lg px-2 py-1 shadow-md w-max">{cell.getValue()}</div>
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
      muiTopToolbarProps={{ className: "!bg-lightest-version" }}
      muiBottomToolbarProps={{ className: "!bg-lightest-version" }}
      muiTableBodyCellProps={{
        className: "!text-tertiary !bg-lightest-version ",
      }}
      muiTableHeadCellProps={{
        className: "!text-tertiary !bg-lightest-version font-black ",
      }}
      muiTablePaperProps={{
        className:
          " z-10 !shadow-none !rounded-2xl !bg-lightest-version overflow-hidden px-6 pt-4",
      }}
      enableRowNumbers
    />
  );
};

export default SalesSubscriptionsLicenseTable;

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
