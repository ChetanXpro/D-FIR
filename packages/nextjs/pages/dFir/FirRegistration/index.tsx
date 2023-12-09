import React, { useState } from "react";
import lighthouse from "@lighthouse-web3/sdk";
import AES from "crypto-js/aes";
import { useAccount } from "wagmi";

// import jsPDF from "jspdf";

const apiKey = process.env.NEXT_PUBLIC_LIGHTHOUSE_KEY;

const secretKey = process.env.NEXT_PUBLIC_LIGHTHOUSE_SECRET_KEY;
const FirRegistration = () => {
  const { address } = useAccount();
  const [firData, setFirData] = useState({
    district: "Borivali",
    policeStation: "Mumbai",
    year: "2023",
    firNo: "12345",
    firDateTime: "",
    actsViolated: "Section 372",
    complainDescription: "The suspect stole my wallet in front of Borivali station and escaped on a bike",
    placeOfOccurrence: "Borivali Station(W)",
    complaintName: "Jignesh Patel",
    complaintFatherName: "Jigar Patel",
    complaintAddress: "Andheri(W)",
    complaintAddressType: "Permanent",
    complaintPhone: "9765432109",
    complaintEmail: "jigneshpatel@gmail.com",
    complaintGender: "Male",
    complaintAge: "35",
    complaintOccupation: "Accountant",
    complaintPassport: "12332412121",
    complaintAadhar: "1234-1234-1223",
    complaintPan: "1234-1234-1234",
    policeName: "Bhavya Gor",
    policeDesignation: "Inspector",
    suspectName: "Unknown",
    suspectAge: "Between 20-30",
    suspectGender: "Male",
    suspectAddress: "Unknown",
    suspectPhone: "Unknown",
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
    <div className="flex flex-col items-start w-full gap-y-3 p-8">
      <h1 className="text-[#000000] dark:text-white text-bold text-3xl tracking-[1.5px] ">
        Police Station Information
      </h1>
      <h1 className="text-bold text-xl tracking-[1.5px] ">Name of police station</h1>
      <input
        type="text"
        placeholder="Type here"
        className="input input-bordered input-success w-full"
        onChange={handleInputChange}
        name="policeStation"
        value={firData.policeStation}
      />
      <h1 className="text-bold text-xl tracking-[1.5px] ">District</h1>
      <input
        type="text"
        placeholder="Type here"
        className="input input-bordered input-success w-full"
        onChange={handleInputChange}
        name="district"
        value={firData.district}
      />
      <h1 className="text-bold text-xl tracking-[1.5px] ">Police Name</h1>
      <input
        type="text"
        placeholder="Type here"
        className="input input-bordered input-success w-full"
        onChange={handleInputChange}
        name="policeName"
        value={firData.policeName}
      />
      <h1 className="text-bold text-xl tracking-[1.5px] ">Police Designation</h1>
      <input
        type="text"
        placeholder="Type here"
        className="input input-bordered input-success w-full"
        onChange={handleInputChange}
        name="policeDesignation"
        value={firData.policeDesignation}
      />
      <h1 className="text-bold text-xl tracking-[1.5px] ">Year</h1>
      <input
        type="text"
        placeholder="Type here"
        className="input input-bordered input-success w-full"
        onChange={handleInputChange}
        name="year"
        value={firData.year}
      />
      <h1 className="text-[#000000] dark:text-white text-bold text-3xl tracking-[1.5px] mt-[2%] ">FIR Details</h1>
      <h1 className="text-bold text-xl tracking-[1.5px] ">FIR no.</h1>
      <input
        type="text"
        placeholder="Type here"
        className="input input-bordered input-success w-full"
        onChange={handleInputChange}
        name="firNo"
        value={firData.firNo}
      />
      <h1 className="text-bold text-xl tracking-[1.5px] ">Acts Violated</h1>
      <input
        type="text"
        placeholder="Type here"
        className="input input-bordered input-success w-full"
        onChange={handleInputChange}
        name="actsViolated"
        value={firData.actsViolated}
      />
      <h1 className="text-bold text-xl tracking-[1.5px] ">Date and Time</h1>
      <input
        type="datetime-local"
        placeholder="Type here"
        className="input input-bordered input-success w-full"
        onChange={handleInputChange}
        name="firDateTime"
        value={firData.firDateTime}
      />
      <h1 className="text-bold text-xl tracking-[1.5px] ">Complain Details</h1>
      <textarea
        placeholder="Type here"
        className="textarea textarea-success  w-full"
        onChange={handleInputChange}
        name="complainDescription"
        value={firData.complainDescription}
      />
      <h1 className="text-bold text-xl tracking-[1.5px] ">Place of Occurrence</h1>
      <input
        type="text"
        placeholder="Type here"
        className="input input-bordered input-success w-full"
        onChange={handleInputChange}
        name="placeOfOccurrence"
        value={firData.placeOfOccurrence}
      />
      <h1 className="text-[#000000] dark:text-white text-bold text-3xl tracking-[1.5px] mt-[2%] ">
        Complaint Information
      </h1>
      <h1 className="text-bold text-xl tracking-[1.5px] ">Name of Complaint</h1>
      <input
        type="text"
        placeholder="Type here"
        className="input input-bordered input-success w-full"
        onChange={handleInputChange}
        name="complainantName"
        value={firData.complaintName}
      />
      <h1 className="text-bold text-xl tracking-[1.5px] ">Father&poss Name of Complaint</h1>
      <input
        type="text"
        placeholder="Type here"
        className="input input-bordered input-success w-full"
        onChange={handleInputChange}
        name="complainantFatherName"
        value={firData.complaintFatherName}
      />
      <h1 className="text-bold text-xl tracking-[1.5px] ">Complaint Address</h1>
      <textarea
        placeholder="Type here"
        className="textarea textarea-success  w-full"
        onChange={handleInputChange}
        name="complaintAddress"
        value={firData.complaintAddress}
      />
      <h1 className="text-bold text-xl tracking-[1.5px] ">Complaint Address Type</h1>
      <input
        type="text"
        placeholder="Type here"
        className="input input-bordered input-success w-full"
        onChange={handleInputChange}
        name="complaintAddressType"
        value={firData.complaintAddressType}
      />
      <h1 className="text-bold text-xl tracking-[1.5px] ">Complaint Phone Number</h1>
      <input
        type="text"
        placeholder="Type here"
        className="input input-bordered input-success w-full"
        onChange={handleInputChange}
        name="complaintPhone"
        value={firData.complaintPhone}
      />
      <h1 className="text-bold text-xl tracking-[1.5px] ">Complaint Email</h1>
      <input
        type="text"
        placeholder="Type here"
        className="input input-bordered input-success w-full"
        onChange={handleInputChange}
        name="complaintEmail"
        value={firData.complaintEmail}
      />
      <h1 className="text-bold text-xl tracking-[1.5px] ">Complaint Gender</h1>
      <input
        type="text"
        placeholder="Type here"
        className="input input-bordered input-success w-full"
        onChange={handleInputChange}
        name="complaintGender"
        value={firData.complaintGender}
      />
      <h1 className="text-bold text-xl tracking-[1.5px] ">Complaint Age</h1>
      <input
        type="text"
        placeholder="Type here"
        className="input input-bordered input-success w-full"
        onChange={handleInputChange}
        name="complaintAge"
        value={firData.complaintAge}
      />
      <h1 className="text-bold text-xl tracking-[1.5px] ">Complaint Occupation</h1>
      <input
        type="text"
        placeholder="Type here"
        className="input input-bordered input-success w-full"
        onChange={handleInputChange}
        name="complaintOccupation"
        value={firData.complaintOccupation}
      />
      <h1 className="text-bold text-xl tracking-[1.5px] ">Complaint Passport</h1>
      <input
        type="text"
        placeholder="Type here"
        className="input input-bordered input-success w-full"
        onChange={handleInputChange}
        name="complaintPassport"
        value={firData.complaintPassport}
      />
      <h1 className="text-bold text-xl tracking-[1.5px] ">Complaint Aadhar</h1>
      <input
        type="text"
        placeholder="Type here"
        className="input input-bordered input-success w-full"
        onChange={handleInputChange}
        name="complaintAadhar"
        value={firData.complaintAadhar}
      />
      <h1 className="text-bold text-xl tracking-[1.5px] ">Complaint Pan Card</h1>
      <input
        type="text"
        placeholder="Type here"
        className="input input-bordered input-success w-full"
        onChange={handleInputChange}
        name="complaintPan"
        value={firData.complaintPan}
      />
      <h1 className="text-[#000000] dark:text-white text-bold text-3xl tracking-[1.5px] mt-[2%] ">
        Suspect Information
      </h1>
      <h1 className="text-bold text-xl tracking-[1.5px] ">Suspect Name</h1>
      <input
        type="text"
        placeholder="Type here"
        className="input input-bordered input-success w-full"
        onChange={handleInputChange}
        name="suspectName"
        value={firData.suspectName}
      />
      <h1 className="text-bold text-xl tracking-[1.5px] ">Suspect Age</h1>
      <input
        type="text"
        placeholder="Type here"
        className="input input-bordered input-success w-full"
        onChange={handleInputChange}
        name="suspectAge"
        value={firData.suspectAge}
      />
      <h1 className="text-bold text-xl tracking-[1.5px] ">Suspect Gender</h1>
      <input
        type="text"
        placeholder="Type here"
        className="input input-bordered input-success w-full"
        onChange={handleInputChange}
        name="suspectGender"
        value={firData.suspectGender}
      />
      <h1 className="text-bold text-xl tracking-[1.5px] ">Suspect Address</h1>
      <textarea
        placeholder="Type here"
        className="textarea textarea-success  w-full"
        onChange={handleInputChange}
        name="suspectAddress"
        value={firData.suspectAddress}
      />
      <h1 className="text-bold text-xl tracking-[1.5px] ">Suspect Phone Number</h1>
      <input
        type="text"
        placeholder="Type here"
        className="textarea textarea-success  w-full"
        onChange={handleInputChange}
        name="suspectPhone"
        value={firData.suspectPhone}
      />
      <button
        className="btn btn-primary btn-outline btn-sm"
        onClick={() => uploadEncryptedFormOnLightHouse(JSON.stringify(firData), apiKey as string)}
      >
        Submit
      </button>
    </div>
  );
};

export default FirRegistration;
