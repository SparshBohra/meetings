import { Fragment } from "react";
import {
  Button,
  Dialog,
  DialogHeader,
  DialogBody,
  DialogFooter,
  Typography,
  Input,
} from "@material-tailwind/react";

import { TbLink } from "react-icons/tb";

import styles from "../../app/minutes/minutes.module.css";
import { IoCloseSharp } from "react-icons/io5";
import DropDownnComp from "./DropDownComp";
import {
  ownerList,
  priorityList,
  reporterList,
  statusList,
} from "@/constants/data";

/*
{owner, reporter, priority, due_on, status}
*/

export default function EditActionItemsPopup({ open, handleOpen, owner, reporter, priority, due_on, status }) {
  return (
    <Fragment>
      <Dialog open={open} handler={handleOpen} size="sm">
        <DialogBody
          className={`h-[36rem] overflow-scroll p-5 ${styles.scrollNone}`}
        >
          <div className="flex items-center justify-between">
            <h2 className="text-primary text-lg font-inter">Action Items</h2>
            <IoCloseSharp
              className="text-primary cursor-pointer"
              fontSize={24}
              onClick={handleOpen}
            />
          </div>
          <div className="mt-5">
            <h3
              className="text-primary text-lg font-medium"
              style={{
                fontFamily: "Inter",
              }}
            >
              User research feedback analysis
            </h3>
            <p
              className="text-[#919BA7] text-sm"
              style={{
                fontFamily: "Inter",
              }}
            >
              #132455
            </p>
          </div>
          <div className="flex items-center justify-between mt-5">
            <div
              className="flex items-center gap-2"
              style={{
                fontFamily: "Inter",
              }}
            >
              <TbLink fontSize={20} className="text-primary" />
              <p className="text-primary text-base font-medium">Figjam</p>
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
          <form className="mt-6">
            <div className="grid grid-flow-col grid-cols-2 gap-8">
              <DropDownnComp label="Owner" list={ownerList} />
              <DropDownnComp label="Reporter" list={reporterList} />
            </div>
            <div className="grid grid-flow-col grid-cols-2 gap-8 mt-6">
              <div className="col-span-1">
                <DropDownnComp label="Priority" list={priorityList} />
              </div>
              <Input type="date" label="Due on" className="col-span-1" />
            </div>
            <div className="grid grid-flow-col grid-cols-2 gap-8 mt-6">
              <div className="col-span-1">
                <DropDownnComp label="Status" list={statusList} />
              </div>
            </div>
            <div className="mt-6">
              <label
                className="text-primary text-base py-1 pb-2"
                style={{
                  fontFamily: "Inter",
                }}
              >
                Dependencies
              </label>
              <Input type="text" label="Dependencies" className="" />
            </div>
            <div className="mt-6">
              <label
                className="text-primary text-base py-1 pb-2"
                style={{
                  fontFamily: "Inter",
                }}
              >
                Comments
              </label>
              <Input type="text" label="Comments" className="" />
            </div>
          </form>
        </DialogBody>
        <DialogFooter className="space-x-2">
          <Button
            className="text-primary border border-slate-400 capitalize text-base bg-white"
            onClick={handleOpen}
          >
            Cancel
          </Button>
          <Button
            className="bg-darkBlue text-white text-base capitalize"
            onClick={handleOpen}
          >
            Save
          </Button>
        </DialogFooter>
      </Dialog>
    </Fragment>
  );
}
