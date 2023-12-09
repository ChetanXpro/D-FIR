import axios from "axios";

type Props = {
  walletAddress: string;
  contractAddress: string;
  authToken: string;
};

const useContractInteraction = ({ walletAddress, contractAddress, authToken }: Props) => {
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
        }, // raw transaction
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
  return { execute_raw_transaction };
};

export default useContractInteraction;
