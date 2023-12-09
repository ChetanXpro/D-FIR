import React, { ReactNode, useEffect, useState } from "react";
import axios from "axios";
import { signIn, signOut, useSession } from "next-auth/react";

interface UserProviderProps {
  children: ReactNode;
}

export const UserContext = React.createContext<any>(null); // Update the type accordingly

export const UserProvider: React.FC<UserProviderProps> = ({ children }) => {
  const { data, status } = useSession();

  const [authData, setAuthData] = useState({
    auth_token: "",
  });
  const [walletAddress, setWalletAddress] = useState<string | null>(null);

  async function getHealth(api_key: string) {
    await axios.get("https://3p-bff.oktostage.com/health", {
      headers: {
        "x-api-key": api_key,
      },
    });
  }

  async function authenticate(api_key: string, idToken: string, pin: string) {
    let { data } = await axios.post(
      `https://3p-bff.oktostage.com/api/v1/authenticate`,
      {
        id_token: idToken,
      },
      {
        headers: {
          "Content-Type": "application/json",
          "x-api-key": api_key,
          "Access-Control-Allow-Origin": "*",
          "Access-Control-Allow-Methods": "GET,PUT,POST,DELETE,PATCH",
        },
      },
    );
    console.log(data);
    const token = data.data.auth_token;
    // user signup flow
    if (token) {
      console.log("HEREE");
      const { data } = await axios.post(
        `https://3p-bff.oktostage.com/api/v1/set_pin`,
        {
          id_token: idToken,
          token: token,
          relogin_pin: pin,
          purpose: "set_pin",
        },
        {
          headers: {
            "x-api-key": api_key,
          },
        },
      );
      console.log(data);
      const { auth_token, refresh_auth_token, device_token } = data.data;
      return { auth_token, refresh_auth_token, device_token };
    }
    // user login flow
    else {
      const { token, refresh_auth_token, device_token } = data;
      return { token, refresh_auth_token, device_token };
    }
  }

  async function refresh_token(api_key: string, auth: string, refresh: string, device: string) {
    const { data } = await axios.post(
      `https://3p-bff.oktostage.com/api/v1/refresh_token`,
      {},
      {
        headers: {
          "x-api-key": api_key,
          "x-refresh-authorization": `Bearer ${refresh}`,
          "x-device-token": device,
          authorization: `Bearer ${auth}`,
        },
      },
    );
    const { token, refresh_auth_token, device_token } = data;
    return { token, refresh_auth_token, device_token };
  }

  async function create_wallet(api_key: string, auth: string) {
    const { data } = await axios.post(
      `https://3p-bff.oktostage.com/api/v1/wallet`,
      {},
      {
        headers: {
          "x-api-key": api_key,
          authorization: `Bearer ${auth}`,
        },
      },
    );
    const { wallets } = data.data;
    return wallets;
  }

  async function logout(api_key: string, auth: string) {
    const { data } = await axios.post(
      `https://3p-bff.oktostage.com/api/v1/logout`,
      {},
      {
        headers: {
          "x-api-key": api_key,
          authorization: `Bearer ${auth}`,
        },
      },
    );
    return data;
  }

  const logoutGoogleAndOkto = async () => {
    await signOut();
    const logoutData = await logout(process.env.NEXT_PUBLIC_OCKO_API as string, authData.auth_token);
    console.log("Logout Data:", logoutData);
  };

  const delay = (milliseconds: number) => new Promise(resolve => setTimeout(resolve, milliseconds));

  const loginGoogleAndWallet = async () => {
    await signIn("google");
  };

  const oktoFlow = async (tokenId: string) => {
    // await getHealth(process.env.NEXT_PUBLIC_OCKO_API as string);

    const authDataLocal = await authenticate(process.env.NEXT_PUBLIC_OCKO_API as string, tokenId, "123456");
    console.log("Authentication Data:", authDataLocal);
    setAuthData(authData);
    // // const refreshTokenData = await refresh_token(
    // //   process.env.NEXT_PUBLIC_OCKO_API as string,
    // //   authData.auth_token,
    // //   refresh,
    // //   device,
    // // );
    // // console.log("Refresh Token Data:", refreshTokenData);

    const walletData = await create_wallet(process.env.NEXT_PUBLIC_OCKO_API as string, authDataLocal.auth_token);
    console.log("Wallet Data:", walletData[0].address);
    setWalletAddress(walletData[0].address);
    //
  };

  useEffect(() => {
    if (status === "authenticated") {
      oktoFlow(data.idToken);
    }
  }, [data, status]);

  // useEffect(() => {
  //   const intervalId = setInterval(() => {
  //     console.log("Executing timed effect every 3 minutes...");
  //   }, 3 * 60 * 1000); // Interval set to 3 minutes

  //   // Clean up the interval when the component unmounts or when you want to stop the timed effect
  //   return () => clearInterval(intervalId);
  // }, []);

  // Rest of your component logic

  return (
    <UserContext.Provider value={{ data, status, walletAddress, loginGoogleAndWallet, logoutGoogleAndOkto }}>
      {children}
    </UserContext.Provider>
  );
};

export default UserProvider;
