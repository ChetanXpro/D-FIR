import lighthouse from "@lighthouse-web3/sdk";
import AES from "crypto-js/aes";
import { ethers } from "ethers";
import { encodePacked, keccak256, toBytes } from "viem";
import { AddressType } from "~~/types/abitype/abi";

const alchemyKit = process.env.NEXT_PUBLIC_ALCHEMY_ID;
const apiKey = process.env.NEXT_PUBLIC_LIGHTHOUSE_KEY;
const secretKey = process.env.NEXT_PUBLIC_LIGHTHOUSE_SECRET_KEY;

const useStorage = (address: AddressType) => {
  const uploadEncryptedDataOnLighthouse = async (longerDescription: string): Promise<string> => {
    const provider = new ethers.JsonRpcProvider(`https://polygon-mumbai.g.alchemy.com/v2/${alchemyKit}`);
    const wallet = ethers.Wallet.createRandom(provider);

    console.log("New Wallet Address:", wallet.address);
    console.log("New Wallet Private Key:", wallet.privateKey);

    let messageRequested = (await lighthouse.getAuthMessage(wallet.address)).data.message;
    let signedMessage = await wallet.signMessage(messageRequested);

    console.log("Signed Message:", signedMessage);

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
    // let fileHash = await uploadEncryptedDataOnLighthouse(longerDescription);
    const encryptedText = String(AES.encrypt(longerDescription, secretKey as string));
    let response = await lighthouse.uploadText(encryptedText, apiKey as string);

    const metaDataJson = {
      name: shorterDescription.name + "Filed FIR about crime at: " + shorterDescription.district,
      description: shorterDescription.description,
      image: response.data.Hash,
    };
    console.log(metaDataJson);
    const base64EncodedJson = btoa(JSON.stringify(metaDataJson));
    console.log(base64EncodedJson);
    return base64EncodedJson;
  };

  const decryptTokenURI = async (encryptedLongerDescription: string) => {
    return String(AES.decrypt(encryptedLongerDescription, secretKey as string));
  };

  const retrieveHash = async (cid: string) => {};

  return {
    getTokenURIFromJson,
  };
};

export default useStorage;
