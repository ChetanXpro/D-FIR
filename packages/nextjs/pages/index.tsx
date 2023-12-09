import { useRouter } from "next/router";
import type { NextPage } from "next";
import { MetaHeader } from "~~/components/MetaHeader";
import { Hero } from "~~/components/global";

const Home: NextPage = () => {
  const router = useRouter();
  return (
    <div className="flex flex-col h-screen w-full">
      <MetaHeader />
      <Hero />
    </div>
  );
};

export default Home;
