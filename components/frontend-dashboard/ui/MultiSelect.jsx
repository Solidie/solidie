import React, { useState } from "react";
import { ComboBox, Input } from "./";
import { Cross2Icon } from "@radix-ui/react-icons";

const MultiSelect = ({}) => {
  const [selectedItems, setSelectedItems] = useState([]);
  const [query, setQuery] = useState("");
  const [listItems, setListItems] = useState([
    { id: 1, name: "Monthly" },
    { id: 2, name: "Quaterly" },
    { id: 3, name: "Yearly" },
    { id: 4, name: "5 Years" },
    { id: 5, name: "10 Years" },
    { id: 6, name: "LifeTime" },
  ]);
  const [selected, setSelected] = useState({});
  const [error, setError] = useState("");

  return (
    <div className="flex flex-col gap-5 bg-primary text-tertiary p-3 Input hover:!border-tertiary/60 hover:!border-dashed !rounded-lg max-w-full">
      {selectedItems.length ? (
        <div className="flex gap-5 flex-wrap w-full">
          {selectedItems?.map((props, idx) => (
            <ChipItem key={idx} name={props?.name} />
          ))}
        </div>
      ) : (
        ""
      )}
      <div className="">
        <div className="font-bold text-tertiary flex gap-4">
          Select from default available plans!
        </div>
        {error !== "" ? <div className="text-red-900">*{error}</div> : ""}
      </div>
      <div className="w-max flex flex-wrap space-y-4 sm:space-y-0 sm:space-x-4 items-center">
        <ComboBox
          selected={selected}
          setSelected={setSelected}
          listItems={listItems}
          setQuery={setQuery}
          query={query}
        />
        <div
          onClick={() => {
            setQuery("");
            setError("");
            console.log(selected);
            if (selectedItems.includes(selected)) {
            } else if (JSON.stringify(selected) === JSON.stringify({})) {
              console.log("TTRRUUEE");
              setError("Please select one plan!");
            } else {
              setSelectedItems([...selectedItems, selected]);
              setListItems(
                listItems.filter((item) => ![item].includes(selected))
              );
            }
          }}
          className="border-2 border-tertiary/60 hover:border-tertiary border-dashed hover:shadow-lg p-2 px-6 rounded-full cursor-default select-none"
        >
          Add
        </div>
      </div>
    </div>
  );
};

export default MultiSelect;

const ChipItem = ({ name }) => {
  const [hideChip, setHideChip] = useState(false);
  return (
    <div
      className={
        (hideChip ? " hidden " : " flex ") +
        ` gap-3 items-center bg-lightest-version p-2 px-4 rounded-2xl transition-all delay-500 cursor-pointer `
      }
    >
      Cost:
      <Input
        className=" !border-2 underline !border-tertiary text-center !rounded-md p-1 max-w-[4rem] "
        defaultValue="5"
        type="number"
      />
      , {name}
      <Cross2Icon onClick={() => setHideChip(true)} />
    </div>
  );
};
