import React from "react";

export function AddApplication(params){
	return <div className={"text-tertiary flex flex-col gap-8 width-p-100 min-h-max height-p-100".classNames()}>
		{/* Header */}
		<div className={"flex flex-col justify-center width-p-100 gap-4".classNames()}>
			<button onClick={window.history.back} className={"flex gap-2 justify-around items-center w-max bg-primary hover:bg-primary/70 focus:text-green-900 focus:outline-green-900 text-tertiary font-bold text-sm px-6 py-2 rounded-full shadow-xl active:animate-bounce shadow-primary border border-tertiary/5 cursor-pointer".classNames()}>
				Back
			</button>
			<h1 className={"text-3xl font-bold".classNames()}>Add Application</h1>
		</div>
	</div>
};
