import React, { useEffect, useLayoutEffect, useRef, useState } from "react";
import { cn } from "../../lib/utils";

const Table = React.forwardRef(({ className, ...props }, ref) => (
  <div className="w-full overflow-auto border">
    <table
      ref={ref}
      className={cn("w-full caption-bottom text-sm", className)}
      {...props}
    />
  </div>
));

const TableHeader = React.forwardRef(({ className, ...props }, ref) => (
  <thead ref={ref} className={cn("[&_tr]:border-b", className)} {...props} />
));

const TableBody = React.forwardRef(({ className, ...props }, ref) => (
  <tbody
    ref={ref}
    className={cn("[&_tr:last-child]:border-0", className)}
    {...props}
  />
));

const TableFooter = React.forwardRef(({ className, ...props }, ref) => (
  <tfoot
    ref={ref}
    className={cn("bg-primary font-medium text-primary-foreground", className)}
    {...props}
  />
));

const TableRow = ({
  table,
  DetailPanel,
  row,
  header = false,
  className,
  ...props
}) => {
  const [width, setWidth] = useState(0)
  const [expandable, setExpandable] = useState(false);
  const ref = useRef();
  if (header || !DetailPanel) {
    return (
      <tr
        ref={ref}
        className={cn(
          "border-b  transition-colors border-tertiary hover:bg-muted/50 data-[state=selected]:bg-muted",
          className
        )}
        {...props}
      />
    );
  }
  useEffect(() => {
    if (width !==ref.current?.clientWidth ) {
      setWidth(ref.current?.clientWidth)
    }
  // console.log(ref.current?.offsetWidth, ref.current)

  }, [ref.current?.clientWidth, ref.current?.offsetWidth])
  // console.log(ref.current?.offsetWidth)
   
  return (
    <>
      <tr
        ref={ref}
        onClick={() => setExpandable(!expandable)}
        className={cn(
          "border-b transition-colors hover:bg-tertiary/20 data-[state=selected]:bg-muted",
          (row.index + 1) % table.getState().pagination.pageSize === 0 && row.index !== 0 ? " border-transparent " : " border-tertiary",
          className
        )}
        {...props}
      />
      <tr className={cn(expandable ? " block " : "hidden", "w-full")}>
        <td className="!max-w-0">
          <div
            className="p-4 [&>div]:bg-transparent shadow-inner shadow-tertiary/20"
            style={{ width: width ?? "auto" }}
          >
            <DetailPanel row={row} />
          </div>
        </td>
      </tr>
    </>
  );
};

const TableHead = React.forwardRef(({ className, ...props }, ref) => (
  <th
    ref={ref}
    className={cn(
      "h-12 px-4 text-left align-middle font-medium text-muted-foreground [&:has([role=checkbox])]:pr-0",
      className
    )}
    {...props}
  />
));

const TableCell = React.forwardRef(({ className, ...props }, ref) => (
  <td
    ref={ref}
    className={cn("p-4 align-middle [&:has([role=checkbox])]:pr-0", className)}
    {...props}
  />
));

const TableCaption = React.forwardRef(({ className, ...props }, ref) => (
  <caption
    ref={ref}
    className={cn("mt-4 text-sm text-muted-foreground", className)}
    {...props}
  />
));

export {
  Table,
  TableHeader,
  TableBody,
  TableFooter,
  TableHead,
  TableRow,
  TableCell,
  TableCaption,
};
