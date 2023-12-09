import React, { useState } from "react";
import lighthouse from "@lighthouse-web3/sdk";
import AES from "crypto-js/aes";
import { useAccount } from "wagmi";

const apiKey = process.env.NEXT_PUBLIC_LIGHTHOUSE_KEY;

const secretKey = process.env.NEXT_PUBLIC_LIGHTHOUSE_SECRET_KEY;

const FirRegistration = () => {
  const { address } = useAccount();
  const [firData, setFirData] = useState({
    district: "Borivali",
    year: "2023",
    complaintShortDesc: "Theft",
    complaintLongDesc: "The suspect stole my wallet in front of Borivali station and escaped on a bike",
    complainantName: "Jignesh Patel",
    complaintPhone: "9765432109",
    complaintEmail: "jigneshpatel@gmail.com",
    complaintGender: "Male",
  });

  const handleInputChange = (e: { target: { name: any; value: any } }) => {
    const { name, value } = e.target;
    setFirData({
      ...firData,
      [name]: value,
    });
  };

  async function uploadEncryptedFormOnLightHouse(text: string, apiKey: string) {
    const signedMessage = AES.encrypt("dFir", secretKey as string).toString();
    const response = await lighthouse.textUploadEncrypted(signedMessage, apiKey, address as string, "SIGNATURE/JWT");
    console.log(response);
  }
  return (
    <div className="flex flex-col items-start border-1 border-white  w-full gap-y-3  p-8">
      <h1 className="text-[#000000] dark:text-white text-bold text-3xl tracking-[1.5px] mt-[2%] ">
        Complaint Information
      </h1>

      <h1 className="text-bold text-xl tracking-[1.5px] ">Name</h1>
      <input
        type="text"
        placeholder="Type here"
        className="input input-bordered input-success w-full"
        onChange={handleInputChange}
        name="complaintPhone"
        value={firData.complainantName}
      />

      <h1 className="text-bold text-xl tracking-[1.5px] ">Phone No.</h1>
      <input
        type="text"
        placeholder="Type here"
        className="input input-bordered input-success w-full"
        onChange={handleInputChange}
        name="complaintPhone"
        value={firData.complaintPhone}
      />
      <h1 className="text-bold text-xl tracking-[1.5px] ">Email</h1>
      <input
        type="text"
        placeholder="Type here"
        className="input input-bordered input-success w-full"
        onChange={handleInputChange}
        name="complaintEmail"
        value={firData.complaintEmail}
      />
      <h1 className="text-bold text-xl tracking-[1.5px] ">Gender</h1>
      <input
        type="text"
        placeholder="Type here"
        className="input input-bordered input-success w-full"
        onChange={handleInputChange}
        name="complaintGender"
        value={firData.complaintGender}
      />

      <h1 className="text-[#000000] dark:text-white text-bold text-3xl tracking-[1.5px] mt-[2%] ">FIR Details</h1>

      <h1 className="text-bold text-xl tracking-[1.5px] ">District</h1>
      <input
        type="text"
        placeholder="Type here"
        className="input input-bordered input-success w-full"
        onChange={handleInputChange}
        name="district"
        value={firData.district}
      />

      <h1 className="text-bold text-xl tracking-[1.5px] ">Complaint Description (Short)</h1>
      <textarea
        placeholder="Type here"
        className="textarea textarea-success  w-full"
        onChange={handleInputChange}
        name="complaintShortDesc"
        value={firData.complaintShortDesc}
      />

      <h1 className="text-bold text-xl tracking-[1.5px] ">Complaint Description (Long)</h1>
      <textarea
        placeholder="Type here"
        className="textarea textarea-success  w-full"
        onChange={handleInputChange}
        name="complaintShortDesc"
        value={firData.complaintShortDesc}
      />

      <button
        className="btn btn-primary btn-outline w-full mt-10"
        onClick={() => uploadEncryptedFormOnLightHouse(JSON.stringify(firData), apiKey as string)}
      >
        Submit Your FIR
      </button>
    </div>
  );
};

export default FirRegistration;
