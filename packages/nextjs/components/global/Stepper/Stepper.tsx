import React from "react";

export interface StepMapTypes {
  title: string;
  component: JSX.Element;
}
[];
export interface StepperProps {
  stepMap: StepMapTypes[];
}

export default function Stepper(props: StepperProps) {
  const { stepMap } = props;
  const [activeStep, setActiveStep] = React.useState(0);
  return (
    <>
      <ul className="steps">
        {stepMap.map((step, index) => {
          return (
            <li
              key={step.title}
              className={`step ${index <= activeStep ? "step-primary" : ""}`}
              onClick={() => setActiveStep(index)}
            >
              {step.title}
            </li>
          );
        })}
      </ul>
      <div className="flex justify-center items-center h-full">{stepMap[activeStep].component}</div>
    </>
  );
}
