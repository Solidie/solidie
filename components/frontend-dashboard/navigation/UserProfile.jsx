import React, { useContext } from "react";
import {  UserNav} from "../ui/table/user-nav.jsx";

const UserProfile = () => {
  return (
    <div className={"w-max py-1 px-3 flex justify-between items-center gap-3 cursor-pointer".classNames()}>
      <UserNav />
    </div>
  );
};

export default UserProfile;
