import React, { useContext, useState } from "react";
import lighthouse from "@lighthouse-web3/sdk";
import AES from "crypto-js/aes";
import { encodePacked, keccak256, toHex } from "viem";
import { useAccount } from "wagmi";
import deployedContracts from "~~/contracts/deployedContracts";
import useContractInteraction from "~~/hooks/custom/useContractInteraction";
import useStorage from "~~/hooks/custom/useLightHouse";
import { useScaffoldContractWrite } from "~~/hooks/scaffold-eth";
import { UserContext } from "~~/pages/providers/UserContext";

const apiKey = process.env.NEXT_PUBLIC_LIGHTHOUSE_KEY;

const secretKey = process.env.NEXT_PUBLIC_LIGHTHOUSE_SECRET_KEY;

const FirRegistration = () => {
  const { authData } = useContext(UserContext);
  const { walletAddress } = useContext(UserContext);
  const [newTokenUri, setTokenUri] = useState("");
  const [newLocation, setNewLocation] = useState("");
  const authToken = authData.auth_token;

  const { makeTransaction, execute_raw_transaction } = useContractInteraction({ walletAddress });
  const { getTokenURIFromJson } = useStorage(walletAddress);

  const [firData, setFirData] = useState({
    district: "Borivali",
    complaintShortDesc: "Theft",
    complaintLongDesc: "The suspect stole my wallet in front of Borivali station and escaped on a bike",
    complainantName: "Jignesh Patel",
    complaintPhone: "9765432109",
    complaintGender: "Male",
  });

  const handleInputChange = (e: { target: { name: any; value: any } }) => {
    const { name, value } = e.target;
    setFirData({
      ...firData,
      [name]: value,
    });
  };

  const { writeAsync, isLoading } = useScaffoldContractWrite({
    contractName: "EFIR",
    functionName: "fileFIR",
    args: [newTokenUri, newLocation],
    onBlockConfirmation: txnReceipt => {
      console.log("📦 Transaction blockHash", txnReceipt.blockHash);
    },
  });

  const { writeAsync: assignOfficer, isLoading: loading } = useScaffoldContractWrite({
    contractName: "EFIR",
    functionName: "assignOfficer",
    args: [BigInt(0)],
    onBlockConfirmation: txnReceipt => {
      console.log("📦 Transaction blockHash", txnReceipt.blockHash);
    },
  });

  const { writeAsync: updateUri, isLoading: loadingUri } = useScaffoldContractWrite({
    contractName: "EFIR",
    functionName: "updateFIR",
    args: [BigInt(0), newTokenUri],
    onBlockConfirmation: txnReceipt => {
      console.log("📦 Transaction blockHash", txnReceipt.blockHash);
    },
  });

  const { writeAsync: burnFir, isLoading: loadBurn } = useScaffoldContractWrite({
    contractName: "EFIR",
    functionName: "burn",
    args: [BigInt(0)],
  });

  const burnFirThruOkto = async () => {
    const tx_data = await makeTransaction("burn", [0]);
    const hash = await execute_raw_transaction(tx_data, "", authToken);
    return hash;
  };

  const processFilingFir = async () => {
    // const tx_data = await makeTransaction("fileFIR", ["bhavya", "mumbai"]);
    // console.log(authToken);
    // const hash = await execute_raw_transaction(tx_data, "", authToken);
    // console.log(hash);
    // const hash = await execute_raw_transaction(tx_data,"")
    const firUri = await getTokenURIFromJson(
      {
        name: firData.complainantName,
        district: firData.district,
        description: firData.complaintShortDesc,
      },
      firData.complaintLongDesc,
    );
    await writeAsync({
      args: [firUri, firData.district],
    });
  };

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

      <button className="btn btn-primary btn-outline w-full mt-10" onClick={processFilingFir}>
        Submit Your FIR
      </button>
    </div>
  );
};

export default FirRegistration;
