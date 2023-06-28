"use client";

import {
  Tabs,
  TabsHeader,
  TabsBody,
  Tab,
  TabPanel,
} from "@material-tailwind/react";
import { useState } from "react";

import styles from "../../app/minutes/minutes.module.css";
import { BsChevronDown } from "react-icons/bs";
import { profilePic } from "@/constants/data";
import Image from "next/image";

const data = [
  {
    label: "Transcript",
    value: "transcript",
    desc: [
      {
        time: "6:34",
        status: "Meeting Starts",
        profilePic,
        message:
          "Good morning, everyone. Let's begin our discussion on the product design updates.",
      },
      {
        time: "12:12",
        status: " Design concept presentation",
        profilePic,
        message:
          "I would like to present the design concepts we've developed so far. Here are three options for consideration.",
      },
      {
        time: "12:12",
        status: "Feedback from the team",
        profilePic,
        message:
          "Jason, could you clarify the rationale behind the color scheme in the second design option?",
      },
      {
        time: "6:34",
        status: "Meeting Starts",
        profilePic,
        message:
          "Good morning, everyone. Let's begin our discussion on the product design updates.",
      },
      {
        time: "12:12",
        status: " Design concept presentation",
        profilePic,
        message:
          "I would like to present the design concepts we've developed so far. Here are three options for consideration.",
      },
      {
        time: "12:12",
        status: "Feedback from the team",
        profilePic,
        message:
          "Jason, could you clarify the rationale behind the color scheme in the second design option?",
      },
      {
        time: "6:34",
        status: "Meeting Starts",
        profilePic,
        message:
          "Good morning, everyone. Let's begin our discussion on the product design updates.",
      },
      {
        time: "12:12",
        status: " Design concept presentation",
        profilePic,
        message:
          "I would like to present the design concepts we've developed so far. Here are three options for consideration.",
      },
      {
        time: "12:12",
        status: "Feedback from the team",
        profilePic,
        message:
          "Jason, could you clarify the rationale behind the color scheme in the second design option?",
      },
      {
        time: "6:34",
        status: "Meeting Starts",
        profilePic,
        message:
          "Good morning, everyone. Let's begin our discussion on the product design updates.",
      },
      {
        time: "12:12",
        status: " Design concept presentation",
        profilePic,
        message:
          "I would like to present the design concepts we've developed so far. Here are three options for consideration.",
      },
      {
        time: "12:12",
        status: "Feedback from the team",
        profilePic,
        message:
          "Jason, could you clarify the rationale behind the color scheme in the second design option?",
      },
    ],
  },
  {
    label: "Detailed Conversation Summary",
    value: "conversationSummary",
    desc: `Because it's about motivating the doers. Because I'm here
      to follow my dreams and inspire other people to follow their dreams, too.`,
  },
];

export default function MeetingOverview() {
  const [activeTab, setActiveTab] = useState("transcript");
  const [meetingShow, setMeetingShow] = useState(true);

  return (
    <div className="bg-white rounded-lg shadow-md p-8 mt-8">
      <div
        className="flex items-center justify-between cursor-pointer"
        onClick={() => setMeetingShow((prev) => !prev)}
      >
        <h2 className="text-primary text-lg font-semibold text-inherit">
          Jason’s Meeting Overview
        </h2>
        <BsChevronDown fontSize={18} className="cursor-pointer text-grayText" />
      </div>
      {meetingShow && (
        <Tabs value={activeTab} className="mt-5">
          <TabsHeader className="bg-white shadow-none flex gap-8">
            {data.map(({ label, value }) => {
              console.log(activeTab, value);
              return (
                <Tab
                  onClick={() => setActiveTab(value)}
                  key={value}
                  value={value}
                  className={`
                  ${
                    activeTab === value
                      ? "text-blue-500  shadow-none border-0 rounded-none border-b border-[#437EF7] "
                      : ""
                  }
                    w-max px-8 ${styles.tabBg}
                `}
                >
                  {label}
                </Tab>
              );
            })}
          </TabsHeader>
          <TabsBody className="border-t border-[#e7e9eb]">
            <TabPanel value={"transcript"}>
              <div className={`${styles.transcriptContainer}`}>
                {data[0].desc.map((item, index) => {
                  return (
                    <div
                      key={index}
                      style={{
                        fontFamily: "Inter",
                      }}
                    >
                      <p className="text-[#919BA7] text-base py-2 text-medium">
                        {item.time} - {item.status}
                      </p>
                      <div className="flex items-center gap-3 py-2 pb-3">
                        <Image
                          src={item.profilePic}
                          width={28}
                          height={28}
                          className="rounded-full object-cover"
                        />
                        <p className="text-primary text-base font-medium">
                          {item.message}
                        </p>
                      </div>
                    </div>
                  );
                })}
              </div>
            </TabPanel>
          </TabsBody>
        </Tabs>
      )}
    </div>
  );
}
