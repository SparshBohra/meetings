import React from "react";
import { CircularProgressbar, buildStyles } from "react-circular-progressbar";
import "react-circular-progressbar/dist/styles.css";
import Image from "next/image"; // Assuming you're using Next.js and have the `next/image` package installed
import { profilePic } from "@/constants/data";

const ColorChangingProgressBar = ({ percentage, color }) => {
  return (
    <div className="flex items-center flex-col justify-center">
      <div className="w-12 h-12">
        <CircularProgressbar
          value={percentage}
          styles={buildStyles({
            textColor: "#000",
            pathColor: color,
            trailColor: "#d6d6d6",
          })}
          className="flex items-center justify-center"
          style={{
            transition: "stroke 0.5s ease-in-out",
          }}
        />
        <Image
          src={profilePic}
          alt="user"
          width={44}
          height={44}
          className="w-9 h-9 rounded-full object-cover top-0 -mt-[42px] ml-[6px]"
        />
      </div>
      <p className="text-primary my-1 text-base font-medium">{percentage}%</p>
    </div>
  );
};

export default ColorChangingProgressBar;
