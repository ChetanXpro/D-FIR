import React, { ReactNode } from "react";
import { signIn, signOut, useSession } from "next-auth/react";

interface UserProviderProps {
  children: ReactNode;
}

export const UserContext = React.createContext<any>(null); // Update the type accordingly

export const UserProvider: React.FC<UserProviderProps> = ({ children }) => {
  const { data, status } = useSession();

  const contractAddress = null;

  const logoutGoogleAndOkto = async () => {
    await signOut();
  };

  const loginGoogleAndWallet = async () => {
    await signIn("google");
  };

  // useEffect(() => {
  //   if (status === "authenticated") {
  //     oktoFlow(data?.tokenId);
  //   }
  // }, [data]);

  // Rest of your component logic

  return (
    <UserContext.Provider value={{ data, status, contractAddress, loginGoogleAndWallet, logoutGoogleAndOkto }}>
      {children}
    </UserContext.Provider>
  );
};

export default UserProvider;
