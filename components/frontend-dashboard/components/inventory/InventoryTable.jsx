import React from "react";
import { Link } from "react-router-dom";
import { AlertDialog } from "../common";
import { TrashIcon, PencilSquareIcon } from "@heroicons/react/24/solid";
import { ReleaseManagment } from "../common/icons";

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
    <div className="flex-wrap gap-5 text-base flex items-center justify-between w-full bg-tertiary/20 lightest-version rounded-lg px-4 py-4 shadow-md transition-all delay-75 hover:shadow-lg border-4 border-tertiary/20">
      <img
        src={`https://img.logoipsum.com/${220 + idx}.svg`}
        className="w-32 max-h-10"
        alt=""
      />
      <div className="">
        Name: <span className="font-bold">AppName</span>
      </div>
      <div className="flex items-center gap-2">
        Status:
        <div className="bg-primary p-2 rounded-md text-xs font-bold">
          Uppublished
        </div>
      </div>
      <div className=" w-full md:w-max flex justify-between items-center flex-wrap gap-5">
        <AlertDialog {...{ btnColor: "red" }}>
          <TrashIcon className="h-6 w-6 cursor-pointer" />
        </AlertDialog>
        <Link to="3434/edit">
          <PencilSquareIcon className="h-6 w-6 cursor-pointer" />
        </Link>
        <Link to="3434/release-management">
          <ReleaseManagment />
        </Link>
      </div>
    </div>
  );
};
