import React, { useContext, useMemo } from "react";
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
import { ContextFrontendDashboard } from "../../utilities/contexts.jsx";
import { cn, getDashboardPath } from "../../utilities/helpers.jsx";

const Sidebar = ({ sidebarOpen, setSidebarOpen }) => {
		
	const {stores=[]} = useContext(ContextFrontendDashboard);
	const location = useLocation();
	const groupedNavigation = useMemo(
		() => [
			{
				groupName: "Dashboard",
				navigation: [
				{
					href: getDashboardPath('purchased-apps'),
					text: "Purchased Apps",
					icon: <PurchasedProductsIcon />,
				},
				{
					href: getDashboardPath('subscriptions'),
					text: "Subscriptions",
					icon: <SubscriptionIcon />,
				},
				{
					href: getDashboardPath('my-account'),
					text: "My Account",
					icon: <MdSwitchAccount className={"text-2xl".classNames()} />,
				},
				],
			},
			...stores.map(store=>{
				let {store_slug, store_name} = store;
				return {
					groupName: store_name,
					navigation: [
						{
							href: getDashboardPath(`store/${store_slug}/inventory`),
							text: "Inventory",
							icon: <MdInventory className={"text-2xl".classNames()} />,
						},
						{
							href: getDashboardPath(`store/${store_slug}/sales`),
							text: "Sales",
							icon: <SalesIcon />,
						},
						{
							href: getDashboardPath(`store/${store_slug}/customers`),
							text: "Customers",
							icon: <CustomersIcon />,
						},
						{
							href: getDashboardPath(`store/${store_slug}/reports`),
							text: "Reports",
							icon: <ReportIcon />,
						},
					],
				}
			})
		],
		[]
	);

  return (
    <>
      <div
        className={cn(
          " z-50 flex scrollbar-track-transparent flex-col px-5 py-4 w-full md:w-max min-h-max h-full transition-all  ",
          sidebarOpen
            ? " gap-4  min-w-max s ticky sm:a bsolute sm:i nset-0 l eft-0 "
            : " gap-5  hidden lg:flex "
        )}
      >
        {groupedNavigation.map(({ groupName, navigation }, idx) => (
          <div
            className={"flex flex-col " + (sidebarOpen ? " gap-1 " : " gap-5 ")}
            key={idx}
          >
            {sidebarOpen ? (
              <pre className={"text-xs font-semibold py-4 text-tertiary px-2".classNames()}>
                {groupName}
              </pre>
            ) : (
              <></>
            )}
            {navigation.map(({ text, icon, href }, idx) => {
              let active = location.pathname.includes(href);

              return (
                <Tooltip key={idx} {...{ text }}>
                  <Link to={href} onClick={() => (window.innerWidth < 1040) ? setSidebarOpen(!sidebarOpen) : ""}>
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
                  </Link>
                </Tooltip>
              );
            })}
          </div>
        ))}
      </div>
    </>
  );
};

export default Sidebar;
