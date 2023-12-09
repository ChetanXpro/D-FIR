import React from "react";
import { Tab } from "~~/utils/constant";

const Steps = ({
  activeTab,
  setActiveTab,
}: {
  activeTab: string;
  setActiveTab: React.Dispatch<React.SetStateAction<Tab>>;
}) => {
  return (
    <div role="tablist" className="tabs tabs-boxed p-4 bg-slate-600 text-black">
      <a
        onClick={() => setActiveTab(Tab.All)}
        role="tab"
        className={`tab ${activeTab === Tab.All ? "tab-active" : ""}`}
      >
        All FIR
      </a>
      <a
        role="tab"
        onClick={() => setActiveTab(Tab.IN_PROGRESS)}
        className={`tab ${activeTab === Tab.IN_PROGRESS ? "tab-active" : ""}`}
      >
        Opened FIR
      </a>
      <a
        role="tab"
        onClick={() => setActiveTab(Tab.Closed)}
        className={`tab ${activeTab === Tab.Closed ? "tab-active" : ""}`}
      >
        Closed FIR
      </a>
    </div>
  );
};

export default Steps;
