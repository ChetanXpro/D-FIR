import React from "react";

export interface StepMapTypes {
  title: string;
  component: JSX.Element;
}
[];
export interface StepperProps {
  stepMap: StepMapTypes[];
  activeStep: number;
  changeActiveStep: (step: number) => void;
}

export default function Stepper(props: StepperProps) {
  const { stepMap, activeStep, changeActiveStep } = props;

  return (
    <div className="flex flex-col  items-center justify-center w-full">
      <div className=" h-[80%] w-[70%] border p-10 flex flex-col ">
        <ul className="steps">
          {stepMap.map((step, index) => {
            return (
              <li
                key={step.title}
                className={`step ${index <= activeStep ? "step-primary" : ""}`}
                onClick={() => changeActiveStep(index)}
              >
                {step.title}
              </li>
            );
          })}
        </ul>
        <div className="flex justify-center items-center flex-1   ">{stepMap[activeStep].component}</div>
      </div>
    </div>
  );
}
