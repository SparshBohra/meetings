import Image from "next/image";
import React from "react";
import { BsSearch } from "react-icons/bs";
import { IoNotificationsOutline } from "react-icons/io5";
// import styles from "./Header.module.css";

const Header = () => {
  return (
    <nav className="bg-white h-[70px] border-b border-[#EAEBF0] ml-[245px] pr-8 pl-8 fixed left-0 top-0 right-0 z-50">
      <div className="flex items-center h-full justify-between">
        <div className="w-[400px] flex h-[40px] items-center gap-4 border border-[#EAEBF0] rounded-md focus-within:border-[#cacbce]">
          <BsSearch className="ml-3 text-grayText" fontSize={18} />
          <input
            type="text"
            placeholder="Search by meeting name or key words"
            className="bg-transparent text-inherit w-full h-full px-3 outline-none border-0 "
          />
        </div>

        <div className="flex items-center gap-7">
          <div className="relative">
            <IoNotificationsOutline fontSize={20} className="text-black" />
            <p className="absolute w-2 h-2 bg-bgBlue rounded-full top-0.5 right-0.5" />
          </div>
          <div className="flex items-center gap-3">
            <Image
              src="https://wac-cdn.atlassian.com/dam/jcr:ba03a215-2f45-40f5-8540-b2015223c918/Max-R_Headshot%20(1).jpg?cdnVersion=1074"
              alt="user"
              width={40}
              height={40}
              className="rounded-full object-cover"
            />
            <div>
              <h3 className="text-primary text-base font-medium">
                Max Thompson
              </h3>
              <p className="text-grayText text-sm ">Product Designer</p>
            </div>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Header;
