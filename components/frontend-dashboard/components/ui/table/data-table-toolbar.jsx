import React, { useEffect, useState } from "react";
import { X } from "lucide-react";
import { Button, Select } from "../index";
import { DataTableViewOptions } from "./data-table-view-options.jsx";

export function DataTableToolbar({ table, columns }) {
  const [selectedColumn, setSelectedColumn] = useState(
    columns[0].accessorKey ?? ""
  );
  const columnNames = columns
    .filter(({ accessorKey }) => accessorKey)
    .flatMap(({ accessorKey }) => accessorKey);
  console.log(columnNames, table.getAllColumns());
  const isFiltered =
    table.getPreFilteredRowModel().rows.length >
    table.getFilteredRowModel().rows.length;

  useEffect(() => {
    setSelectedColumn(columnNames[0]);
  }, []);

  return (
    <div className="flex items-center justify-between">
      <div className="flex flex-1 items-center space-x-2">
        <div className="border flex flex-col gap-1 sm:flex-row bg-primary rounded-full p-1">
          <input
            type="text"
            placeholder="Filter tasks..."
            value={table.getColumn(selectedColumn)?.getFilterValue() ?? ""}
            onChange={(event) =>
              table
                .getColumn(selectedColumn)
                ?.setFilterValue(event.target.value)
            }
            className="h-8 w-[150px] lg:w-[250px] focus:border-tertiary bg-transparent text-tertiary rounded-full focus:ring-transparent"
          />
          <Select
            ariaLabel={"column-to-filter"}
            defaultValue={columnNames[0]}
            disableItemsList={[]}
            itemsList={columnNames ?? []}
            value={selectedColumn}
            className={"py-1 hover:!border-tertiary/20 hover:!shadow-transparent"}
            onChange={(value) => {
              setSelectedColumn(value);
            }}
          />
        </div>
        {isFiltered && (
          <Button
            variant="ghost"
            onClick={() => table.resetColumnFilters()}
            className="h-8 px-2 lg:px-3"
          >
            Reset
            <X className="ml-2 h-4 w-4" />
          </Button>
        )}
      </div>
      <DataTableViewOptions table={table} />
    </div>
  );
}
