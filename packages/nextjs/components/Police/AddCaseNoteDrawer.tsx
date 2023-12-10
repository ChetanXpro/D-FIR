import React from "react";
import Button from "../Button/Button";
import InputField from "../Input/input";
import TextArea from "../TextArea/TextArea";
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

        <div className="flex flex-col justify-between h-full gap-6">
          <div>
            <p className="text-base font-semibold">Task Name</p>
            {/* <InputField label="" name="" type="" placeholder="Enter Case note" /> */}
            <TextArea label="" name="" />
          </div>
          <div className="flex gap-3">
            <div className="flex gap-3 mb-10">
              <Button>Submit</Button>
            </div>
            <div className="flex gap-3 mb-10">
              <Button>Close</Button>
            </div>
          </div>
        </div>
      </div>
    </Drawer>
  );
};

export default AddCaseNoteDrawer;
