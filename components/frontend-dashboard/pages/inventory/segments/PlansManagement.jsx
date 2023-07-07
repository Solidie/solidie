import React, { useEffect, useState } from "react";
import { cn } from "../../../../utilities/helpers.jsx";

export default function Example({ plansDetail }) {
  const [plans, setPlans] = useState(plansDetail);

  useEffect(() => {
    console.log(plans);
  }, [plans]);

  const changePlan = (idx) => {
    setPlans(
      plans.flatMap((_plan, _idx) => ({
        name: _plan.name,
        cost: _plan.cost,
        selected: idx === _idx ? !_plan.selected : _plan.selected,
      }))
    );
  }

  return (
    <div className={"w-full".classNames()}>
      <div className={" w-full m ax-w-md".classNames()}>
        <label className={"sr-only".classNames()}>Server size</label>
        <div className={"gap-2 flex flex-wrap".classNames()}>
          {plans.map((plan, idx) => (
            <div
              key={plan.name}
              className={cn(
                "relative bg-transparent flex flex-col rounded-lg px-5 py-4 shadow-md focus:outline-none w-full space-y-1 max-w-sm lg:max-w-fit"
              )}
            >
              <button 
                type="button"
                onClick={() => changePlan(idx)} aria-hidden="true"
                className={cn(
                  plan.selected
                    ? "bg-tertiary text-white"
                    : "bg-primary opacity-80",
                  "block absolute inset-0 shadow-lg rounded-lg")}>
              </button>
              <button
                onClick={() => changePlan(idx)}
                type="button"
                className={"z-10 cursor-pointer flex w-full items-center justify-between".classNames()}
              >
                <div className={"flex items-center".classNames()}>
                  <div className={"text-sm".classNames()}>
                    <p
                      className={cn(
                        plan.selected ? "text-white" : "text-gray-900",
                        "font-medium"
                      )}
                    >
                      {plan.name}
                    </p>
                  </div>
                </div>
                <div className={"shrink-0 text-white".classNames()}>
                  <CheckIcon className={"h-6 w-6".classNames()} selected={plan.selected} />
                </div>
              </button>

              <span
                className={cn(
                  plan.selected ? "text-sky-100" : "text-gray-500",
                  "inline z-10"
                )}
              >
                <div className={"flex flex-col items".classNames()}>
                  <label
                    htmlFor={plan.name}
                    className={cn(
                      "text-xs font-medium ",
                      plan.selected ? "text-primary" : ""
                    )}
                  >
                    Pricing
                  </label>
                  <div className={"mt-1 relative rounded-md shadow-sm".classNames()}>
                    <div className={"absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none".classNames()}>
                      <span className={"text-gray-500 sm:text-sm".classNames()}> $ </span>
                    </div>
                    <input
                      type="number"
                      id={plan.name}
                      className={cn(
                        plan.selected
                          ? "focus:ring-brand-white focus:border-brand-white  border-brand-white bg-primary text-tertiary"
                          : "focus:ring-tertiary focus:border-tertiary  border-brand-white bg-tertiary text-primary",
                        "block w-full pl-7 pr-12 sm:text-sm rounded-xl"
                      )}
                      value={plan.cost}
                      onChange={(e) =>
                        setPlans(
                          plans.flatMap((_plan, _idx) => ({
                            name: _plan.name,
                            cost:
                              idx === _idx
                                ? Number(e.target.value)
                                : _plan.cost,
                            selected: _plan.selected,
                          }))
                        )
                      }
                      aria-describedby="price-currency"
                    />
                    <div className={"absolute inset-y-0 right-0 pr-3 flex items-center pointer-events-none".classNames()}>
                      <span
                        className={"text-gray-500 sm:text-sm".classNames()}
                        id="price-currency"
                      >
                        {" "}
                        USD{" "}
                      </span>
                    </div>
                  </div>
                </div>
              </span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

function CheckIcon({ className, selected }) {
  return (
    <svg viewBox="0 0 24 24" fill="none" className={className}>
      <circle
        cx={12}
        cy={12}
        r={12}
        fill={selected ? "#fff" : "#000"}
        opacity="0.2"
      />
      {selected && (
        <path
          d="M7 13l3 3 7-7"
          stroke="#fff"
          strokeWidth={1.5}
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      )}
    </svg>
  );
}