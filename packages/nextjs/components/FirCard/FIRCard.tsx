import React, { useEffect, useState } from "react";
import { firToEditAtom } from "../../atoms/atoms";
// import { TaskEnum, TaskPriorityEnum, TaskPriorityMap, TaskStatusList, TaskStatusMap } from "../../constants/consts";
import { cn } from "../../utils/utils";
import Select from "../Select";
import { useAtom } from "jotai";
import { FIRStatusList } from "~~/utils/constant";

interface Props {
  isEditTaskDrawerOpen: boolean;
  setTaskToEdit: (task: any) => void;
  taskToEdit: any;
  task: {
    firID: string;
    firName: string;
    firshortdescription: string;
  };

  setIsEditTaskDrawerOpen: (isOpen: boolean) => void;

  isViewTaskDrawerOpen: boolean;
  setIsViewTaskDrawerOpen: (open: boolean) => void;
}

const TaskCard = ({
  task,

  setIsEditTaskDrawerOpen,

  isViewTaskDrawerOpen,
  setIsViewTaskDrawerOpen,

  isEditTaskDrawerOpen,
}: Props) => {
  const [, setTaskToEdit] = useAtom(firToEditAtom);
  //   const [, setTaskToView] = useAtom(firToViewAtom);

  const [actionButton, setActionButton] = React.useState(false);
  const [markbutton, setMarkButton] = useState(false);
  const actiondropdownRef = React.useRef<HTMLDivElement>(null);

  const handleClickOutside = (e: any) => {
    if (actiondropdownRef.current && !actiondropdownRef.current.contains(e.target)) {
      setActionButton(false);
    }
  };

  useEffect(() => {
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  return (
    <div
      className={`
        "flex sticky-note flex-col rounded-lg   bg-gray-400 text-black  w-40 h-56  md:flex-row`}
    >
      <div className="flex flex-col gap-3  justify-between  h-full ">
        <div className="h-full">
          <div className=" w-full flex h-full flex-col ">
            <h5 className=" text-base font-medium text-neutral-900 gap-2 ">
              {task.taskName.length > 0
                ? task.taskName.length > 25
                  ? task.taskName.slice(0, 25) + "..."
                  : task.taskName
                : "..."}
            </h5>
            <p className=" text-sm h-full overflow-scroll  flex-1 text-neutral-600 ">
              {task.description.length > 0
                ? task.description.length > 60
                  ? task.description.slice(0, 60) + "..."
                  : task.description
                : "No Description"}
            </p>
          </div>
        </div>
        {/* <p className=""></p> */}
        <div className="flex flex-col gap-5 ">
          <div className=" flex items-center  gap-3 ">
            <div ref={actiondropdownRef} className="flex  relative ">
              <button
                onClick={e => {
                  e.stopPropagation();
                  setActionButton(!actionButton);
                }}
                className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-3 py-2 text-center inline-flex items-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
                type="button"
              >
                Action
                <svg
                  className="w-2.5 h-2.5 ml-2.5"
                  aria-hidden="true"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 10 6"
                >
                  <path
                    stroke="currentColor"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="m1 1 4 4 4-4"
                  />
                </svg>
              </button>
              {actionButton && (
                <div
                  id="dropdown"
                  className=" absolute z-50  top-11 bg-white divide-y divide-gray-100 rounded-lg shadow w-44 "
                >
                  <ul className="py-2 text-sm text-gray-700 " aria-labelledby="dropdownDefaultButton">
                    <li>
                      <div
                        onClick={() => {
                          setTaskToEdit(task);
                          setIsEditTaskDrawerOpen(!isEditTaskDrawerOpen);
                        }}
                        className="block px-4 py-2 hover:bg-gray-100  "
                      >
                        Add Case Note
                      </div>
                    </li>
                  </ul>
                </div>
              )}
            </div>
            <Select
              isOpen={markbutton}
              setIsOpen={setMarkButton}
              label="Mark"
              list={FIRStatusList}
              onSelect={(value: any) => {
                console.log(value);
                setMarkButton(false);
              }}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default TaskCard;
