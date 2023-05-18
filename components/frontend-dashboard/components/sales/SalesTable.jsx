import React, { useMemo } from "react";
import MaterialReactTable from "material-react-table";
import UserSubscriptionHistoryTable from "./UserSubscriptionHistoryTable.jsx";

export const SalesDetailTable = () => {
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
      muiTableDetailPanelProps={{ className: " bg-primary shadow-inner shadow-tertiary/60 " }}
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
