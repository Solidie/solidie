import React, { useMemo, useState } from "react";
import CustomerSubscriptionHistoryTable from "./CustomerSubscriptionHistoryTable.jsx";
import { DataTable } from "../../../ui/table/data-table.jsx";

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
    <DataTable
      data={data}
      columns={columns}
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
