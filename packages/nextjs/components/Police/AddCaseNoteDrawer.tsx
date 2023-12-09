import React from "react";
import Drawer from "../drawer/drawer";
import { XMarkIcon } from "@heroicons/react/24/outline";

const AddCaseNoteDrawer = ({
  setIsAddFIRNoteOpen,
  isAddFIRNoteOpen,
}: {
  setIsAddFIRNoteOpen: (isOpen: boolean) => void;
  isAddFIRNoteOpen: boolean;
}) => {
  return (
    <Drawer className="px-3" setShowSidebar={setIsAddFIRNoteOpen} showSidebar={isAddFIRNoteOpen}>
      <div className="flex gap-10  flex-col text-black pl-4  h-full mt-3">
        <div className="flex justify-between w-full  items-center mt-3">
          <h1 className="text-xl font-semibold ">Add FIR Case Note </h1>
          <div
            className=""
            onClick={() => {
              //   resetCreateTaskData();
              setIsAddFIRNoteOpen(false);
            }}
          >
            <XMarkIcon className="h-8 cursor-pointer" />
          </div>
        </div>

        <div className="flex flex-col gap-6">
          <div>
            <p className="text-base font-semibold">Task Name</p>
            <input type="text" className="" />
          </div>
        </div>
      </div>
    </Drawer>
  );
};

export default AddCaseNoteDrawer;
