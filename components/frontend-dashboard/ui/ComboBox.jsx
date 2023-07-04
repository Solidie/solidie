import React, { Fragment, useEffect, useState } from "react";
import { Combobox, Transition } from "@headlessui/react";
import { CheckIcon, ChevronUpDownIcon } from "@heroicons/react/20/solid";

export default function ComboBox({ selected, setSelected, listItems, setQuery, query }) {

  const filteredListItems =
    query === ""
      ? listItems
      : listItems.filter((item) =>
          item.name
            .toLowerCase()
            .replace(/\s+/g, "")
            .includes(query.toLowerCase().replace(/\s+/g, ""))
        );

  return (
    <Combobox value={selected} onChange={setSelected}>
      <div className=" relative">
        <div className="relative w-full cursor-default rounded-lg text-left sm:text-sm !text-primary ">
          <Combobox.Input
            className="w-full !border-transparent text-sm font-bold leading-5 Input !pr-10 focus:!shadow-tertiary/60 focus:!shadow-lg focus:!border-2 border-solid focus:!border-lightest-version !bg-tertiary !text-primary"
            displayValue={(item) => item.name}
            placeholder="Search here!..."
            onChange={(event) => setQuery(event.target.value)}
          />
          <Combobox.Button className="absolute inset-y-0 right-0 flex items-center pr-2">
            <ChevronUpDownIcon className="h-5 w-5" aria-hidden="true" />
          </Combobox.Button>
        </div>
        <Transition
          as={Fragment}
          leave="transition ease-in duration-100"
          leaveFrom="opacity-100"
          leaveTo="opacity-0"
          afterLeave={() => setQuery("")}
        >
          <Combobox.Options className="absolute mt-1 max-h-60 w-full overflow-auto rounded-md bg-primary py-1 text-base shadow-lg shadow-tertiary/30 border-2 border-tertiary sm:text-sm">
            {filteredListItems.length === 0 && query !== "" ? (
              <div className="relative cursor-default select-none py-2 px-4 text-tertiary">
                Nothing found.
              </div>
            ) : (
              filteredListItems.map((item) => (
                <Combobox.Option
                  key={item.id}
                  className={({ active }) =>
                    `relative cursor-default select-none py-2 pl-10 pr-4 ${
                      active
                        ? "bg-lightest-version text-tertiary"
                        : "text-tertiary"
                    }`
                  }
                  value={item}
                >
                  {({ selected, active }) => (
                    <>
                      <span
                        className={`block truncate ${
                          selected ? "font-bold" : "font-medium"
                        }`}
                      >
                        {item.name}
                      </span>
                      {selected ? (
                        <span
                          className={`absolute inset-y-0 left-0 flex items-center pl-3 ${
                            active ? "text-tertiary" : "text-tertiary"
                          }`}
                        >
                          <CheckIcon className="h-5 w-5" aria-hidden="true" />
                        </span>
                      ) : null}
                    </>
                  )}
                </Combobox.Option>
              ))
            )}
          </Combobox.Options>
        </Transition>
      </div>
    </Combobox>
  );
}
