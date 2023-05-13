import React from "react"

const UserProfile = ({ frontendDashboardData: { avatar_url } }) => {
  return (
    <div className="w-max py-1 px-3 flex justify-between items-center gap-3 cursor-pointer">
      <pre className="text-tertiary text-base select-none">UserName</pre>
      <div className="">
        <img
          className="w-10 object-contain rounded-lg"
          src={avatar_url}
          alt=""
        />
      </div>
    </div>
  );
};

export default UserProfile;
