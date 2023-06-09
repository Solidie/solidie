import { Transition } from "@headlessui/react";
import * as AlertDialogPrimitive from "@radix-ui/react-alert-dialog";
import { clsx } from "clsx";
import React, { Fragment, useState } from "react";

const AlertDialog = ({ children, btnColor }) => {
  let [isOpen, setIsOpen] = useState(false);
  const styles = classByColor[btnColor];

  return (
    <AlertDialogPrimitive.Root open={isOpen} onOpenChange={setIsOpen}>
      <AlertDialogPrimitive.Trigger asChild>
        {children}
      </AlertDialogPrimitive.Trigger>
      <AlertDialogPrimitive.Portal forceMount>
        <Transition.Root show={isOpen}>
          <Transition.Child
            as={Fragment}
            enter="ease-out duration-300"
            enterFrom="opacity-0"
            enterTo="opacity-100"
            leave="ease-in duration-200"
            leaveFrom="opacity-100"
            leaveTo="opacity-0"
          >
            <AlertDialogPrimitive.Overlay
              forceMount
              className="fixed inset-0 z-20 bg-black/50"
            />
          </Transition.Child>
          <Transition.Child
            as={Fragment}
            enter="ease-out duration-300"
            enterFrom="opacity-0 scale-95"
            enterTo="opacity-100 scale-100"
            leave="ease-in duration-200"
            leaveFrom="opacity-100 scale-100"
            leaveTo="opacity-0 scale-95"
          >
            <AlertDialogPrimitive.Content
              forceMount
              className={clsx(
                "fixed z-50",
                "w-[95vw] max-w-md rounded-lg p-4 md:w-full",
                "top-[50%] left-[50%] -translate-x-[50%] -translate-y-[50%]",
                "bg-brand-white dark:bg-gray-800",
                `focus:outline-none focus-visible:ring ${styles["focus-visible:ring-color-500"]} focus-visible:ring-opacity-75`
              )}
            >
              <AlertDialogPrimitive.Title className=" font-medium text-gray-900 dark:text-gray-100">
                Are you absolutely sure?
              </AlertDialogPrimitive.Title>
              <AlertDialogPrimitive.Description className="mt-2 text-sm font-normal text-gray-700 dark:text-gray-400">
                This action cannot be undone. This will permanently delete your
                account and remove your data from our servers.
              </AlertDialogPrimitive.Description>
              <div className="mt-4 flex justify-end space-x-2">
                <AlertDialogPrimitive.Cancel
                  className={clsx(
                    "inline-flex select-none justify-center rounded-md px-4 py-2 text-sm font-medium",
                    "bg-white text-gray-900 hover:bg-gray-50 dark:bg-gray-700 dark:text-gray-100 hover:dark:bg-gray-600",
                    "border border-gray-300 dark:border-transparent",
                    `focus:outline-none focus-visible:ring ${styles["focus-visible:ring-color-500"]} focus-visible:ring-opacity-75`
                  )}
                >
                  Cancel
                </AlertDialogPrimitive.Cancel>
                <AlertDialogPrimitive.Action
                  className={clsx(
                    "inline-flex select-none justify-center rounded-md px-4 py-2 text-sm font-medium",
                    `${styles["bg-color-400"]} ${styles["text-color-900"]} ${styles["hover:bg-color-500"]} ${styles["dark:bg-color-700"]} dark:text-gray-100 ${styles["dark:hover:bg-color-600"]}`,
                    "border border-transparent",
                    `focus:outline-none focus-visible:ring ${styles["focus-visible:ring-color-500"]} focus-visible:ring-opacity-75`
                  )}
                >
                  Confirm
                </AlertDialogPrimitive.Action>
              </div>
            </AlertDialogPrimitive.Content>
          </Transition.Child>
        </Transition.Root>
      </AlertDialogPrimitive.Portal>
    </AlertDialogPrimitive.Root>
  );
};

export default AlertDialog;

const classByColor = {
  red: {
    "focus-visible:ring-color-500": `focus-visible:ring-red-500`,
    "bg-color-600": `bg-red-600`,
    "bg-color-400": `bg-red-400`,
    "text-color-900": `text-red-900`,
    "hover:bg-color-500": `hover:bg-red-500`,
    "dark:bg-color-700": `dark:bg-red-700`,
    "focus-visible:ring-color-500": `focus-visible:ring-red-500`,
    "dark:hover:bg-color-600": `dark:hover:bg-red-600`,
  },
  green: {
    "focus-visible:ring-color-500": `focus-visible:ring-green-500`,
    "bg-color-600": `bg-green-600`,
    "bg-color-400": `bg-green-400`,
    "text-color-900": `text-green-900`,
    "hover:bg-color-500": `hover:bg-green-500`,
    "dark:bg-color-700": `dark:bg-green-700`,
    "focus-visible:ring-color-500": `focus-visible:ring-green-500`,
    "dark:hover:bg-color-600": `dark:hover:bg-green-600`,
  },
};
