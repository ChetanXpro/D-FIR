import { useState } from "react";
import AadharVerification from "./dFir/AadharVerification";
import FirRegistration from "./dFir/FirRegistration";
import type { NextPage } from "next";
import { MetaHeader } from "~~/components/MetaHeader";
import { Hero, Stepper } from "~~/components/daisy";
import { StepMapTypes } from "~~/components/daisy/Stepper";

const Home: NextPage = () => {
  const [isStarted, setIsStarted] = useState(false);
  const stepMap: StepMapTypes[] = [
    {
      title: "Verify Identity",
      component: <AadharVerification />,
    },
    {
      title: "Register Complaint",
      component: <FirRegistration />,
    },
    {
      title: "Step 3",
      component: <div>Step 3</div>,
    },
  ];
  return (
    <div className="flex flex-col w-full px-4 py-8 space-y-4">
      <MetaHeader />
      {!isStarted ? (
        <Hero
          heading="Welome to D-Fir"
          subHeading="Here you can report your FIR with total trust"
          onCtaClick={() => setIsStarted(true)}
        />
      ) : (
        <Stepper stepMap={stepMap} />
      )}
    </div>
  );
};

export default Home;
