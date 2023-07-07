"use client";

import {
  Tabs,
  TabsHeader,
  TabsBody,
  Tab,
  TabPanel,
} from "@material-tailwind/react";
import { useEffect, useState } from "react";

import styles from "../../app/minutes/minutes.module.css";
import { BsChevronDown } from "react-icons/bs";
import { profilePic } from "@/constants/data";
import Image from "next/image";
import moment from 'moment';
import { axiosInstance } from '@/api/Axios'
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
    desc: {
      debates: [
        "Debate regarding the preferred design aesthetic for the application, such as minimalist vs. vibrant, modern vs. classic, or flat vs. skeuomorphic design",
        "Different opinions emerged about the optimal placement and organization of key elements in the user interface, such as the menu, buttons, and content sections.",
        "Debate regarding the preferred design aesthetic for the application, such as minimalist vs. vibrant, modern vs. classic, or flat vs. skeuomorphic design",
        "Different opinions emerged about the optimal placement and organization of key elements in the user interface, such as the menu, buttons, and content sections.",
        "Debate regarding the preferred design aesthetic for the application, such as minimalist vs. vibrant, modern vs. classic, or flat vs. skeuomorphic design",
        "Different opinions emerged about the optimal placement and organization of key elements in the user interface, such as the menu, buttons, and content sections.",
        "Debate regarding the preferred design aesthetic for the application, such as minimalist vs. vibrant, modern vs. classic, or flat vs. skeuomorphic design",
        "Different opinions emerged about the optimal placement and organization of key elements in the user interface, such as the menu, buttons, and content sections.",
        "Debate regarding the preferred design aesthetic for the application, such as minimalist vs. vibrant, modern vs. classic, or flat vs. skeuomorphic design",
        "Different opinions emerged about the optimal placement and organization of key elements in the user interface, such as the menu, buttons, and content sections.",
        "Debate regarding the preferred design aesthetic for the application, such as minimalist vs. vibrant, modern vs. classic, or flat vs. skeuomorphic design",
        "Different opinions emerged about the optimal placement and organization of key elements in the user interface, such as the menu, buttons, and content sections.",
        "Debate regarding the preferred design aesthetic for the application, such as minimalist vs. vibrant, modern vs. classic, or flat vs. skeuomorphic design",
        "Different opinions emerged about the optimal placement and organization of key elements in the user interface, such as the menu, buttons, and content sections.",
        "Debate regarding the preferred design aesthetic for the application, such as minimalist vs. vibrant, modern vs. classic, or flat vs. skeuomorphic design",
        "Different opinions emerged about the optimal placement and organization of key elements in the user interface, such as the menu, buttons, and content sections.",
      ],
      questions: [
        "John asked, “How can we ensure that the user interface is intuitive and easy to navigate for both new and experienced users?”",
        "Steve asked, “What techniques can we use to streamline the onboarding process and make it easier for new users to get started?”",
        "John asked, “How can we ensure that the user interface is intuitive and easy to navigate for both new and experienced users?”",
        "Steve asked, “What techniques can we use to streamline the onboarding process and make it easier for new users to get started?”",
        "John asked, “How can we ensure that the user interface is intuitive and easy to navigate for both new and experienced users?”",
        "Steve asked, “What techniques can we use to streamline the onboarding process and make it easier for new users to get started?”",
        "John asked, “How can we ensure that the user interface is intuitive and easy to navigate for both new and experienced users?”",
        "Steve asked, “What techniques can we use to streamline the onboarding process and make it easier for new users to get started?”",
        "John asked, “How can we ensure that the user interface is intuitive and easy to navigate for both new and experienced users?”",
        "Steve asked, “What techniques can we use to streamline the onboarding process and make it easier for new users to get started?”",
        "John asked, “How can we ensure that the user interface is intuitive and easy to navigate for both new and experienced users?”",
        "Steve asked, “What techniques can we use to streamline the onboarding process and make it easier for new users to get started?”",
        "John asked, “How can we ensure that the user interface is intuitive and easy to navigate for both new and experienced users?”",
        "Steve asked, “What techniques can we use to streamline the onboarding process and make it easier for new users to get started?”",
        "John asked, “How can we ensure that the user interface is intuitive and easy to navigate for both new and experienced users?”",
        "Steve asked, “What techniques can we use to streamline the onboarding process and make it easier for new users to get started?”",
        "John asked, “How can we ensure that the user interface is intuitive and easy to navigate for both new and experienced users?”",
        "Steve asked, “What techniques can we use to streamline the onboarding process and make it easier for new users to get started?”",
        "John asked, “How can we ensure that the user interface is intuitive and easy to navigate for both new and experienced users?”",
        "Steve asked, “What techniques can we use to streamline the onboarding process and make it easier for new users to get started?”",
        "John asked, “How can we ensure that the user interface is intuitive and easy to navigate for both new and experienced users?”",
        "Steve asked, “What techniques can we use to streamline the onboarding process and make it easier for new users to get started?”",
      ],
      solutions: [
        "Bella suggested, “Implement a clear and intuitive navigation menu with logical categorization to facilitate easy exploration of the application.”",
        "Mike suggested, “Create interactive prototypes to validate design concepts and gather early user feedback before proceeding with full development.”",
        "Bella suggested, “Implement a clear and intuitive navigation menu with logical categorization to facilitate easy exploration of the application.”",
        "Mike suggested, “Create interactive prototypes to validate design concepts and gather early user feedback before proceeding with full development.”",
        "Bella suggested, “Implement a clear and intuitive navigation menu with logical categorization to facilitate easy exploration of the application.”",
        "Mike suggested, “Create interactive prototypes to validate design concepts and gather early user feedback before proceeding with full development.”",
        "Bella suggested, “Implement a clear and intuitive navigation menu with logical categorization to facilitate easy exploration of the application.”",
        "Mike suggested, “Create interactive prototypes to validate design concepts and gather early user feedback before proceeding with full development.”",
        "Bella suggested, “Implement a clear and intuitive navigation menu with logical categorization to facilitate easy exploration of the application.”",
        "Mike suggested, “Create interactive prototypes to validate design concepts and gather early user feedback before proceeding with full development.”",
        "Bella suggested, “Implement a clear and intuitive navigation menu with logical categorization to facilitate easy exploration of the application.”",
        "Mike suggested, “Create interactive prototypes to validate design concepts and gather early user feedback before proceeding with full development.”",
        "Bella suggested, “Implement a clear and intuitive navigation menu with logical categorization to facilitate easy exploration of the application.”",
        "Mike suggested, “Create interactive prototypes to validate design concepts and gather early user feedback before proceeding with full development.”",
        "Bella suggested, “Implement a clear and intuitive navigation menu with logical categorization to facilitate easy exploration of the application.”",
        "Mike suggested, “Create interactive prototypes to validate design concepts and gather early user feedback before proceeding with full development.”",
        "Bella suggested, “Implement a clear and intuitive navigation menu with logical categorization to facilitate easy exploration of the application.”",
        "Mike suggested, “Create interactive prototypes to validate design concepts and gather early user feedback before proceeding with full development.”",
        "Bella suggested, “Implement a clear and intuitive navigation menu with logical categorization to facilitate easy exploration of the application.”",
        "Mike suggested, “Create interactive prototypes to validate design concepts and gather early user feedback before proceeding with full development.”",
        "Bella suggested, “Implement a clear and intuitive navigation menu with logical categorization to facilitate easy exploration of the application.”",
        "Mike suggested, “Create interactive prototypes to validate design concepts and gather early user feedback before proceeding with full development.”",
        "Bella suggested, “Implement a clear and intuitive navigation menu with logical categorization to facilitate easy exploration of the application.”",
        "Mike suggested, “Create interactive prototypes to validate design concepts and gather early user feedback before proceeding with full development.”",
      ],
    },
  },
];

