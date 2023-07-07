import React from "react";
import EditApplicationForm from "./segments/EditApplicationForm.jsx";
import { Link } from "react-router-dom";
import { ArrowLeftIcon } from "@radix-ui/react-icons";
import { getDashboardPath } from "../../../utilities/helpers.jsx";

const EditApplication = (params) => {
  return (
    <div className={"text-tertiary flex flex-col gap-8 w-full min-h-max h-full".classNames()}>
      {/* Header */}
      <div className={"flex flex-col justify-center w-full gap-4".classNames()}>
        <Link to={getDashboardPath("inventory")}>
          <button className={"flex gap-2 justify-around items-center w-max bg-primary hover:bg-primary/70 focus:text-green-900 focus:outline-green-900 text-tertiary font-bold text-sm px-6 py-2 rounded-full shadow-xl active:animate-bounce shadow-primary border border-tertiary/5 cursor-pointer".classNames()}>
            <ArrowLeftIcon />
            Back
          </button>
        </Link>
        <h1 className={"text-3xl font-bold".classNames()}>Edit Application</h1>
      </div>
      <EditApplicationForm />
    </div>
  );
};

export default EditApplication;
