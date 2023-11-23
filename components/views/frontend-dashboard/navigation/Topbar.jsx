import React from "react";

export function Topbar({ frontendDashboardData, children }) {
  return (
    <div className={"bg-brand-white h-max py flex justify-between items-center ".classNames()} style={{flex: 1}}>
      <div className={"w-max py-4 px-6 flex justify-between items-center gap-4".classNames()}>
        {children}
		<div className={"h-max w-max select-none".classNames()}>
          <img
            src={`https://img.logoipsum.com/${233 + Math.floor(Math.random() * (43 - 33 + 1))}.svg`}
            className={"w-32 max-h-8 select-none object-contain".classNames()}
            alt=""
          />
        </div>
      </div>
      <div className={"flex-grow width-p-100 flex justify-end items-center sm:px-4 ".classNames()}>
        User Prof
      </div>
    </div>
  );
};