export default function MeetingOverview() {
  const [activeTab, setActiveTab] = useState("transcript");
  const [meetingShow, setMeetingShow] = useState(true);
  const [transcript, setTranscript] = useState({})
  const [summary, setSummary] = useState({})
  useEffect(()=>{

    axiosInstance().get("recording_transcription/transcription_view/3/").then((res)=>{
      setTranscript(res?.data?.transcript)
    
    }).catch(e=>  new Error(e))


    axiosInstance().get("meeting_summary/meeting/23/summary_view/").then((res)=>{
      setSummary(res?.data)
      console.log(res.data)
    
    }).catch(e=>  new Error(e))
  },[])

  //const { transcript_data } = transcript;
  return (
    <div className="bg-white rounded-lg shadow-md p-8 mt-8">
      <div
        className="flex items-center justify-between cursor-pointer"
        onClick={() => setMeetingShow((prev) => !prev)}
      >
        <h2 className="text-primary text-lg font-semibold text-inherit">
          Jason’s Meeting Overview
        </h2>
        <BsChevronDown
          fontSize={18}
          className={`cursor-pointer text-grayText ${
            meetingShow ? "rotate-180" : "rotate-0"
          }`}
        />
      </div>
      {meetingShow && (
        <Tabs value={activeTab} className="mt-5">
          <TabsHeader className="bg-white shadow-none flex gap-8" style={{height:'40px'}}>
            {data.map(({ label, value }) => {
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
                { 
                transcript.length > 0 ? transcript.map((item, index) => {
                  return (
                    <div
                      key={index}
                      style={{
                        fontFamily: "Inter",
                      }}
                    >
                      <p className="text-[#919BA7] text-base py-2 text-medium" style={{fontSize:'13px'}}>
                        {moment.utc(item.start_time*1000).format('mm:ss')} - {moment.utc(item.end_time*1000).format('mm:ss')} : {item.speaker}
                      </p>
                      <div className="flex  gap-3 py-2 pb-3">
                        <Image
                          src={item.avatar}
                          width={28}
                          height={28}
                          style={{width:"28px", height:'28px'}}
                          alt={"speaker"}
                          className="rounded-full"
                        />
                        <p className={`text-primary text-base font-medium ${styles.summaryText}`}>
                          {item?.text}
                        </p>
                      </div>
                    </div>
                  );
                }):<></>}
              </div>
            </TabPanel>
            <TabPanel value={"conversationSummary"}>
              <div className={`${styles.summaryText}`}>
                {
                 summary?.summary
                }
                {/* <div
                  style={{
                    fontFamily: "Inter",
                  }}
                >
                  <p className="text-primary text-base py-2 font-medium">
                    Debate
                  </p>
                  <div className="flex items-center gap-3 py-1 pb-3">
                    <ul>
                      {data[1].desc.debates.map((points, index) => {
                        return (
                          <ol
                            key={index}
                            className="text-grayText text-base py-1 flex "
                          >
                            <p className="mr-2">{index + 1}</p>
                            {points} .
                          </ol>
                        );
                      })}
                    </ul>
                  </div>
                </div>
                <div
                  style={{
                    fontFamily: "Inter",
                  }}
                >
                  <p className="text-primary text-base py-2 font-medium">
                    Questions
                  </p>
                  <div className="flex items-center gap-3 py-1 pb-3">
                    <ul>
                      {data[1].desc.questions.map((points, index) => {
                        return (
                          <ol
                            key={index}
                            className="text-grayText text-base py-1 flex "
                          >
                            <p className="mr-2">{index + 1}</p>
                            {points} .
                          </ol>
                        );
                      })}
                    </ul>
                  </div>
                </div>
                <div
                  style={{
                    fontFamily: "Inter",
                  }}
                >
                  <p className="text-primary text-base py-2 font-medium">
                    Solutions
                  </p>
                  <div className="flex items-center gap-3 py-1 pb-3">
                    <ul>
                      {data[1].desc.solutions.map((points, index) => {
                        return (
                          <ol
                            key={index}
                            className="text-grayText text-base py-1 flex "
                          >
                            <p className="mr-2">{index + 1}</p>
                            {points} .
                          </ol>
                        );
                      })}
                    </ul>
                  </div>
                </div> */}
              </div>
            </TabPanel>
          </TabsBody>
        </Tabs>
      )}
    </div>
  );
}
