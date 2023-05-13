import React from "react";

const InventoryTable = () => {
  return (
    <div className="flex flex-col w-full gap-4 min-h-max overflow-scroll scroll-w-0 scroll-smooth">
      <Row />
      <Row />
      <Row />
      <Row />
      <Row />
      <Row />
      <Row />
      <Row />
      <Row />
      <Row />
      <Row />
      <Row />
      <Row />
      <Row />
      <Row />
      <Row />
    </div>
  );
};

export default InventoryTable;

const Row = () => {
  return (
    <div className=" text-base flex items-center justify-between w-full bg-white rounded-lg px-4 py-4 shadow-lg">
      <img src="https://img.logoipsum.com/250.svg" alt="" />
      <div className="">Name: <span className="font-bold">AppName</span></div>
      <div className="flex items-center gap-2">
        Status:
        <div className="bg-primary p-2 rounded-md text-xs font-bold">
          Uppublished
        </div>
      </div>
      <button className="text-red-900 bg-red-400 font-bold text-sm px-8 py-2 rounded-full active:animate-bounce shadow-md shadow-red-400">
        Delete
      </button>
      <button className="bg-primary hover:bg-primary/70 text-tertiary font-bold text-sm px-8 py-2 rounded-full shadow-xl active:animate-bounce shadow-primary outline cursor-pointer">
        Edit App
      </button>
      <button className="bg-primary hover:bg-primary/70 text-tertiary font-bold text-sm px-8 py-2 rounded-full shadow-xl active:animate-bounce shadow-primary outline cursor-pointer">
        Release Management
      </button>
    </div>
  );
};
