import React, { useMemo } from "react";
import { MdSwitchAccount, MdInventory } from "react-icons/md";
import { Link, useLocation } from "@reach/router";
import {
  CustomersIcon,
  ReportIcon,
  SalesIcon,
  SubscriptionIcon,
  PurchasedProductsIcon,
} from "./icons";

const Sidebar = ({ sidebarOpen }) => {
  const location = useLocation();
  const groupedNavigation = useMemo(
    () => [
      {
        groupName: "Dashboard",
        navigation: [
          {
            href: "purchased-apps",
            text: "Purchased Apps",
            icon: <PurchasedProductsIcon />,
          },
          {
            href: "subscriptions",
            text: "Subscriptions",
            icon: <SubscriptionIcon />,
          },
          {
            href: "my-account",
            text: "My Account",
            icon: <MdSwitchAccount className="text-2xl" />,
          },
        ],
      },
      {
        groupName: "Company Name",
        navigation: [
          {
            href: "inventory",
            text: "Inventory",
            icon: <MdInventory className="text-2xl" />,
          },
          {
            href: "sales",
            text: "Sales",
            icon: <SalesIcon />,
          },
          {
            href: "customers",
            text: "Customers",
            icon: <CustomersIcon />,
          },
          {
            href: "reports",
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
        "flex flex-col px-5 py-4 w-max " +
        (sidebarOpen ? " gap-4 min-h-full min-w-max overflow-y-auto " : " gap-5 ")
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
            let active =
              location.pathname === `/dashboard/${href}/` ||
              location.pathname === `/dashboard/${href}`;

            return (
              <Link to={href} key={idx}>
                <div
                  className={
                    "flex items-center gap-3 w-max h-max font-semibold text-sm cursor-pointer " +
                    (active
                      ? "bg-tertiary text-lightest-version "
                      : " text-tertiary font-bold  ") +
                    (sidebarOpen
                      ? " rounded-full py-3 px-8 "
                      : " rounded-full py-3 px-6 ") +
                    (sidebarOpen && active ? "shadow-md shadow-tertiary" : "") +
                    (!sidebarOpen && active ? "shadow-sm shadow-tertiary" : "")
                  }
                >
                  {icon}
                  {sidebarOpen ? text : ""}
                </div>
              </Link>
            );
          })}
        </div>
      ))}
    </div>
  );
};

export default Sidebar;
