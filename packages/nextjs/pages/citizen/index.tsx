import React from "react";
import AadharVerification from "../dFir/AadharVerification";
import FirRegistration from "../dFir/FirRegistration";
import Stepper, { StepMapTypes } from "~~/components/global/Stepper";

export default function Citizen() {
  const [activeStep, setActiveStep] = React.useState(0);

  function changeActiveStep(step: number) {
    setActiveStep(step);
  }
  const stepMap: StepMapTypes[] = [
    {
      title: "Verify Identity",
      component: <AadharVerification changeActiveStep={changeActiveStep} />,
    },
    {
      title: "Register Complaint",
      component: <FirRegistration />,
    },
  ];
  return <Stepper stepMap={stepMap} activeStep={activeStep} changeActiveStep={changeActiveStep} />;
}
