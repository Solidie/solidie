import React from "react";
import EditAccountForm from "../components/myAccount/EditAccountForm.jsx";

const MyAccount = (params) => {
  return (
    <div className="text-tertiary flex flex-col gap-8 w-full min-h-max h-full">
      {/* Header */}
      <div className="flex flex-col justify-center w-full gap-4">
        <h1 className="text-3xl font-bold">Edit Account</h1>
      </div>
      <EditAccountForm />
    </div>
  );
};

export default MyAccount;
