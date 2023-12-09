import StatisticsPage from "./statistics";
import type { NextPage } from "next";
import { MetaHeader } from "~~/components/MetaHeader";

const Home: NextPage = () => {
  return (
    <div className="flex flex-col w-full font-poppins">
      <MetaHeader />
      <StatisticsPage />
    </div>
  );
};

export default Home;
