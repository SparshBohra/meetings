"use client";

import React from "react";
import styles from "./Sidebar.module.css";
import Image from "next/image";
import Link from "next/link";
import { sidebarLinks } from "@/constants/data";
import { usePathname } from "next/navigation";

const Sidebar = () => {
  const currentRoute = usePathname();

  return (
    <div className="fixed left-0 w-[280px] border-r border-[#EAEBF0] bg-bgColor bottom-0 min-h-screen ">
      <div className="pt-8 pb-12 px-11">
        <Link href="/">
          <Image
            src="/logo.png"
            alt="ultiMeet"
            width={150}
            height={50}
            className="object-cover"
          />
        </Link>
      </div>

      <h3 className="text-[14px] font-semibold text-graySidebar px-11">
        OVERVIEW
      </h3>
      <ul className="mt-5">
        {sidebarLinks.overview.map((links) => {
          const isActive = currentRoute === links.href; // Check if the link is active
          console.log(isActive, currentRoute, links.href);
          return (
            <Link
              key={links.name}
              href={links.href}
              className={`h-[46px] relative flex items-center cursor-pointer ${
                isActive ? styles.activeLink : ""
              }`}
            >
              <li className=" flex items-center gap-3 pl-11 ">
                <Image
                  src={links.icon}
                  alt={links.name}
                  width={22}
                  height={22}
                  className={isActive && `${styles.activeImage}`}
                />
                <span
                  className={`${
                    isActive ? "text-darkBlue" : "text-graySidebar"
                  } font-medium text-base`}
                >
                  {links.name}
                </span>
              </li>
            </Link>
          );
        })}
      </ul>
    </div>
  );
};

export default Sidebar;
