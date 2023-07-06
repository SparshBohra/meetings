"use client";

import React, { useEffect, useState } from "react";
import styles from "./minutes.module.css";

import {
  meetingRecoringKeyPoints,
  notesAndComments,
  profilePic,
  userDetails,
  userWithTheirTalkTime,
} from "@/constants/data";
import Image from "next/image";
import UserProfileComp from "@/components/Minutes/UserProfileComp";
import { BsChevronDown, BsInfoCircle, BsSearch } from "react-icons/bs";
import MeetingOverview from "@/components/Minutes/MeetingOverview";
import ActionItemTable from "@/components/Minutes/ActionItemTable";
import ColorChangingProgressBar from "@/components/Minutes/ColorChangingProgressbar";
import { axiosInstance } from '@/api/Axios'
import moment from 'moment';
import MeetingRecoring from "@/components/Minutes/MeetingRecording";
const Minutes = () => {
  const [toggleAccordion, setToggleAccordion] = useState(true);
  const [meetingOverview, setMeetingOverview] = useState({})
  useEffect(() => {
    axiosInstance().get('recording_transcription/get_meeting/1/').then((res) => {
      setMeetingOverview(res.data)

    }).catch((e) => new Error(e))
  }, [])
  const {
    meeting_title, meeting_from,
    meeting_to, meeting_organizer,
    meeting_type,
    meeting_channel,
    meeting_nature,
    participants_list,
    action_item_approved_by_list,
    absents_list,
    meeting_description,
    meeting_location,
    meeting_action_items_count } = meetingOverview
  return (
    <section className="ml-[280px] p-12 bg-bgColor  mt-[70px]" style={{ paddingRight: '20px' }}>
      <div className="grid grid-flow-col grid-cols-3">
        <div className="col-span-2 ">
          <div
            className={`rounded-md p-4 border-l-[6px] border-[#b37d33] border-r-0 ${styles.borderGradient} ${styles.borderGradient2}`}
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
                      {meeting_title}
                    </h2>
                    <p className="px-4 bg-[#FFF8E2] py-1 rounded-md w-max flex items-center gap-1">
                      <Image
                        src="/board.svg"
                        width={18}
                        height={18}
                        alt="board"
                      />
                      <span className="inline-block text-[#DFA800]">{meeting_nature}</span>
                    </p>
                    <p className="px-4 bg-[#E8F0FF] py-1 rounded-md w-max">
                      <span className="inline-block text-darkBlue">
                        {meeting_type}
                      </span>
                    </p>
                  </div>
                  <BsChevronDown
                    fontSize={18}
                    className={`cursor-pointer text-grayText ${toggleAccordion ? "rotate-180" : "rotate-0"
                      }`}
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
                  {meeting_description}
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
                      {`${moment(new Date(meeting_from).getTime()).format('DD MMMM  YYYY')}`}
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
                      {`${moment(new Date(meeting_from).getTime()).format('hh:mm a')}`}
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
                      {meeting_location}
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
                      {meeting_action_items_count}
                    </span>
                  </div>
                </div>

                <div className="flex items-center justify-between gap-20 mt-5">
                  <div className="flex items-center gap-20">
                    <div className="flex flex-col gap-3">
                      <p style={{ fontSize: '12px' }} className="text-grayText text-base font-medium">
                        Organizer
                      </p>
                      <div className="flex gap-2 items-center">
                        <Image
                          src={profilePic}
                          alt="user"
                          width={30}
                          height={30}
                          className={`object-cover rounded-full z-0 border-2 border-white`}
                          style={{ marginLeft: `-${0 * 35}%` }}
                        />
                        <p className="text-primary text-base font-medium">
                          {meeting_organizer?.username}
                        </p>
                      </div>
                    </div>
                    <div className="flex flex-col gap-3">
                      <p style={{ fontSize: '12px' }} className="text-grayText text-base font-medium">
                        Participants
                      </p>
                      <div className="flex items-center">
                        {participants_list?.slice(0, 4).map((user, index) => {
                          return (
                            <UserProfileComp
                              key={index}
                              profilePhoto={user?.profile_picture}
                              name={user?.name}
                              index={index}
                            />
                          );
                        })}
                        {participants_list?.length > 4 ?
                          <p
                            className="w-[30px] h-[30px] bg-[#E8F0FF] text-darkBlue text-xs object-cover rounded-full z-10 border-2 border-white flex items-center justify-center"
                            style={{ marginLeft: "-46px" }}
                          >
                            +{participants_list?.length - 4}
                          </p> : <></>
                        }
                      </div>
                    </div>
                    <div className="flex flex-col gap-3">
                      <p style={{ fontSize: '12px' }} className="text-grayText text-base font-medium">
                        Absent
                      </p>
                      <div className="flex items-center">
                        {absents_list?.slice(0, 4).map((user, index) => {
                          return (
                            <UserProfileComp
                              key={index}
                              profilePhoto={user?.profile_picture}
                              name={user?.name}
                              index={index}
                            />
                          );
                        })}
                        {absents_list?.length > 4 ?
                          <p
                            className="w-[30px] h-[30px] bg-[#E8F0FF] text-darkBlue text-xs object-cover rounded-full z-10 border-2 border-white flex items-center justify-center"
                            style={{ marginLeft: "-46px" }}
                          >
                            +{absents_list?.length - 4}
                          </p> : <></>
                        }
                      </div>
                    </div>
                  </div>
                  <div className="flex flex-col gap-3">
                    <p style={{ fontSize: '12px' }} className="text-grayText text-base font-small">
                      Action item approved by
                    </p>
                    <div className="flex items-center">
                      {action_item_approved_by_list?.slice(0, 4).map((user, index) => {
                        console.log("APO", user)
                        return (
                          <UserProfileComp
                            key={index}
                            profilePhoto={user?.profile_picture}
                            name={"oi"}
                            index={index}
                          />
                        );
                      })}
                      {action_item_approved_by_list?.length > 4 ?
                        <p
                          className="w-[30px] h-[30px] bg-[#E8F0FF] text-darkBlue text-xs object-cover rounded-full z-10 border-2 border-white flex items-center justify-center"
                          style={{ marginLeft: "-46px" }}
                        >
                          +{action_item_approved_by_list?.length - 4}
                        </p> : <></>
                      }
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
          <MeetingRecoring/>
          {/* audio player  */}
          <div></div>

          {/* meeting overview  */}
          <MeetingOverview />

          {/* action items table  */}
          <ActionItemTable />
        </div>
        <div
          className="col-span-1"
          style={{
            fontFamily: "Inter",
            padding: '16px'
          }}
        >
          {/* scheduled meetings  */}
          <div className="p-8 rounded-md shadow">
            <h1 className="text-primary text-xl pb-2 font-semibold">
              Next scheduled meeting
            </h1>
            <div className="p-3 rounded-sm bg-[#EAEBF080] flex items-center gap-3 cursor-pointer">
              <div className="w-10 h-10 rounded-full flex items-center justify-center bg-white">
                <Image
                  src="/g_meet.png"
                  width={26}
                  height={26}
                  className="object-cover"
                />
              </div>
              <div
                style={{
                  fontFamily: "Inter",
                }}
              >
                <p className="text-grayText text-base">
                  Mar 27, 12:00 pm - 1:00 pm
                </p>
                <p className="text-primary text-base">Join with google meet</p>
              </div>
            </div>
            <div className="flex items-end justify-between mt-4">
              <div>
                <p className="text-grayText pb-2 text-base font-medium">
                  Participants
                </p>
                <div className="flex items-center">
                  {userDetails.attend.slice(0, 4).map((user, index) => {
                    return (
                      <UserProfileComp key={index} user={user} index={index} />
                    );
                  })}
                </div>
              </div>

              <div>
                <label
                  htmlFor="attachment"
                  className="text-[#2161D1] text-base cursor-pointer"
                >
                  + Add attachment
                </label>
                <input type="file" id="attachment" className="hidden" />
              </div>
            </div>
          </div>

          {/* notes and comments  */}
          <div className="p-8 rounded-md shadow mt-8 ">
            <h1 className="text-primary text-xl font-semibold">
              Notes and Comments
            </h1>
            <p className="text-grayText text-base">
              {notesAndComments.length} Comments
            </p>
            <div className={`h-96 overflow-scroll my-4 ${styles.scrollStyle}`}>
              {notesAndComments.map((comment, index) => {
                return (
                  <div
                    className="py-4 border-b border-slate-300 last:border-none pr-2"
                    key={index}
                    style={{
                      fontFamily: "Inter",
                    }}
                  >
                    <div className="flex items-center gap-2">
                      <Image
                        src={comment.profilePic}
                        alt={comment.name}
                        width={28}
                        height={28}
                        className="rounded-full object-cover"
                      />
                      <p className="text-primary text-base font-medium">
                        {comment.name}
                      </p>
                    </div>
                    <p className="mt-2 text-grayText text-base font-medium">
                      {comment.comment}
                    </p>
                  </div>
                );
              })}
            </div>
          </div>

          {/* meeting health  */}

          <div className="p-8 rounded-md shadow mt-8 ">
            <h1 className="text-primary text-xl font-semibold flex items-center">
              Overall Meeting Health{" "}
              <BsInfoCircle
                fontSize={20}
                className="text-primary ml-3 cursor-pointer"
              />
            </h1>

            <div className="mt-4">
              <div className="flex items-center gap-4">
                <h1 className="text-primary font-bold text-[28px]">Fair</h1>
                <div></div>
              </div>
              <p className="text-grayText text-base font-medium pt-1">
                Last updated on 22 Jun
              </p>
            </div>

            <div className="mt-4">
              <h1 className="text-primary text-lg font-medium flex items-center">
                Success Rate
                <BsInfoCircle
                  fontSize={16}
                  className="text-primary ml-3 cursor-pointer"
                />
              </h1>
              <div className="mt-4">
                <div className="flex items-center gap-4">
                  <div>
                    <h1 className="text-primary font-medium text-lg">75%</h1>
                    <p className="text-grayText text-base font-medium pt-1">
                      Last updated on 22 Jun
                    </p>
                  </div>
                  <div></div>
                </div>
              </div>
            </div>
            <div className="mt-4">
              <h1 className="text-primary text-lg font-medium flex items-center">
                Engagement
                <BsInfoCircle
                  fontSize={16}
                  className="text-primary ml-3 cursor-pointer"
                />
              </h1>
              <div className="mt-4">
                <div className="flex items-center gap-6">
                  <div>
                    <h1 className="text-primary font-medium text-lg">87%</h1>
                    <p className="text-grayText text-base font-medium pt-1">
                      Last updated on 22 Jun
                    </p>
                  </div>
                  <div className="flex items-center gap-4">
                    <ColorChangingProgressBar
                      percentage={80}
                      color={"#B91d1d"}
                    />
                    <ColorChangingProgressBar
                      percentage={50}
                      color={"#0066ff"}
                    />
                  </div>
                </div>
              </div>
            </div>
            <div className="mt-4">
              <h1 className="text-primary text-lg font-medium flex items-center">
                Meeting Efficiency
                <BsInfoCircle
                  fontSize={16}
                  className="text-primary ml-3 cursor-pointer"
                />
              </h1>
              <div className="mt-4">
                <div className="flex items-center gap-4">
                  <div>
                    <h1 className="text-primary font-medium text-lg">75%</h1>
                    <p className="text-grayText text-base font-medium pt-1">
                      Last updated on 22 Jun
                    </p>
                  </div>
                  <div></div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Minutes;
