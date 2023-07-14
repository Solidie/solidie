import React, { useEffect } from "react";
import {
  ChevronLeft,
  ChevronRight,
  ChevronsLeft,
  ChevronsRight,
} from "lucide-react";

import { Button, Select } from "../index";
// import {
//   Select,
//   SelectContent,
//   SelectItem,
//   SelectTrigger,
//   SelectValue,
// } from "../shadcnSelect.jsx";

export function DataTablePagination({ table }) {
  useEffect(() => {
    table.setPageSize(5);
  }, []);

  return (
    <div className={"flex flex-col flex-wrap sm:flex-row items-start lg:items-center justify-between px-2 gap-6 md:gap-0".classNames()}>
      <div className={"flex-1 text-sm text-muted-foreground".classNames()}>
        {table.getFilteredSelectedRowModel().rows.length} of{" "}
        {table.getFilteredRowModel().rows.length} row(s) selected.
      </div>
      <div className={"flex flex-col flex-wrap sm:flex-row items-start lg:items-center gap-6 lg:space-x-8".classNames()}>
        <div className={"flex justify-start items-center space-x-2".classNames()}>
          <p className={"text-sm font-medium".classNames()}>Rows per page</p>
          <Select
            ariaLabel={"Pagination"}
            disableItemsList={[]}
            defaultValue={String(table.getState().pagination.pageSize)}
            itemsList={["5", "10", "20", "30", "40", "50", "100"]}
            value={String(table.getState().pagination.pageSize)}
            className={
              "py-1 hover:!border-tertiary/20 hover:!shadow-transparent"
            }
            onChange={(value) => {
              table.setPageSize(Number(value));
            }}
          />
        </div>
        <div className={"flex flex-wrap".classNames()}>
          <div className={"flex w-[100px] items-center justify-start lg:justify-center text-sm font-medium".classNames()}>
            Page {table.getState().pagination.pageIndex + 1} of{" "}
            {table.getPageCount()}
          </div>
          <div className={"flex justify-start items-center space-x-2".classNames()}>
            <Button
              variant="outline"
              className="hidden h-8 w-8 p-0 lg:flex"
              onClick={() => table.setPageIndex(0)}
              disabled={!table.getCanPreviousPage()}
            >
              <span className={"sr-only".classNames()}>Go to first page</span>
              <ChevronsLeft className={"h-4 w-4".classNames()} />
            </Button>
            <Button
              variant="outline"
              className="h-8 w-8 p-0"
              onClick={() => table.previousPage()}
              disabled={!table.getCanPreviousPage()}
            >
              <span className={"sr-only".classNames()}>Go to previous page</span>
              <ChevronLeft className={"h-4 w-4".classNames()} />
            </Button>
            <Button
              variant="outline"
              className="h-8 w-8 p-0"
              onClick={() => table.nextPage()}
              disabled={!table.getCanNextPage()}
            >
              <span className={"sr-only".classNames()}>Go to next page</span>
              <ChevronRight className={"h-4 w-4".classNames()} />
            </Button>
            <Button
              variant="outline"
              className="hidden h-8 w-8 p-0 lg:flex"
              onClick={() => table.setPageIndex(table.getPageCount() - 1)}
              disabled={!table.getCanNextPage()}
            >
              <span className={"sr-only".classNames()}>Go to last page</span>
              <ChevronsRight className={"h-4 w-4".classNames()} />
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}
