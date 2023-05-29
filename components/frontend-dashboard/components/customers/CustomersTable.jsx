import React, { useMemo, useState } from "react";
import MaterialReactTable from "material-react-table";
import CustomerSubscriptionHistoryTable from "./CustomerSubscriptionHistoryTable.jsx";

export const CustomersTable = () => {
  const [ tableDensity, setTableDensity ] = useState("compact")
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
      onDensityChange={(d) => setTableDensity(d)}
      state={{ density: tableDensity }}
      muiTopToolbarProps={{ className: " [&>*:nth-child(3)>*:nth-child(2)]:!bg-lightest-version [&>*:nth-child(3)>*:nth-child(2)]:!px-2 [&>*:nth-child(3)>*:nth-child(2)]:!shadow-sm [&>*:nth-child(3)>*:nth-child(2)]:hover:!shadow-lg !mb-1 [&>*:nth-child(3)>*:nth-child(2)]:!rounded-xl !shadow-none !bg-transparent  " }}
      muiBottomToolbarProps={{ className: " [&>*:nth-child(1)>*:nth-child(2)]:!bg-lightest-version [&>*:nth-child(1)>*:nth-child(2)]:!px-2 [&>*:nth-child(1)>*:nth-child(2)]:!rounded-xl !shadow-none !bg-transparent  " }}
      muiTableProps={{ className: "py-5 !border !mb-2 !border-white !bg-brand-white " }}
      muiTableBodyRowProps={{ className: " group " }}
      muiTableBodyCellProps={{
        className: "!border !text-tertiary group-hover:!bg-lightest-version/60 !bg-brand-white ",
      }}
      muiTableHeadCellProps={{
        className: " !text-tertiary !bg-transparent font-black ",
      }}
      muiTablePaperProps={{
        className:
          " px-2 !shadow-none !bg-transparent overflow-hidden [&>*:nth-child(2)]:!overflow-x-auto [&>*:nth-child(2)]:!bg-transparent [&>*:nth-child(2)]:!outline-white [&>*:nth-child(2)]:!outline [&>*:nth-child(2)]:!overflow-clip [&>*:nth-child(2)]:!rounded-lg",
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
