import { useRouter } from "next/router";
import type { NextPage } from "next";
import { MetaHeader } from "~~/components/MetaHeader";
import { Hero } from "~~/components/global";

const Home: NextPage = () => {
  const router = useRouter();
  return (
    <div className="flex flex-col w-full">
      <MetaHeader />
      <Hero
        heading="Welome to D-Fir"
        subHeading="Here you can report your FIR with total trust"
        primaryBtnText="Citizen"
        secondaryBtnText="Police Dept"
        onPrimaryClick={() => router.push("citizen")}
        onSecondaryClick={() => router.push("police")}
      />
    </div>
  );
};

export default Home;
