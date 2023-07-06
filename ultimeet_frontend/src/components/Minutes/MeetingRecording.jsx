import { useEffect, useState } from "react";
import Seekbar from "../Seekbar/Seekbar";
import styles from "../../app/minutes/minutes.module.css"
import { axiosInstance } from '@/api/Axios'
import Image from "next/image";
import {
    meetingRecoringKeyPoints,
    notesAndComments,
    profilePic,
    userDetails,
    userWithTheirTalkTime,
  } from "@/constants/data";
const MeetingRecoring = () =>{

    const [meetingRecording, setMeetingRecording] = useState({})

    useEffect(() => {
        axiosInstance().get('meeting_summary/meeting/1/users_audio_breakpoints/').then((res) => {
            setMeetingRecording(res.data)
    
        }).catch((e) => new Error(e))
      }, [])
    return(
        <div className="p-2">
        <div className="grid grid-flow-col grid-cols-3 mt-6">
            <div className="col-span-2 pr-4"   >
              <video className={styles.videoFrame}>
                <source src="http://commondatastorage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4" type="video/mp4"/>
              </video>
            </div>
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
          <div className="bg-white rounded-lg border border-[#EAEBF0] shadow-md pt-2  mt-8">
            

            <div className="bg-white  rounded-md shadow-sm pl-2 pr-2" style={{height:'120px'}}>
            <Seekbar/>
            </div>

          </div>
        </div>
    )
}


 export default MeetingRecoring