import { useEffect } from "react";
import { LogInWithAnonAadhaar, useAnonAadhaar } from "anon-aadhaar-react";

export default function AadharVerification(props: { changeActiveStep: (step: number) => void }) {
  const { changeActiveStep } = props;
  const [anonAadhaar] = useAnonAadhaar();
  useEffect(() => {
    if (anonAadhaar?.status === "logged-in") {
      changeActiveStep && changeActiveStep(1);
    }
  }, [anonAadhaar, changeActiveStep]);

  return (
    <div className=" w-full h-full flex items-center justify-center flex-col p-10">
      <LogInWithAnonAadhaar />
    </div>
  );
}
