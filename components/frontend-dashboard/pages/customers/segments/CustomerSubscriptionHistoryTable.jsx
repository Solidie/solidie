import React from "react";
import { Link } from "react-router-dom";
import {AccordionInner} from "../../../ui"
import * as AccordionPrimitive from "@radix-ui/react-accordion";
import clsx from "clsx";
import SalesSubscriptionsLicenseTable from "./CustomersSubscriptionsLicenseTable.jsx";


const CustomerSubscriptionHistoryTable = () => {
  return (
    <div className={" flex flex-col w-full gap-4 min-h-max bg-primary".classNames()}>
      <AccordionPrimitive.Root
        type="single"
        defaultValue="item-1"
        className={clsx("space-y-4 w-full")}
      >
        {Array(20)
          .fill(undefined)
          .map((item, idx) => (
            <AccordionInner
              key={idx}
              header={<Row idx={idx} />}
              idx={idx}
              content={<SalesSubscriptionsLicenseTable />}
            />
          ))}
      </AccordionPrimitive.Root>
    </div>
  );
};

export default CustomerSubscriptionHistoryTable;

const Row = ({ idx }) => {
  return (
    <div className={"flex-grow flex-wrap gap-5 text-base flex items-center justify-between w-full bg-white rounded-lg px-4 py-4 transition-all delay-75 ".classNames()}>
      <div className={"flex gap-4 items-center".classNames()}>
        <img src={`https://img.logoipsum.com/${ 220 + idx  }.svg`} className={"w-32 max-h-10".classNames()} alt="" />
        <div className={"bg-primary p-2 rounded-md text-xs font-bold".classNames()}>
          Expired
        </div>
      </div>
      <div className="">
        Plan: <span className={"font-bold".classNames()}>Individual (Lifetime) ...</span>
      </div>
      <div className={"flex items-center gap-2".classNames()}>
        Used:
        <div className={"p-2 rounded-md text-sm font-black".classNames()}>4/∞</div>
      </div>
      <div className={" w-full md:w-max flex justify-between flex-wrap gap-5".classNames()}>
        <Link to="3434/edit">
          <div className={"h-max w-full sm:w-max bg-primary hover:bg-primary/70 focus:text-green-900 focus:outline-green-900 text-tertiary font-bold text-sm px-8 py-2 rounded-full shadow-xl active:animate-bounce shadow-primary outline cursor-pointer".classNames()}>
            Renew
          </div>
        </Link>
        <Link to="3434/release-management">
          <div className={"w-full sm:w-max bg-primary hover:bg-primary/70 focus:text-green-900 focus:outline-green-900 text-tertiary font-bold text-sm px-8 py-2 rounded-full shadow-xl active:animate-bounce shadow-primary outline cursor-pointer".classNames()}>
            Add License
          </div>
        </Link>
      </div>
    </div>
  );
};
