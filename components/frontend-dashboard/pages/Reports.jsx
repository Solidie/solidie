import React, { useEffect, useState } from "react";
import { useResizeDetector } from "react-resize-detector";
import { ApexChart, BarChart } from "../../utilities/commons";
import { MoneyBag, Wallet, WidthdrawBalance } from "../../utilities/commons/icons";

const Reports = () => {
  const [uniqueVistor, setUniqueVistor] = useState("Month");
  const [areaChartHeight, setAreaChartHeight] = useState(0);
  const { width: leftWidth, ref: leftref } = useResizeDetector();
  const {
    width: rightWidth,
    height: rightHeight,
    ref: rightref,
  } = useResizeDetector();

  useEffect(() => {
    if ((areaChartHeight === 0) & (rightHeight !== undefined)) {
      if (window.screen.width < 680) {
        setAreaChartHeight(rightHeight / 2);
      } else {
        setAreaChartHeight(rightHeight - 30);
      }

      console.log(rightHeight);
    }
  }, [rightHeight]);

  return (
    <div className="flex flex-col w-full h-full space-y-5">
      {/* Header */}
      <div className="flex justify-between items-center w-full">
        <h1 className="text-3xl font-bold">Reports</h1>
      </div>
      <div className="text-tertiary grid md:grid-cols-2 lg:grid-cols-3 gap-5">
        <div className="border border-tertiary/60 border-dashed rounded-md p-2 flex-grow">
          <div className="flex flex-col justify-between reports-green-card-gradient rounded-md h-28 w-full shadow-lg px-5 py-3">
            <div className="font-bold">
              <div className="text-xs">Current Available</div>
              <div className="text-sm font-black">Balance to Withdraw</div>
            </div>
            <div className="w-full flex justify-between">
              <WidthdrawBalance width={30} height={30} />
              <div className="text-3xl font-black">$100</div>
            </div>
          </div>
        </div>
        <div className="border border-tertiary/60 border-dashed rounded-md p-2 flex-grow">
          <div className="flex flex-col justify-between reports-blue-card-gradient rounded-md h-28 w-full shadow-lg  px-5 py-3">
            <div className="font-bold">
              <div className="text-sm font-black">Total Earning</div>
            </div>
            <div className="w-full flex justify-between">
              <Wallet width={33} height={38} />
              <div className="text-3xl font-black">$100</div>
            </div>
          </div>
        </div>
        <div className="md:col-span-3 lg:col-span-1 border border-tertiary/60 border-dashed rounded-md p-2 flex-grow">
          <div className="flex flex-col justify-between reports-white-card-gradient rounded-md h-28 w-full shadow-lg  px-5 py-3">
            <div className="font-bold">
              <div className="text-xs">Pending Earning To Be</div>
              <div className="text-sm font-black">Available to Withdraw</div>
            </div>
            <div className="w-full flex justify-between">
              <MoneyBag width={30} height={30} />
              <div className="text-3xl font-black">$100</div>
            </div>
          </div>
        </div>
      </div>
      <div className="max-h-max w-full flex flex-col lg:flex-row justify-between gap-5">
        <div className="flex flex-col w-full lg:w-[60%]">
          <div className="flex justify-between py-4">
            <div className="text-xl font-bold">Unique Visitor</div>
            <div className="text-tertiary flex rounded-xl">
              {["Month", "Week"].map((item, idx) => (
                <div
                  key={idx}
                  onClick={() => {
                    setUniqueVistor(item);
                  }}
                  className={
                    (item === uniqueVistor
                      ? " bg-tertiary text-lightest-version"
                      : " ") +
                    " text-xs font-bold px-4 py-1 flex items-center rounded-lg cursor-pointer"
                  }
                >
                  {item}
                </div>
              ))}
            </div>
          </div>
          <div
            ref={leftref}
            className="py-2 flex items-center w-full sm:px-4 bg-lightest-version/60 rounded-xl shadow-lg"
          >
            <ApexChart {...{ width: leftWidth, height: areaChartHeight }} />
          </div>
        </div>
        <div className="flex flex-col w-full lg:w-[37%]">
          <div className="w-full flex justify-between py-4">
            <div className="text-xl font-bold">Income Overview</div>
          </div>
          <div
            ref={rightref}
            className="h-max w-full px-4 bg-lightest-version/60 rounded-xl shadow-lg"
          >
            <div className="pt-6 px-4">
              <div className="text-lg">This Week Statistics</div>
              <div className="text-4xl font-bold">$7,650</div>
            </div>
            <BarChart {...{ width: rightWidth }} />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Reports;
