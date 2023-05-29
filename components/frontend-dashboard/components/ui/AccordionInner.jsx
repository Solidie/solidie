import * as AccordionPrimitive from "@radix-ui/react-accordion";
import { ChevronDownIcon } from "@radix-ui/react-icons";
import { clsx } from "clsx";
import React from "react";

const Accordion = ({ header, content, idx }) => {
  return (
    <AccordionPrimitive.Item
      value={`item-${idx + 1}`}
      className="rounded-lg focus-within:ring focus-within:ring-tertiary focus-within:ring-opacity-75 focus:outline-none w-full hover:shadow-lg shadow-md"
    >
      <AccordionPrimitive.Header className="w-full">
        <AccordionPrimitive.Trigger
          className={clsx(
            "group",
            "radix-state-open:rounded-t-lg radix-state-closed:rounded-lg",
            "focus:outline-none",
            "inline-flex w-full items-center bg-white px-4 py-2 text-left dark:bg-gray-800"
          )}
        >
          {header}
          <ChevronDownIcon
            className={clsx(
              "ml-2 h-5 w-5 shrink-0 text-gray-700 ease-in-out dark:text-gray-400",
              "group-radix-state-open:rotate-180 group-radix-state-open:duration-300"
            )}
          />
        </AccordionPrimitive.Trigger>
      </AccordionPrimitive.Header>
      <AccordionPrimitive.Content className="pt-1 w-full rounded-b-lg bg-white px-4 pb-3 dark:bg-gray-800">
        {content}
      </AccordionPrimitive.Content>
    </AccordionPrimitive.Item>
  );
};

export default Accordion;
