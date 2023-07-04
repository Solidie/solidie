import React, { useState } from "react";
import { DownloadIcon } from "@radix-ui/react-icons";
import { HiExternalLink } from "react-icons/hi";
import { Select } from "../../ui";

const selectFieldItemsList = ["V 1.8.0", "V 2.1.0", "V 3.2.0", "V 3.4.0"];
const selectFieldDisableItemsList = ["V 3.9.0"];
const selectFieldDefaultValue = "V 3.4.0";
const selectFieldAriaLabel = "Version";

const AppDetailCards = () => {
  return (
    <div className="flex flex-wrap gap-5 justify-around">
      {Array(20)
        .fill(undefined)
        .map((item, idx) => (
          <AppDetailCard key={idx} idx={idx} />
        ))}
    </div>
  );
};

export default AppDetailCards;

const AppDetailCard = ({ idx }) => {
  const [selectedVersion, setSelectedVersion] = useState("");

  return (
    <div className="flex flex-col items-center gap-8 bg-tertiary/20 text-tertiary p-6 w-max h-max rounded-2xl shadow-lg hover:shadow-tertiary/60 border-4 border-tertiary/20">
      <div className="self-start bg-primary px-2 py-1 uppercase rounded-md text-xs font-bold">
        v 1.0.6
      </div>
      <div className="flex flex-col items-center gap-y-5">
        <img src={`https://img.logoipsum.com/${220 + idx}.svg`} className="w-32 h-10" alt="" />
        <div className="flex flex-col items-center">
          <div className="font-black text-xl">Application Name</div>
          <div className="italic">Teams (LifeTime)</div>
        </div>
        <div className="flex flex-col items-center gap-y-5 px-10 ">
          <button className="Button flex items-center gap-x-2">
            Download {selectedVersion === "" ? "Latest" : selectedVersion}
            <DownloadIcon />
          </button>
          <Select
            className="shadow-lg"
            value={selectedVersion}
            onChange={(e) => {
              setSelectedVersion(e);
            }}
            placeholder="Previous Versions"
            ariaLabel={selectFieldAriaLabel}
            //   defaultValue={selectFieldDefaultValue}
            disableItemsList={selectFieldDisableItemsList}
            itemsList={selectFieldItemsList}
          />
        </div>
      </div>
      <div className="flex items-center gap-x-1 underline text-tertiary font-bold text-sm cursor-pointer">
        See Changelog <HiExternalLink className="text-lg" />
      </div>
    </div>
  );
};
