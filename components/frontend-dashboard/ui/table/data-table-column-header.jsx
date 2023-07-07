import React from 'react'
import { ChevronsUpDown, EyeOff, SortAsc, SortDesc } from "lucide-react"

import { cn } from "../../../lib/utils"
import { Button } from "../index"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "../dropdown-menu.jsx"


export function DataTableColumnHeader({
  column,
  title,
  className,
}) {
  if (!column.getCanSort()) {
    return <div className={cn(className)}>{title}</div>
  }

  return (
    <div className={cn("flex items-center space-x-2", className)}>
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button
            variant="ghost"
            size="sm"
            className={"-ml-3 h-8 data-[state=open]:bg-accent".classNames()}
          >
            <span>{title}</span>
            {column.getIsSorted() === "desc" ? (
              <SortDesc className={"ml-2 h-4 w-4".classNames()} />
            ) : column.getIsSorted() === "asc" ? (
              <SortAsc className={"ml-2 h-4 w-4".classNames()} />
            ) : (
              <ChevronsUpDown className={"ml-2 h-4 w-4".classNames()} />
            )}
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent align="start">
          <DropdownMenuItem onClick={() => column.toggleSorting(false)}>
            <SortAsc className={"mr-2 h-3.5 w-3.5 text-muted-foreground/70".classNames()} />
            Asc
          </DropdownMenuItem>
          <DropdownMenuItem onClick={() => column.toggleSorting(true)}>
            <SortDesc className={"mr-2 h-3.5 w-3.5 text-muted-foreground/70".classNames()} />
            Desc
          </DropdownMenuItem>
          <DropdownMenuSeparator />
          <DropdownMenuItem onClick={() => column.toggleVisibility(false)}>
            <EyeOff className={"mr-2 h-3.5 w-3.5 text-muted-foreground/70".classNames()} />
            Hide
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    </div>
  )
}
