import lighthouse from "@lighthouse-web3/sdk";
import AES from "crypto-js/aes";
import { keccak256, toBytes } from "viem";
import { AddressType } from "~~/types/abitype/abi";

const apiKey = process.env.NEXT_PUBLIC_LIGHTHOUSE_KEY;
const secretKey = process.env.NEXT_PUBLIC_LIGHTHOUSE_SECRET_KEY;

const useStorage = (address: AddressType) => {
  const signerAddress = address;

  const uploadEncryptedDataOnLighthouse = async (longerDescription: object): Promise<string> => {
    const stringToStore = JSON.stringify(longerDescription);
    const signedMessage = AES.encrypt(stringToStore, secretKey as string).toString();
    const response = await lighthouse.textUploadEncrypted(
      signedMessage,
      apiKey as string,
      address as string,
      "SIGNATURE/JWT",
    );
    let fileHash = "";
    fileHash = response.data.hash;
    return fileHash;
  };

  const getTokenURIFromJson = async (shorterDescription:object,)

  return {
    uploadEncryptedDataOnLighthouse,
  };
};

export default useStorage;
