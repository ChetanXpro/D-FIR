import axios from "axios";
import { Contract } from "ethers";
import { HexString } from "ethers/lib.commonjs/utils/data";
import deployedContracts from "~~/contracts/deployedContracts";

type Props = {
  walletAddress: string;

  authToken: string;
};

const useContractInteraction = ({ walletAddress, authToken }: Props) => {
  const contractAddress = deployedContracts[80001].EFIR.address;
  const contractABI = deployedContracts[80001].EFIR.abi;
  const contract = new Contract(contractAddress, contractABI);

  const makeTransaction = async (functionName: string, args: any[]) => {
    return contract.interface.encodeFunctionData(functionName, args);
  };

  async function execute_raw_transaction(tx_data: string, value: string) {
    const { data } = await axios.post(
      `/api/v1/rawtransaction/execute`,
      {
        network_name: "POLYGON_TESTNET",
        transaction: {
          from: walletAddress,
          to: contractAddress,
          data: tx_data,
          value: value,
        },
      },
      {
        headers: {
          "x-api-key": process.env.NEXT_PUBLIC_OCKO_API,
          authorization: `Bearer ${authToken}`,
        },
      },
    );
    return data;
  }
  return { execute_raw_transaction, contract, makeTransaction };
};

export default useContractInteraction;
