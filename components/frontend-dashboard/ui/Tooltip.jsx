import React from "react";
import * as TooltipPrimitive from "@radix-ui/react-tooltip";
import { clsx } from "clsx";

const Tooltip = ({ children, text }) => {
  return (
    <TooltipPrimitive.Provider>
      <TooltipPrimitive.Root>
        <TooltipPrimitive.Trigger asChild>
          { children }
        </TooltipPrimitive.Trigger>
        <TooltipPrimitive.Content
          sideOffset={4}
          className={clsx(
            "radix-side-top:animate-slide-down-fade",
            "radix-side-right:animate-slide-left-fade",
            "radix-side-bottom:animate-slide-up-fade",
            "radix-side-left:animate-slide-right-fade",
            "inline-flex items-center rounded-md px-4 py-2.5",
            "bg-white dark:bg-gray-800",
            "shadow-lg shadow-tertiary/60 "
          )}
        >
          <TooltipPrimitive.Arrow className={"fill-current text-white dark:text-gray-800".classNames()} />
          <span className={" shadow-lg  block font-black text-xs leading-none text-gray-700 dark:text-gray-100".classNames()}>
            {text}
          </span>
        </TooltipPrimitive.Content>
      </TooltipPrimitive.Root>
    </TooltipPrimitive.Provider>
  );
};

export default Tooltip;