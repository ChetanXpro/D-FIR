import lighthouse from "@lighthouse-web3/sdk";
import AES from "crypto-js/aes";
import { ethers } from "ethers";
import { encodePacked, keccak256, toBytes } from "viem";
import { AddressType } from "~~/types/abitype/abi";

const apiKey = process.env.NEXT_PUBLIC_LIGHTHOUSE_KEY;
const secretKey = process.env.NEXT_PUBLIC_LIGHTHOUSE_SECRET_KEY;

const useStorage = (address: AddressType) => {
  const uploadEncryptedDataOnLighthouse = async (longerDescription: string): Promise<string> => {
    console.log("======= LONGER DESCRIPTION=======", longerDescription);

    // Generate a new wallet
    const wallet = ethers.Wallet.createRandom();

    // Display the new wallet's public address and private key
    console.log("New Wallet Address:", wallet.address);
    console.log("New Wallet Private Key:", wallet.privateKey);

    // const message = "Unique message to sign"; // This message should be the one you want to encrypt and upload

    const signedMessage = await wallet.signMessage(longerDescription);

    console.log("Signed Message:", signedMessage);

    // const signedMessage = AES.encrypt(longerDescription, secretKey as string).toString();
    const response = await lighthouse.textUploadEncrypted(
      longerDescription,
      apiKey as string,
      address as string,
      signedMessage,
    );
    let fileHash = "";
    fileHash = response.data.hash;
    console.log("======= FILE HASH=======", fileHash);
    return fileHash;
  };

  const getTokenURIFromJson = async (
    shorterDescription: { name: string; district: string; description: string },
    longerDescription: string,
  ): Promise<string> => {
    console.log("======= SHORTER DESCRIPTION=======", shorterDescription);
    console.log("======= LONGER DESCRIPTION=======", longerDescription);

    let fileHash = await uploadEncryptedDataOnLighthouse(longerDescription);
    const metaDataJson = {
      name: shorterDescription.name + "Filed FIR about crime at: " + shorterDescription.district,
      description: shorterDescription.description,
      image: fileHash,
    };
    const base64EncodedJson = btoa(JSON.stringify(metaDataJson));
    console.log(base64EncodedJson);
    return base64EncodedJson;
  };

  return {
    getTokenURIFromJson,
  };
};

export default useStorage;
