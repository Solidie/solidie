import React, { useContext } from "react";
import {  UserNav} from "../ui/table/user-nav.jsx";

const UserProfile = () => {
  return (
    <div className="w-max py-1 px-3 flex justify-between items-center gap-3 cursor-pointer">
      <UserNav />
      {/* <pre className="hidden sm:block text-tertiary text-base select-none">
        UserName
      </pre>
      <div className="">
        <img
          id="userProfileIMG"
          className="w-8 object-contain rounded-lg shadow-lg shadow-tertiary/40"
          src={null}
          alt=""
        />
      </div> */}
    </div>
  );
};

export default UserProfile;
