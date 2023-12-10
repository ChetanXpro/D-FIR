import React, { useEffect } from "react";
import { firToEditAtom } from "../../atoms/atoms";
import { useScaffoldContractWrite } from "../../hooks/scaffold-eth";
import { useAtom } from "jotai";

interface Props {
  Fir: {
    firID: string;
    ComplainantName: string;
    firshortdescription: string;
  };
  setIsViewFIROpen: (isOpen: boolean) => void;
}

const AllFIRCard = ({ Fir, setIsViewFIROpen }: Props) => {
  const [, setTaskToEdit] = useAtom(firToEditAtom);

  const [actionButton, setActionButton] = React.useState(false);
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

  const { writeAsync: assignOfficer, isLoading: loading } = useScaffoldContractWrite({
    contractName: "EFIR",
    functionName: "officerAssignRequest",
    args: [BigInt(0)],
    onBlockConfirmation: txnReceipt => {
      console.log("📦 Transaction blockHash", txnReceipt.blockHash);
    },
  });

  return (
    <div className={`flex sticky-note flex-col rounded-lg bg-[aliceblue]  text-black  w-60 p-3 h-56  md:flex-row`}>
      <div className="flex flex-col gap-3 justify-between h-full ">
        <div className="h-full">
          <div className="w-full flex h-full gap-4 flex-col ">
            <div className="flex flex-col gap-0">
              <h1 className="text-base font-semibold text-blue-700">Complainant Name:</h1>
              <h5 className=" text-sm font-medium text-neutral-900  ">
                {Fir.ComplainantName.length > 0
                  ? Fir.ComplainantName.length > 25
                    ? Fir.ComplainantName.slice(0, 25) + "..."
                    : Fir.ComplainantName
                  : "..."}
              </h5>
            </div>

            <div>
              <h1 className="text-base font-semibold text-blue-700">Short Description:</h1>
              <h5 className=" text-sm h-full text-neutral-600 ">
                {Fir.firshortdescription.length > 0
                  ? Fir.firshortdescription.length > 60
                    ? Fir.firshortdescription.slice(0, 60) + "..."
                    : Fir.firshortdescription
                  : "No Description"}
              </h5>
            </div>
          </div>
        </div>

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
                        onClick={async () => {
                          setTaskToEdit(Fir);

                          await assignOfficer({
                            args: [BigInt(Fir.firID)],
                          }).then(() => {
                            console.log("assigned");
                          });

                          // !TODO
                          //   setIsEditTaskDrawerOpen(!isEditTaskDrawerOpen);
                        }}
                        className="block px-4 py-2 hover:bg-gray-100 cursor-pointer"
                      >
                        Accept FIR
                      </div>
                    </li>
                    <li>
                      <div
                        onClick={() => {
                          setTaskToEdit(Fir);
                          setIsViewFIROpen(true);
                        }}
                        className="block px-4 py-2 hover:bg-gray-100 cursor-pointer"
                      >
                        View FIR
                      </div>
                    </li>
                  </ul>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AllFIRCard;
