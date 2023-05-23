import React, { useMemo } from "react";
import { MdSwitchAccount, MdInventory } from "react-icons/md";
import { Link, useLocation } from "react-router-dom";
import {
  CustomersIcon,
  ReportIcon,
  SalesIcon,
  SubscriptionIcon,
  PurchasedProductsIcon,
} from "./icons";
import { Tooltip } from "../ui";

const Sidebar = ({ sidebarOpen }) => {
  const location = useLocation();
  const groupedNavigation = useMemo(
    () => [
      {
        groupName: "Dashboard",
        navigation: [
          {
            href: "dashboard/purchased-apps",
            text: "Purchased Apps",
            icon: <PurchasedProductsIcon />,
          },
          {
            href: "dashboard/subscriptions",
            text: "Subscriptions",
            icon: <SubscriptionIcon />,
          },
          {
            href: "dashboard/my-account",
            text: "My Account",
            icon: <MdSwitchAccount className="text-2xl" />,
          },
        ],
      },
      {
        groupName: "Company Name",
        navigation: [
          {
            href: "dashboard/inventory",
            text: "Inventory",
            icon: <MdInventory className="text-2xl" />,
          },
          {
            href: "dashboard/sales",
            text: "Sales",
            icon: <SalesIcon />,
          },
          {
            href: "dashboard/customers",
            text: "Customers",
            icon: <CustomersIcon />,
          },
          {
            href: "dashboard/reports",
            text: "Reports",
            icon: <ReportIcon />,
          },
        ],
      },
    ],
    []
  );

  return (
    <div
      className={
        "z-10 flex flex-col px-5 py-4 w-full md:w-max min-h-max h-full transition-all  " +
        (sidebarOpen
          ? " gap-4  min-w-max overflow-y-auto  fixed left-0 xl:relative "
          : " gap-5  hidden sm:flex ")
      }
    >
      {groupedNavigation.map(({ groupName, navigation }, idx) => (
        <div
          className={"flex flex-col " + (sidebarOpen ? " gap-1 " : " gap-5 ")}
          key={idx}
        >
          {sidebarOpen ? (
            <pre className="text-xs font-semibold py-4 text-tertiary px-2">
              {groupName}
            </pre>
          ) : (
            <></>
          )}
          {navigation.map(({ text, icon, href }, idx) => {
            let active = location.pathname.includes(href);

            return (
              <Link to={href} key={idx}>
                <Tooltip {...{text}}>
                  <div
                    className={
                      "flex items-center gap-3 w-max h-max font-semibold text-sm active:animate-ping cursor-pointer " +
                      (active
                        ? "bg-tertiary text-lightest-version "
                        : " text-tertiary font-bold  ") +
                      (sidebarOpen
                        ? " rounded-full py-3 px-8 "
                        : " rounded-full py-3 px-6 ") +
                      (sidebarOpen && active
                        ? "shadow-md shadow-tertiary/60 "
                        : "") +
                      (!sidebarOpen && active
                        ? "shadow-sm shadow-tertiary/60"
                        : "")
                    }
                  >
                    {icon}
                    {sidebarOpen ? text : ""}
                  </div>
                </Tooltip>
              </Link>
            );
          })}
        </div>
      ))}
    </div>
  );
};

export default Sidebar;
