import lighthouse from "@lighthouse-web3/sdk";
import AES from "crypto-js/aes";
import { keccak256, toBytes } from "viem";
import { AddressType } from "~~/types/abitype/abi";

const apiKey = process.env.NEXT_PUBLIC_LIGHTHOUSE_KEY;
const secretKey = process.env.NEXT_PUBLIC_LIGHTHOUSE_SECRET_KEY;

const useStorage = (address: AddressType) => {
  const signerAddress = address;

  const getDateTimeAndLocation = () => {
    // Get current date and time
    const currentDate = new Date();

    // Set the time zone to IST
    const options = { timeZone: "Asia/Kolkata" };
    const dateTimeInIST = currentDate.toLocaleString("en-US", options);

    // Get user's location
    navigator.geolocation.getCurrentPosition(
      position => {
        const latitude = position.coords.latitude;
        const longitude = position.coords.longitude;

        // Combine date, time, and location information
        const result = {
          dateTimeInIST: dateTimeInIST,
          location: {
            latitude: latitude,
            longitude: longitude,
          },
        };

        console.log(result);
      },
      error => {
        console.error("Error getting location:", error.message);
      },
    );
  };

  const uploadEncryptedDataOnLighthouse = async (json: object): Promise<string> => {
    const stringToStore = JSON.stringify(json);
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

  return {
    uploadEncryptedDataOnLighthouse,
  };
};

export default useStorage;
