import { useEffect } from "react";
import { AnonAadhaarProof, LogInWithAnonAadhaar, useAnonAadhaar } from "anon-aadhaar-react";

export default function AadharVerification() {
  const [anonAadhaar] = useAnonAadhaar();

  useEffect(() => {
    console.log("Anon Aadhaar status: ", anonAadhaar.status);
  }, [anonAadhaar]);

  return (
    <>
      <div>
        <LogInWithAnonAadhaar />
        <p>{anonAadhaar?.status}</p>
      </div>
      <div>
        {/* Render the proof if generated and valid */}
        {anonAadhaar?.status === "logged-in" && (
          <>
            <p>✅ Proof is valid</p>
            <AnonAadhaarProof code={JSON.stringify(anonAadhaar.pcd, null, 2)} />
          </>
        )}
      </div>
    </>
  );
}
