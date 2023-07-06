import Image from "next/image";
import React from "react";

const UserProfileComp = ({ profilePhoto ,name, index }) => {
  return (
    <div key={index} className="relative group">
      <p className="absolute text-xs text-grayText -top-5 right-0 w-max bg-white shadow-md rounded-sm px-2 py-2 opacity-0 group-hover:opacity-100 z-10">
        {name}
      </p>
      <Image
        src={profilePhoto}
        alt="user"
        width={30}
        height={30}
        className={`object-cover rounded-full z-${index} border-2 border-white`}
        style={{ marginLeft: `-${index * 35}%` }}
      />
    </div>
  );
};

export default UserProfileComp;
