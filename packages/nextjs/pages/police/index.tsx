// pages/dashboard.tsx
import React from "react";
import AllFIR from "~~/components/Police/AllFIR";
import ClosedFir from "~~/components/Police/ClosedFIR";
import OpenFIR from "~~/components/Police/OpenedFIR";
import Steps from "~~/components/Police/Steps";
import { useScaffoldContractRead } from "~~/hooks/scaffold-eth";
import { Tab } from "~~/utils/constant";

// Mock data - replace with actual data retrieval from your decentralized system

const Dashboard: React.FC = () => {
  const [activeTab, setActiveTab] = React.useState(Tab.All);

  const currentComponent = {
    [Tab.All]: <AllFIR />,
    [Tab.IN_PROGRESS]: <OpenFIR />,
    [Tab.Closed]: <ClosedFir />,
  };
  return (
    <div className=" flex  justify-center flex-col items-center h-screen">
      <div className="w-[90%] gap-3 h-[100%] flex justify-center items-center   flex-col">
        <div className="w-[20rem]">
          <Steps setActiveTab={setActiveTab} activeTab={activeTab} />
        </div>
        <div className=" w-full flex-1">
          <p>{currentComponent[activeTab]}</p>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
