import React from "react";
import OpenFIRCard from "./AllFIRCard";

const AllFIR = () => {
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
        {dummyFIR.map(fir => (
          <OpenFIRCard key={fir.firID} Fir={fir} />
        ))}
      </div>
    </div>
  );
};

export default AllFIR;
