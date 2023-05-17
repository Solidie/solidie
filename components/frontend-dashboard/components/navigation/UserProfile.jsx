import React, { useContext } from "react";
import { ElementProps } from "../../contexts";

const UserProfile = () => {
  const [elementProps] = useContext(ElementProps);

  return (
    <div className="w-max py-1 px-3 flex justify-between items-center gap-3 cursor-pointer">
      <pre className="hidden sm:block text-tertiary text-base select-none">
        UserName
      </pre>
      <div className="">
        <img
          className="w-10 object-contain rounded-lg"
          src={elementProps?.frontendDashboardData?.avatar_url ?? ""}
          alt=""
        />
      </div>
    </div>
  );
};

export default UserProfile;
