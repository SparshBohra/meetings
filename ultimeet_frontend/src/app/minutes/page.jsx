"use client";
import React, { useState } from "react";
import styles from "./minutes.module.css";

import {
  meetingRecoringKeyPoints,
  profilePic,
  userDetails,
  userWithTheirTalkTime,
} from "@/constants/data";
import Image from "next/image";
import UserProfileComp from "@/components/Minutes/UserProfileComp";
import { BsChevronDown, BsSearch } from "react-icons/bs";
import MeetingOverview from "@/components/Minutes/MeetingOverview";

const Minutes = () => {
  const [toggleAccordion, setToggleAccordion] = useState(true);

  return (
    <section className="ml-[280px] p-12 bg-bgColor mt-[70px]">
      <div className="grid grid-flow-col grid-cols-3 gap-8">
        <div className="col-span-2 ">
          <div
            className={`rounded-md p-4 border-l-[6px] border-yellow-600 border-r-0 ${styles.borderGradient} ${styles.borderGradient2}`}
          >
            {/* accordion header  */}
            <div
              onClick={() => setToggleAccordion((prev) => !prev)}
              className="cursor-pointer"
            >
              <div className="flex items-center gap-4">
                <div className="flex items-center justify-between w-full">
                  <div className="flex items-center gap-4">
                    <h2 className="text-primary text-[20px] font-semibold">
                      Product Design Internal Meet
                    </h2>
                    <p className="px-4 bg-[#FFF8E2] py-1 rounded-md w-max flex items-center gap-1">
                      <Image
                        src="/board.svg"
                        width={18}
                        height={18}
                        alt="board"
                      />
                      <span className="inline-block text-[#DFA800]">Board</span>
                    </p>
                    <p className="px-4 bg-[#E8F0FF] py-1 rounded-md w-max">
                      <span className="inline-block text-darkBlue">
                        Recurring
                      </span>
                    </p>
                  </div>
                  <BsChevronDown
                    fontSize={18}
                    className="cursor-pointer text-grayText"
                  />
                </div>
              </div>
              <p className="text-grayText mt-1">
                Facilitated by{" "}
                <span className="italic text-primary font-bold ">
                  {" "}
                  UltiMeeT{" "}
                </span>
              </p>
            </div>
            {/* accordion body  */}
            {toggleAccordion && (
              <div className="bg-[#F5F7F9] p-3 rounded-md">
                <p className="text-grayText mt-4">
                  This internal meeting reviews the product design progress,
                  gathers feedback, and aligns it with project goals. It's a
                  collaborative session to shape the visual direction and
                  enhance the user experience.
                </p>

                <div className="mt-4 flex items-center gap-5">
                  <div className="flex items-center gap-1">
                    <Image
                      src="/task_management.svg"
                      width={18}
                      height={18}
                      className="object-cover"
                      alt="calendar"
                    />
                    <span className="text-primary text-base font-medium">
                      19 June 2023
                    </span>
                  </div>
                  <div className="flex items-center gap-1">
                    <Image
                      src="/time.svg"
                      width={18}
                      height={18}
                      className="object-cover"
                      alt="time"
                    />
                    <span className="text-primary text-base font-medium">
                      8:30 PM
                    </span>
                  </div>
                  <div className="flex items-center gap-1">
                    <Image
                      src="/location.svg"
                      width={18}
                      height={18}
                      className="object-cover"
                      alt="location"
                    />
                    <span className="text-primary text-base font-medium">
                      Remote
                    </span>
                  </div>
                  <div className="flex items-center gap-1">
                    <Image
                      src="/check.svg"
                      width={18}
                      height={18}
                      className="object-cover"
                      alt="check"
                    />
                    <span className="text-primary text-base font-medium">
                      4 action items
                    </span>
                  </div>
                </div>

                <div className="flex items-center justify-between gap-20 mt-5">
                  <div className="flex items-center gap-20">
                    <div className="flex flex-col gap-3">
                      <p className="text-grayText text-base font-medium">
                        Organizer
                      </p>
                      <div className="flex gap-2 items-center">
                        <Image
                          src={profilePic}
                          alt="user"
                          width={30}
                          height={30}
                          className="object-cover rounded-full"
                        />
                        <p className="text-primary text-base font-medium">
                          Jane Miller
                        </p>
                      </div>
                    </div>
                    <div className="flex flex-col gap-3">
                      <p className="text-grayText text-base font-medium">
                        Participants
                      </p>
                      <div className="flex items-center">
                        {userDetails.attend.slice(0, 4).map((user, index) => {
                          return (
                            <UserProfileComp
                              key={index}
                              user={user}
                              index={index}
                            />
                          );
                        })}
                        <p
                          className="w-[30px] h-[30px] bg-[#E8F0FF] text-darkBlue text-xs object-cover rounded-full z-10 border-2 border-white flex items-center justify-center"
                          style={{ marginLeft: "-46px" }}
                        >
                          +{userDetails.attend.length - 4}
                        </p>
                      </div>
                    </div>
                    <div className="flex flex-col gap-3">
                      <p className="text-grayText text-base font-medium">
                        Absent
                      </p>
                      <div className="flex items-center">
                        {userDetails.absent.map((user, index) => {
                          return (
                            <UserProfileComp
                              key={index}
                              user={user}
                              index={index}
                            />
                          );
                        })}
                      </div>
                    </div>
                  </div>
                  <div className="flex flex-col gap-3">
                    <p className="text-grayText text-base font-medium">
                      Organizer
                    </p>
                    <div className="flex items-center">
                      {userDetails.approvedBy.slice(0, 4).map((user, index) => {
                        return (
                          <UserProfileComp
                            key={index}
                            user={user}
                            index={index}
                          />
                        );
                      })}
                      <p
                        className="w-[30px] h-[30px] bg-[#E8F0FF] text-darkBlue text-xs object-cover rounded-full z-10 border-2 border-white flex items-center justify-center"
                        style={{ marginLeft: "-46px" }}
                      >
                        +{userDetails.attend.length - 4}
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            )}
          </div>

          {/* meeting recording and search  */}
          <div className="flex items-center justify-between mt-16">
            <h2 className="text-primary text-base font-semibold">
              Meeting Recording
            </h2>
            <div
              className={`w-[247px] h-9 border border-[#EAEBF0] rounded-sm flex gap-2 items-center`}
            >
              <BsSearch className="ml-3 text-grayText" fontSize={18} />
              <input
                type="search"
                placeholder="Search people or key words"
                className="w-full h-full border-0 outline-none text-xs pl-1"
              />
            </div>
          </div>

          {/* meetings keypoints  */}
          <div
            className={`flex overflow-scroll gap-2 mt-6 ${styles.scrollbarNone}`}
          >
            <div className="flex gap-2">
              {meetingRecoringKeyPoints.map((keypoint, index) => {
                return (
                  <button
                    key={index}
                    className="border border-[#B2BECC] bg-[#0F305705] px-2 py-1 rounded-md  outline-none text-xs text-grayText w-max whitespace-nowrap"
                  >
                    {keypoint}
                  </button>
                );
              })}
            </div>
          </div>

          {/* recordings and user name with their talk time   */}
          <div className="grid grid-flow-col grid-cols-3 mt-6">
            <div className="col-span-2"></div>
            <div className="col-span-1">
              <div className="bg-white border border-[#EAEBF0] rounded-md shadow-sm">
                <ul className="grid grid-flow-col grid-cols-2 text-grayText text-sm border-b border-[#EAEBF0] h-16 place-content-center">
                  <li className="pl-4">Name</li>
                  <li className="pl-4">Talk Time</li>
                </ul>
                <div className={`overflow-scroll h-72 ${styles.scrollNone}`}>
                  {userWithTheirTalkTime.map((user, index) => {
                    return (
                      <ul
                        key={index}
                        className="grid grid-flow-col grid-cols-2 text-grayText text-sm border-b border-[#EAEBF0] h-16 place-content-center"
                      >
                        <li className="text-primary text-base flex items-center gap-2 pl-4">
                          <Image
                            src={user.profilePic}
                            width={28}
                            height={28}
                            className="object-cover rounded-full"
                            alt={user.name}
                          />
                          {user.name}
                        </li>
                        <li className="text-grayText text-base pl-6">
                          {user.talkTime}
                        </li>
                      </ul>
                    );
                  })}
                </div>
              </div>
            </div>
          </div>
          {/* audio player  */}
          <div></div>

          {/* meeting overview  */}
          <MeetingOverview />
        </div>
        <div className="col-span-1 "></div>
      </div>
    </section>
  );
};

export default Minutes;
