import React from "react";

export function MyAccount (params) {
  return (
    <div className={"text-tertiary flex flex-col gap-8 width-p-100 min-h-max height-p-100".classNames()}>
      {/* Header */}
      <div className={"flex flex-col justify-center width-p-100 gap-4".classNames()}>
        <h1 className={"text-3xl font-bold".classNames()}>Edit Account</h1>
      </div>
      Edit account form here
    </div>
  );
};
