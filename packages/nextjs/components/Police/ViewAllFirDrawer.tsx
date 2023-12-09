import React from "react";
import Drawer from "../drawer/drawer";
import { XMarkIcon } from "@heroicons/react/24/outline";

const ViewAllFirDrawer = ({
  setIsViewFIROpen,
  isViewFIROpen,
}: {
  setIsViewFIROpen: (isOpen: boolean) => void;
  isViewFIROpen: boolean;
}) => {
  return (
    <Drawer className="px-3" setShowSidebar={setIsViewFIROpen} showSidebar={isViewFIROpen}>
      <div className="flex gap-10  flex-col text-black pl-4  h-full mt-3">
        <div className="flex justify-between w-full  items-center mt-3">
          <h1 className="text-xl font-semibold ">FIR Short Details </h1>
          <div
            className=""
            onClick={() => {
              //   resetCreateTaskData();
              setIsViewFIROpen(false);
            }}
          >
            <XMarkIcon className="h-8 cursor-pointer" />
          </div>
        </div>

        <div className="flex flex-col gap-6">
          <div>
            <p className="text-base font-semibold">Task Name</p>
            <p className="text-blue-600 underline pl-1">Taskname</p>
          </div>

          <div>
            <p className="mb-2 font-semibold text-md">Task description</p>
            <p className="text-blue-600  pl-1">
              {/* {taskToView?.description ? taskToView?.description : "No Description"} */}
              No desc
            </p>
          </div>
        </div>
      </div>
    </Drawer>
  );
};

export default ViewAllFirDrawer;
