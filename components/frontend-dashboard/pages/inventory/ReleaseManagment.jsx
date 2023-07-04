import React from "react";
import ReleaseManagmentTable from "./segments/ReleaseManagementTable.jsx";
import ApplicationVersionForm from "./segments/ApplicationVersionForm.jsx";
import { Link } from "react-router-dom";
import { ArrowLeftIcon } from "@radix-ui/react-icons";
import { getDashboardPath } from "../../../utilities/helpers.jsx";
import { PlusIcon } from "@heroicons/react/24/solid";

const InventoryReleaseManagment = (params) => {
  return <div className="text-tertiary flex flex-col gap-8 w-full h-max min-h-full">
		{/* Header */}
		<div className="flex flex-col justify-center w-full gap-4">
			<Link to={getDashboardPath("inventory")}>
				<button className="flex gap-2 justify-around items-center w-max bg-primary hover:bg-primary/70 focus:text-green-900 focus:outline-green-900 text-tertiary font-bold text-sm px-6 py-2 rounded-full shadow-xl active:animate-bounce shadow-primary border border-tertiary/5 cursor-pointer">
					<ArrowLeftIcon />
					Back
				</button>
			</Link>
			
			<div className="flex justify-between items-center w-full">
				<h1 className="text-3xl font-bold">Releases</h1>
				<Link to="add" ><div className='Button flex'>New Release <PlusIcon className="h-4 w-4" /></div></Link>
			</div>
		</div>

		<ReleaseManagmentTable />
    </div>
};

export default InventoryReleaseManagment;
