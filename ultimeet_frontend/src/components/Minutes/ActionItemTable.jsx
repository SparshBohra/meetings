"use client";
import { Card, Typography } from "@material-tailwind/react";
import styles from "../../app/minutes/minutes.module.css";
import { profilePic } from "@/constants/data";
import { TbLink } from "react-icons/tb";
import { CiEdit } from "react-icons/ci";
import Image from "next/image";
import { useState } from "react";
import EditActionItemsPopup from "./EditActionItemsPopup";

const TABLE_HEAD = [
  "Action Item",
  "Files",
  "Owner",
  "Reporter",
  "Priority",
  "Due on",
  "Status",
  "Actions",
];

const TABLE_ROWS = [
  {
    action_name: "User research feedback analysis",
    action_id: "#132455",
    file: "Figjam",
    owner: "Sushan",
    profilePic: profilePic,
    reporter: "Jessi",
    priority: "Urgent",
    due_on: "24 June 23",
    status: "In Progress",
  },
  {
    action_name: "User research feedback analysis",
    action_id: "#132455",
    file: "Figjam",
    owner: "Sushan",
    profilePic: profilePic,
    reporter: "Jessi",
    priority: "Medium",
    due_on: "24 June 23",
    status: "In Progress",
  },
  {
    action_name: "User research feedback analysis",
    action_id: "#132455",
    file: "Figjam",
    owner: "Sushan",
    profilePic: profilePic,
    reporter: "Jessi",
    priority: "Low",
    due_on: "24 June 23",
    status: "In Progress",
  },
  {
    action_name: "User research feedback analysis",
    action_id: "#132455",
    file: "Figjam",
    owner: "Sushan",
    profilePic: profilePic,
    reporter: "Jessi",
    priority: "Low",
    due_on: "24 June 23",
    status: "In Progress",
  },
  {
    action_name: "User research feedback analysis",
    action_id: "#132455",
    file: "Figjam",
    owner: "Sushan",
    profilePic: profilePic,
    reporter: "Jessi",
    priority: "Urgent",
    due_on: "24 June 23",
    status: "In Progress",
  },
];

export default function ActionItemTable() {
  const [open, setOpen] = useState(false);

  const handleOpen = () => setOpen(!open);

  return (
    <div className="bg-white rounded-lg shadow-md p-8 mt-8">
      <h2 className="text-primary text-lg font-semibold text-inherit pb-3">
        Action Items
      </h2>
      <Card className={`overflow-scroll w-full ${styles.scrollbarNone}`}>
        <table className="w-full min-w-max table-auto text-left">
          <thead>
            <tr>
              {TABLE_HEAD.map((head) => (
                <th
                  key={head}
                  className="border-b border-blue-gray-100 bg-blue-gray-50 p-4"
                >
                  <Typography
                    variant="small"
                    color="blue-gray"
                    className="text-base font-inter leading-none opacity-70"
                  >
                    {head}
                  </Typography>
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {TABLE_ROWS.map(
              (
                {
                  action_name,
                  action_id,
                  file,
                  owner,
                  profilePic,
                  reporter,
                  priority,
                  due_on,
                  status,
                },
                index
              ) => {
                const isLast = index === TABLE_ROWS.length - 1;
                const classes = isLast
                  ? "p-4"
                  : "p-4 border-b border-blue-gray-50";

                return (
                  <tr key={index}>
                    <td className={classes}>
                      <Typography
                        color="blue-gray"
                        className="max-w-[150px] font-inter"
                      >
                        <span className="text-primary text-sm font-medium">
                          {action_name}
                        </span>
                        <br />
                        <span className="text-sm text-[#919BA7] mt-1">
                          {action_id}
                        </span>
                      </Typography>
                    </td>
                    <td className={classes}>
                      <Typography className="font-inter flex items-center gap-2">
                        <TbLink fontSize={16} className="text-primary" />
                        <span className="text-primary text-sm font-medium">
                          {file}
                        </span>
                      </Typography>
                    </td>
                    <td className={classes}>
                      <Typography className=" font-inter flex items-center gap-2">
                        <Image
                          src={profilePic}
                          alt={owner}
                          width={24}
                          height={24}
                          className="rounded-full"
                        />
                        <span className="text-primary text-sm font-medium">
                          {owner}
                        </span>
                      </Typography>
                    </td>
                    <td className={classes}>
                      <Typography className="font-inter flex items-center gap-2">
                        <Image
                          src={profilePic}
                          alt={reporter}
                          width={24}
                          height={24}
                          className="rounded-full"
                        />
                        <span className="text-primary text-sm font-medium">
                          {reporter}
                        </span>
                      </Typography>
                    </td>
                    <td className={classes}>
                      <Typography className="font-inter flex items-center gap-2">
                        <span
                          className={`text-sm px-2 py-1 rounded-sm
                        ${
                          priority === "Urgent" && "text-[#CA0C0C] bg-[#FDEBEB]"
                        }
                        ${
                          priority === "Medium" && "text-[#EEA23E] bg-[#FFF8EB]"
                        }
                        ${priority === "Low" && "text-[#2D8A39] bg-[#F0FAF0]"}
                        `}
                        >
                          {priority}
                        </span>
                      </Typography>
                    </td>
                    <td className={classes}>
                      <Typography className=" font-inter flex items-center gap-2">
                        <span className="text-primary text-sm font-medium">
                          {due_on}
                        </span>
                      </Typography>
                    </td>
                    <td className={classes}>
                      <Typography className=" font-inter flex items-center gap-2">
                        <span className="text-primary text-sm font-medium">
                          {status}
                        </span>
                      </Typography>
                    </td>

                    <td className={classes}>
                      <Typography
                        variant="small"
                        className="text-primary cursor-pointer"
                      >
                        <CiEdit fontSize={18} onClick={handleOpen} />
                      </Typography>
                    </td>
                  </tr>
                );
              }
            )}
          </tbody>
        </table>
      </Card>
      <EditActionItemsPopup open={open} handleOpen={handleOpen} />
    </div>
  );
}
