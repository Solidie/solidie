import React, { useMemo, useState } from "react";
import MaterialReactTable from "material-react-table";
import UserSubscriptionHistoryTable from "./UserSubscriptionHistoryTable.jsx";

export const SalesDetailTable = () => {
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
        accessorKey: "totalPurchaseAmount",
        header: "TOTAL PURCHASE AMOUNT",
        size: 240,
      },
      {
        accessorKey: "purchasedTime",
        header: "PURCHASED TIME",
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
      muiTableProps={{ className: "py-5 !border !mb-2 !border-lightest-version !bg-lightest-version " }}
      muiTableBodyRowProps={{ className: " group " }}
      muiTableBodyCellProps={{
        className: "!border !text-tertiary group-hover:!bg-lightest-version/60 !bg-lightest-version ",
      }}
      muiTableHeadCellProps={{
        className: " !text-tertiary !bg-transparent font-black ",
      }}
      muiTablePaperProps={{
        className:
          " px-2 !shadow-none !bg-transparent overflow-hidden [&>*:nth-child(2)]:!overflow-x-auto [&>*:nth-child(2)]:!bg-transparent [&>*:nth-child(2)]:!outline-lightest-version [&>*:nth-child(2)]:!outline [&>*:nth-child(2)]:!overflow-clip [&>*:nth-child(2)]:!rounded-lg",
      }}
      enableRowNumbers
      muiTableDetailPanelProps={{
        className: " bg-primary shadow-inner shadow-tertiary/60 ",
      }}
      renderDetailPanel={({ row }) => <UserSubscriptionHistoryTable />}
    />
  );
};

export default SalesDetailTable;

export const data = [
  {
    name: "Alex",
    totalPurchaseAmount: 100,
    emailAddress: "alex@beta.alpha",
    purchasedTime: "12:20pm 20/02/2023",
  },
  {
    name: "Alex",
    totalPurchaseAmount: 100,
    emailAddress: "alex@beta.alpha",
    purchasedTime: "12:20pm 20/02/2023",
  },
  {
    name: "Alex",
    totalPurchaseAmount: 100,
    emailAddress: "alex@beta.alpha",
    purchasedTime: "12:20pm 20/02/2023",
  },
  {
    name: "Alex",
    totalPurchaseAmount: 100,
    emailAddress: "alex@beta.alpha",
    purchasedTime: "12:20pm 20/02/2023",
  },
  {
    name: "Alex",
    totalPurchaseAmount: 100,
    emailAddress: "alex@beta.alpha",
    purchasedTime: "12:20pm 20/02/2023",
  },
  {
    name: "Alex",
    totalPurchaseAmount: 100,
    emailAddress: "alex@beta.alpha",
    purchasedTime: "12:20pm 20/02/2023",
  },
  {
    name: "Alex",
    totalPurchaseAmount: 100,
    emailAddress: "alex@beta.alpha",
    purchasedTime: "12:20pm 20/02/2023",
  },
  {
    name: "Alex",
    totalPurchaseAmount: 100,
    emailAddress: "alex@beta.alpha",
    purchasedTime: "12:20pm 20/02/2023",
  },
  {
    name: "Alex",
    totalPurchaseAmount: 100,
    emailAddress: "alex@beta.alpha",
    purchasedTime: "12:20pm 20/02/2023",
  },
  {
    name: "Alex",
    totalPurchaseAmount: 100,
    emailAddress: "alex@beta.alpha",
    purchasedTime: "12:20pm 20/02/2023",
  },
  {
    name: "Alex",
    totalPurchaseAmount: 100,
    emailAddress: "alex@beta.alpha",
    purchasedTime: "12:20pm 20/02/2023",
  },
  {
    name: "Alex",
    totalPurchaseAmount: 100,
    emailAddress: "alex@beta.alpha",
    purchasedTime: "12:20pm 20/02/2023",
  },
  {
    name: "Alex",
    totalPurchaseAmount: 100,
    emailAddress: "alex@beta.alpha",
    purchasedTime: "12:20pm 20/02/2023",
  },
  {
    name: "Alex",
    totalPurchaseAmount: 100,
    emailAddress: "alex@beta.alpha",
    purchasedTime: "12:20pm 20/02/2023",
  },
  {
    name: "Alex",
    totalPurchaseAmount: 100,
    emailAddress: "alex@beta.alpha",
    purchasedTime: "12:20pm 20/02/2023",
  },
  {
    name: "Alex",
    totalPurchaseAmount: 100,
    emailAddress: "alex@beta.alpha",
    purchasedTime: "12:20pm 20/02/2023",
  },
  {
    name: "Alex",
    totalPurchaseAmount: 100,
    emailAddress: "alex@beta.alpha",
    purchasedTime: "12:20pm 20/02/2023",
  },
  {
    name: "Alex",
    totalPurchaseAmount: 100,
    emailAddress: "alex@beta.alpha",
    purchasedTime: "12:20pm 20/02/2023",
  },
];
