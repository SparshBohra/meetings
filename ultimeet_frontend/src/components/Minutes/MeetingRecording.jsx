import { useEffect, useState,useRef } from "react";
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

const MeetingRecoring = () => {

    const [meetingRecording, setMeetingRecording] = useState({})
    const [play, setPlay] = useState(false);
    const [playTime, setPlayTime] = useState(0);
    const [duration, setDuration] = useState({})
    const [avatar, setAvatar] = useState(profilePic);
    const [playerTalk, setplayerTalk] = useState([])
    const vidRef = useRef(null);
    const handlePlayVideo = () => {
      vidRef.current.play();
      setPlay(!play)
    }
    const handlePauseVideo = () => {
        vidRef.current.pause();
        setPlay(!play)
    }
    const handleForwardVideo = () => {
        vidRef.current.currentTime +=20;
    }
    const handleBackwardVideo = () => {
        vidRef.current.currentTime -=20;
    }
    const userTalkData = (obj, avatar) =>{
        let data =[]
        obj.map((item)=> {
            let object ={}
            object["time"]=item;
            object["fraction"]=item/(duration*1000).toFixed(2)
            data.push(object)
        })
        setplayerTalk(data)
        setAvatar(avatar)
    }

    const onTimeUpdate = () => {
        let a = vidRef?.current?.currentTime.toFixed(2) || 0;
        let b = vidRef?.current?.duration.toFixed(2) || 1;
        
        let c = (a/b).toFixed(2)
       
        setPlayTime(c) 
    }

    useEffect(() => {
        axiosInstance().get('meeting_summary/meeting/1/users_audio_breakpoints/').then((res) => {
            setMeetingRecording(res.data)
            let b = vidRef?.current?.duration.toFixed(2) || 1;
            setDuration(b)

        }).catch((e) => new Error(e))
        return ()=> {}
    }, [])

    const { meeting_key_labels, users_audio_breakpoints } = meetingRecording;
    return (
        <div className="p-2">
            <div
                className={`flex overflow-scroll gap-2 mt-6 ${styles.scrollbarNone}`}
            >
                <div className="flex gap-2">

                    {meeting_key_labels && meeting_key_labels[0]?.length > 0 ? meeting_key_labels[0].map((keypoint, index) => {
                        return (
                            <button
                                key={index}
                                className="border border-[#B2BECC] bg-[#0F305705] px-2 py-1 rounded-md  outline-none text-xs text-grayText w-max whitespace-nowrap"
                            >
                                {keypoint}
                            </button>
                        );
                    }) : <></>}
                </div>
            </div>
            <div className="grid grid-flow-col grid-cols-3 mt-6">
                <div className="col-span-2 pr-4"   >
                    { !play ?<Image
                        onClick={handlePlayVideo}  
                        className={styles.playButton}
                        src={'./playMedia.svg'}
                        width={28}
                        height={28}

                    />:<></>}
                    <video
                        ref={vidRef}
                        className={styles.videoFrame}
                        poster="./videoThumbnail.png"
                        onTimeUpdate={onTimeUpdate}
                        
                        >

                        <source src="./Panel_Discussion_AI.mp3" type="video/mp4" />
                    </video>
                </div>
                <div className="col-span-1">
                    <div className="bg-white border border-[#EAEBF0] rounded-md shadow-sm">
                        <ul className="grid grid-flow-col grid-cols-2 text-grayText text-sm border-b border-[#EAEBF0] h-16 place-content-center">
                            <li className="pl-4">Name</li>
                            <li className="pl-4">Talk Time</li>
                        </ul>
                        <div className={`overflow-scroll h-72 ${styles.scrollNone}`}>
                            {users_audio_breakpoints?.length > 0 ? users_audio_breakpoints.map((user, index) => {
                                return (
                                    <ul
                                        onClick={()=>userTalkData(user?.audio_breakpoints?.start,user?.avatar)}
                                        key={index}
                                        className={`grid grid-flow-col grid-cols-2 text-grayText text-sm border-b border-[#EAEBF0] h-16 place-content-center ${styles.userTalkData}`}
                                    >
                                        <li  className="text-primary text-base flex items-center gap-2 pl-4 click">
                                            
                                            <Image
                                                src={user?.avatar}
                                                width={28}
                                                height={28}
                                                className="object-cover rounded-full"
                                                alt={user.name}
                                            />
                                            {user.name}
                                        </li>
                                        <li className="text-grayText text-base pl-6">
                                            {`${user.talk_time}%`}
                                        </li>
                                    </ul>
                                );
                            }) : <></>}
                        </div>
                    </div>
                </div>
            </div>
            <div className="bg-white rounded-lg border border-[#EAEBF0] shadow-md mt-8" style={{ paddingTop: '15px' }}>


                <div className="bg-white  rounded-md shadow-sm pl-2 pr-3" style={{ height: '90px' }}>
                    <Seekbar data={playerTalk} time={playTime} avatar={avatar}/>
                    
                    <div class="grid grid-cols-3 gap-4">
                        <div className="..."></div>
                        <div className="...">
                            <div class="grid grid-cols-3 gap-4 p-8" style={{ padding: '20%' }}>
                                <div className={styles.control}>
                                    <div onClick={handleBackwardVideo}><Image
                                        src="/backward.svg"
                                        width={26}
                                        height={26}
                                        className="object-cover"
                                    /></div>
                                    {
                                    play ?
                                        <div onClick={handlePauseVideo}><Image
                                            src="/circle.svg"
                                            width={26}
                                            height={26}
                                            className="object-cover"
                                        /></div>:

                                        <div onClick={handlePlayVideo}><Image
                                            src="/play.svg"
                                            width={26}
                                            height={26}
                                            className="object-cover"
                                        /></div> 
                                    }                                   
                                    <div onClick={handleForwardVideo}><Image
                                        src="/forward.svg"
                                        width={26}
                                        height={26}
                                        className="object-cover"
                                    /></div>
                                </div>
                            </div>
                        </div>
                        <div className="..."></div>
                    </div>
                </div>

            </div>
        </div>
    )
}


export default MeetingRecoring