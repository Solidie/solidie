import React, { useMemo, useState } from "react";
import UserSubscriptionHistoryTable from "./UserSubscriptionHistoryTable.jsx";

import { DataTable } from "../ui/table/data-table.jsx";

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
    <DataTable
      data={data}
      columns={columns}
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
