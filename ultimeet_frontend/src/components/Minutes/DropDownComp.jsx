"use client";

import React, { useState } from "react";
import { Select, Option } from "@material-tailwind/react";
import { profilePic } from "@/constants/data";
import Image from "next/image";

export default function DropDownnComp({ label, list }) {
  const [selectedOptions, setSelectedOptions] = useState(list[0].name);

  const handleCountryChange = (data) => {
    setSelectedOptions(data);
  };

  return (
    <div className="">
      <Select
        size="lg"
        label={label}
        value={selectedOptions}
        onChange={handleCountryChange}
        selected={(element) =>
          element &&
          React.cloneElement(element, {
            className: "flex items-center px-0 gap-2 pointer-events-none",
          })
        }
      >
        {list.map(({ name, profilePic }) => (
          <Option key={name} value={name} className="flex items-center gap-2">
            {profilePic && (
              <Image
                width={26}
                height={26}
                src={profilePic}
                alt={name}
                className="h-5 w-5 rounded-full object-cover"
              />
            )}
            {name}
          </Option>
        ))}
      </Select>
    </div>
  );
}
