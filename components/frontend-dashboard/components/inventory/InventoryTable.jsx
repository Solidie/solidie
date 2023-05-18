import React from "react";
import { Link } from "react-router-dom";
import { AlertDialog } from "../common";

const InventoryTable = () => {
  return (
    <div className="flex flex-col w-full gap-4 min-h-max">
      {Array(20)
        .fill(undefined)
        .map((item, idx) => (
          <Row key={idx} idx={idx} />
        ))}
    </div>
  );
};

export default InventoryTable;

const Row = ({ idx }) => {
  return (
    <div className="flex-wrap gap-5 text-base flex items-center justify-between w-full bg-white rounded-lg px-4 py-4 shadow-md transition-all delay-75 hover:shadow-lg">
      <img src={`https://img.logoipsum.com/${220 + idx}.svg`} className="w-32 max-h-10" alt="" />
      <div className="">
        Name: <span className="font-bold">AppName</span>
      </div>
      <div className="flex items-center gap-2">
        Status:
        <div className="bg-primary p-2 rounded-md text-xs font-bold">
          Uppublished
        </div>
      </div>
      <div className=" w-full md:w-max flex justify-between flex-wrap gap-5">
        <AlertDialog {...{ btnColor: "red" }}>
          <button className="h-max w-full sm:w-max text-red-900 bg-red-300 font-bold text-sm px-8 py-2 rounded-full active:animate-bounce shadow-md outline outline-red-900">
            Delete
          </button>
        </AlertDialog>
        <Link to="3434/edit">
          <button className="h-max w-full sm:w-max bg-primary hover:bg-primary/70 focus:text-green-900 focus:outline-green-900 text-tertiary font-bold text-sm px-8 py-2 rounded-full shadow-xl active:animate-bounce shadow-primary outline cursor-pointer">
            Edit App
          </button>
        </Link>
        <Link to="3434/release-management">
          <button className="w-full sm:w-max bg-primary hover:bg-primary/70 focus:text-green-900 focus:outline-green-900 text-tertiary font-bold text-sm px-8 py-2 rounded-full shadow-xl active:animate-bounce shadow-primary outline cursor-pointer">
            Release Management
          </button>
        </Link>
      </div>
    </div>
  );
};
