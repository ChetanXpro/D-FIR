import { useEffect } from "react";
import type { AppProps } from "next/app";
import { Inter } from "next/font/google";
import UserProvider from "./providers/AuthContext";
import { RainbowKitProvider, darkTheme } from "@rainbow-me/rainbowkit";
import "@rainbow-me/rainbowkit/styles.css";
import { AnonAadhaarProvider } from "anon-aadhaar-react";
import { SessionProvider } from "next-auth/react";
import NextNProgress from "nextjs-progressbar";
import { Toaster } from "react-hot-toast";
import { WagmiConfig } from "wagmi";
import { Footer } from "~~/components/Footer";
import { Header } from "~~/components/Header";
import { BlockieAvatar } from "~~/components/scaffold-eth";
import { useNativeCurrencyPrice } from "~~/hooks/scaffold-eth";
import { useGlobalState } from "~~/services/store/store";
import { wagmiConfig } from "~~/services/web3/wagmiConfig";
import { appChains } from "~~/services/web3/wagmiConnectors";
import "~~/styles/globals.css";

const inter = Inter({
  subsets: ["latin"],
  display: "swap",
});

const ScaffoldEthApp = ({ Component, pageProps }: AppProps) => {
  const price = useNativeCurrencyPrice();
  const setNativeCurrencyPrice = useGlobalState(state => state.setNativeCurrencyPrice);

  useEffect(() => {
    if (price > 0) {
      setNativeCurrencyPrice(price);
    }
  }, [setNativeCurrencyPrice, price]);

  return (
    <SessionProvider session={pageProps.session}>
      <UserProvider>
        <div className={`flex flex-col min-h-screen ${inter.className}`}>
          <Header />
          <main className="relative flex flex-col flex-1 px-4 py-8 space-y-4 bg-app-gray-200">
            <Component {...pageProps} />
          </main>
          <Footer />
        </div>
        <Toaster />
      </UserProvider>
    </SessionProvider>
  );
};
const appId = process.env.NEXT_PUBLIC_APP_ID || "";

const ScaffoldEthAppWithProviders = (props: AppProps) => {
  // This variable is required for initial client side rendering of correct theme for RainbowKit

  return (
    <AnonAadhaarProvider _appId={appId}>
      <WagmiConfig config={wagmiConfig}>
        <NextNProgress />
        <RainbowKitProvider chains={appChains.chains} avatar={BlockieAvatar} theme={darkTheme()}>
          <ScaffoldEthApp {...props} />
        </RainbowKitProvider>
      </WagmiConfig>
    </AnonAadhaarProvider>
  );
};

export default ScaffoldEthAppWithProviders;
