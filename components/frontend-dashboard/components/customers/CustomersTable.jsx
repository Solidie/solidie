import React, { useMemo } from "react";
import MaterialReactTable from "material-react-table";
import CustomerSubscriptionHistoryTable from "./CustomerSubscriptionHistoryTable.jsx";

export const CustomersTable = () => {
  const columns = useMemo(
    //column definitions...
    () => [
      {
        accessorKey: "name",
        header: "NAME",
      },
      {
        accessorKey: "emailAddress",
        header: "Email Address",
      },
      {
        accessorKey: "totalSpending",
        header: "TOTAL SPENDING",
      },
    ],
    []
  );

  return (
    <MaterialReactTable
      columns={columns}
      data={data}
      state={{ density: "compact" }}
      muiTopToolbarProps={{ className: "!bg-brand-white" }}
      muiBottomToolbarProps={{ className: "!bg-brand-white" }}
      muiTableBodyCellProps={{
        className: "!text-tertiary !bg-brand-white ",
      }}
      muiTableHeadCellProps={{
        className: "!text-tertiary !bg-brand-white font-black ",
      }}
      muiTablePaperProps={{
        className:
          " z-10 shadow-lg shadow-tertiary !rounded-2xl !bg-brand-white overflow-hidden px-6 pt-4",
      }}
      enableRowNumbers
      muiTableDetailPanelProps={{
        className: " bg-primary shadow-inner shadow-tertiary/60 ",
      }}
      renderDetailPanel={({ row }) => <CustomerSubscriptionHistoryTable />}
    />
  );
};

export default CustomersTable;

export const data = [
  {
    name: "Alex",
    totalSpending: 100,
    emailAddress: "alex@beta.alpha",
  },
  {
    name: "Alex",
    totalSpending: 100,
    emailAddress: "alex@beta.alpha",
  },
  {
    name: "Alex",
    totalSpending: 100,
    emailAddress: "alex@beta.alpha",
  },
  {
    name: "Alex",
    totalSpending: 100,
    emailAddress: "alex@beta.alpha",
  },
  {
    name: "Alex",
    totalSpending: 100,
    emailAddress: "alex@beta.alpha",
  },
  {
    name: "Alex",
    totalSpending: 100,
    emailAddress: "alex@beta.alpha",
  },
  {
    name: "Alex",
    totalSpending: 100,
    emailAddress: "alex@beta.alpha",
  },
  {
    name: "Alex",
    totalSpending: 100,
    emailAddress: "alex@beta.alpha",
  },
  {
    name: "Alex",
    totalSpending: 100,
    emailAddress: "alex@beta.alpha",
  },
  {
    name: "Alex",
    totalSpending: 100,
    emailAddress: "alex@beta.alpha",
  },
  {
    name: "Alex",
    totalSpending: 100,
    emailAddress: "alex@beta.alpha",
  },
  {
    name: "Alex",
    totalSpending: 100,
    emailAddress: "alex@beta.alpha",
  },
  {
    name: "Alex",
    totalSpending: 100,
    emailAddress: "alex@beta.alpha",
  },
  {
    name: "Alex",
    totalSpending: 100,
    emailAddress: "alex@beta.alpha",
  },
  {
    name: "Alex",
    totalSpending: 100,
    emailAddress: "alex@beta.alpha",
  },
  {
    name: "Alex",
    totalSpending: 100,
    emailAddress: "alex@beta.alpha",
  },
  {
    name: "Alex",
    totalSpending: 100,
    emailAddress: "alex@beta.alpha",
  },
];
