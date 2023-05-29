import React, { useContext } from "react";
import { UserProfileUrl } from "../../contexts";

const UserProfile = () => {
  const [userProfileUrl] = useContext(UserProfileUrl);
  console.log({userProfileUrl})

  return (
    <div className="w-max py-1 px-3 flex justify-between items-center gap-3 cursor-pointer">
      <pre className="hidden sm:block text-tertiary text-base select-none">
        UserName
      </pre>
      <div className="">
        <img
          id="userProfileIMG"
          className="w-8 object-contain rounded-lg shadow-lg shadow-tertiary/40"
          src={userProfileUrl}
          alt=""
        />
      </div>
    </div>
  );
};

export default UserProfile;
