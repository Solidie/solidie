import React from "react";
import {
  CheckIcon,
  ChevronDownIcon,
  ChevronUpIcon,
} from "@radix-ui/react-icons";
import * as SelectPrimitive from "@radix-ui/react-select";
import { clsx } from "clsx";

const Select = React.forwardRef(
  (
    {
      placeholder,
      disableItemsList,
      defaultValue,
      ariaLabel,
      itemsList,
      onChange,
      className,
      ...props
    },
    forwardRef
  ) => {
    return (
      <SelectPrimitive.Root
        {...{ defaultValue }}
        {
          ...props
        }
        onValueChange={onChange}
      >
        <SelectPrimitive.Trigger asChild aria-label={ariaLabel}>
          <div className={clsx("Input flex justify-between items-center", className)}>
            {props?.value === "" ? (
              <SelectPrimitive.Value placeholder={placeholder}>
                {placeholder}
              </SelectPrimitive.Value>
            ) : (
              <SelectPrimitive.Value aria-valuetext={props?.value}>
                {props?.value}
              </SelectPrimitive.Value>
            )}
            <SelectPrimitive.Icon className="ml-2">
              <ChevronDownIcon />
            </SelectPrimitive.Icon>
          </div>
        </SelectPrimitive.Trigger>
        <SelectPrimitive.Content
          ref={forwardRef}
          className="shadow-lg shadow-tertiary/60 rounded-lg border-2 border-tertiary"
        >
          <SelectPrimitive.ScrollUpButton className="flex items-center justify-center text-tertiary font-bold ">
            <ChevronUpIcon />
          </SelectPrimitive.ScrollUpButton>
          <SelectPrimitive.Viewport className="bg-primary p-2 rounded-lg shadow-lg">
            <SelectPrimitive.Group>
              {itemsList.map((f, i) => (
                <SelectPrimitive.Item
                  disabled={disableItemsList.includes(f)}
                  key={`${f}-${i}`}
                  value={f.toLowerCase()}
                  className={clsx(
                    "relative flex items-center px-8 py-2 rounded-md text-sm text-tertiary font-bold  focus:bg-tertiary/20",
                    "radix-disabled:opacity-50",
                    "focus:outline-none select-none"
                  )}
                >
                  <SelectPrimitive.ItemText>{f}</SelectPrimitive.ItemText>
                  <SelectPrimitive.ItemIndicator className="absolute left-2 inline-flex items-center">
                    <CheckIcon />
                  </SelectPrimitive.ItemIndicator>
                </SelectPrimitive.Item>
              ))}
            </SelectPrimitive.Group>
          </SelectPrimitive.Viewport>
          <SelectPrimitive.ScrollDownButton className="flex items-center justify-center text-tertiary/70 ">
            <ChevronDownIcon />
          </SelectPrimitive.ScrollDownButton>
        </SelectPrimitive.Content>
      </SelectPrimitive.Root>
    );
  }
);

export default Select;
