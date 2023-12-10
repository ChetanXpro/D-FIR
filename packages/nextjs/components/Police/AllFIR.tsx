import React, { useState } from "react";
import OpenFIRCard from "./AllFIRCard";
import ViewAllFirDrawer from "./ViewAllFirDrawer";
import { useScaffoldContractRead } from "~~/hooks/scaffold-eth";

const AllFIR = () => {
  const [isViewFIROpen, setIsViewFIROpen] = React.useState(false);
  const { data } = useScaffoldContractRead({
    contractName: "EFIR",
    functionName: "getAllFIRs",
  });

  const dummyFIR = [
    {
      firID: "FIR-1",
      ComplainantName: "Chetan baliyan",
      firshortdescription: "one guy stole my bike yesterday , and i want to file a fir against him",
    },
    {
      firID: "FIR-1",
      ComplainantName: "Chetan baliyan",
      firshortdescription: "one guy stole my bike yesterday , and i want to file a fir against him",
    },
  ];
  return (
    <div className="flex flex-col">
      <h1 className="w-full text-center text-2xl font-semibold mb-4">All FIR</h1>
      <div className="flex flex-wrap gap-3">
        {dummyFIR?.map(fir => (
          <OpenFIRCard setIsViewFIROpen={setIsViewFIROpen} key={fir.firID} Fir={fir} />
          // <>fir</>
        ))}
      </div>

      <ViewAllFirDrawer isViewFIROpen={isViewFIROpen} setIsViewFIROpen={setIsViewFIROpen} />
    </div>
  );
};

export default AllFIR;
