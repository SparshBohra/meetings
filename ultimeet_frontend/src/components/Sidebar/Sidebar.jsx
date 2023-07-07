"use client";

import React from "react";
import styles from "./Sidebar.module.css";
import Image from "next/image";
import Link from "next/link";
import { sidebarLinks } from "@/constants/data";
import { usePathname } from "next/navigation";
import { BsBarChartLineFill } from "react-icons/bs";
import moment from 'moment';

const Sidebar = () => {
  const currentRoute = usePathname();

  return (
    <div
      className={`fixed left-0 w-[246px] border-r border-[#EAEBF0] bg-[#1C2534] bottom-0 min-h-screen h-full overflow-scroll ${styles.sidebar}`}
    >
      <div className="pt-8 pb-12 px-11">
        <Link href="/">
          <Image
            src="/logo.svg"
            alt="ultiMeet"
            width={150}
            height={50}
            className="object-cover"
          />
        </Link>
      </div>
      <div className="flex flex-col justify-between  h-5/6">
        <div>
          <h3 className="text-[14px] font-semibold text-graySidebar px-11">
            OVERVIEW
          </h3>
          <ul className="mt-5">
            {sidebarLinks.overview.map((links) => {
              const isActive = currentRoute === links.href; // Check if the link is active
              return (
                <Link
                  key={links.name}
                  href={links.href}
                  className={`h-[46px] relative flex items-center cursor-pointer ${
                    isActive ? styles.activeLink : ""
                  }`}
                >
                  <li className=" flex items-center gap-3 pl-11 ">
                    {links.name === "Analytics" ? (
                      <BsBarChartLineFill
                        className={
                          isActive ? `${styles.activeImage}` : `text-[#55698E]`
                        }
                        fontSize={18}
                      />
                    ) : (
                      <Image
                        src={links.icon}
                        alt={links.name}
                        width={22}
                        height={22}
                        className={isActive && `${styles.activeImage}`}
                      />
                    )}
                    <span
                      className={`${
                        isActive ? "text-white" : "text-graySidebar"
                      } font-medium text-base`}
                    >
                      {links.name}
                    </span>
                  </li>
                </Link>
              );
            })}
          </ul>
          <h3 className="text-[14px] mt-8 font-semibold text-graySidebar px-11">
            MANAGEMENT
          </h3>
          <ul className="mt-5">
            {sidebarLinks.management.map((links) => {
              const isActive = currentRoute === links.href; // Check if the link is active
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
                        isActive ? "text-white" : "text-graySidebar"
                      } font-medium text-base`}
                    >
                      {links.name}{" "}
                      {/* {links.href === "/notifications" && (
                        <span className="bg-[#e7e7eb] ml-2 inline-flex text-{#333} text-sm w-5 h-5 items-center justify-center rounded-full">
                          5
                        </span>
                      )} */}
                    </span>
                  </li>
                </Link>
              );
            })}
          </ul>
        </div>
        <div>
          <h3 className="text-[14px] mt-8 font-semibold text-graySidebar px-11">
            ADMINISTRATION
          </h3>
          <ul className="mt-5">
            {sidebarLinks.administration.map((links) => {
              const isActive = currentRoute === links.href; // Check if the link is active
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
                        isActive ? "text-white" : "text-graySidebar"
                      } font-medium text-base`}
                    >
                      {links.name}{" "}
                    </span>
                  </li>
                </Link>
              );
            })}
          </ul>
        </div>
      </div>
    </div>
  );
};

export default Sidebar;
