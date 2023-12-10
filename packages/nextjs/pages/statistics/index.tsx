import React from "react";
import { useRouter } from "next/router";

// Dummy data for demonstration
const stats = {
  totalFiledThisMonth: 120,
  totalResolvedThisMonth: 95,
  totalPending: 180,
  crimeRateChange: -5, // Percentage increase/decrease
  mostReportedCrime: "Theft",
  averageResolutionTime: 48, // In hours
};

const StatisticsPage: React.FC = () => {
  return (
    <div className="min-h-screen bg-gray-100 dark:bg-gray-900  px-4 sm:px-6 lg:px-8">
      <h1 className="text-4xl font-extrabold text-center text-gray-900 dark:text-white">FIR Statistics Dashboard</h1>

      <div className="mt-10 grid gap-6 mb-8 md:grid-cols-2 xl:grid-cols-4">
        {/* Stat Cards */}
        <StatCard
          title="FIRs Filed This Month"
          value={stats.totalFiledThisMonth}
          icon="📈"
          borderColor="border-blue-500"
        />
        <StatCard
          title="FIRs Resolved This Month"
          value={stats.totalResolvedThisMonth}
          icon="✔️"
          borderColor="border-green-500"
        />
        <StatCard title="Pending FIRs" value={stats.totalPending} icon="⏳" borderColor="border-yellow-500" />
        <StatCard
          title="Crime Rate Change"
          value={`${stats.crimeRateChange > 0 ? "+" : ""}${stats.crimeRateChange}%`}
          icon={stats.crimeRateChange > 0 ? "📉" : "📈"}
          borderColor={stats.crimeRateChange > 0 ? "border-red-500" : "border-green-500"}
        />
      </div>

      {/* Bar Chart */}
      <div className="bg-white dark:bg-gray-800 rounded-lg shadow p-5">
        {/* <h2 className="text-lg font-semibold text-gray-700 dark:text-gray-300 mb-2">Monthly FIR Overview</h2> */}
        <BarChartPlaceholder />
      </div>

      {/* Additional Statistics if needed */}
    </div>
  );
};

const StatCard: React.FC<{ title: string; value: number | string; icon: string; borderColor: string }> = ({
  title,
  value,
  icon,
  borderColor,
}) => (
  <div className={`border-l-4 p-5 rounded-lg shadow-sm ${borderColor}`}>
    <div className="flex items-center">
      <div className="p-3 rounded-full text-white bg-gradient-to-r from-blue-400 to-blue-600 mr-4">
        <span className="text-xl">{icon}</span>
      </div>
      <p className="text-md font-medium text-gray-700 dark:text-gray-300">{title}</p>
    </div>
    <div className="flex justify-between items-center mt-4">
      <h5 className="text-3xl font-bold text-gray-900 dark:text-white">{value}</h5>
    </div>
  </div>
);

const BarChartPlaceholder: React.FC = () => {
  const router = useRouter();
  return (
    <div className="container mx-auto px-6 py-16 text-center">
      <h2 className="text-3xl font-bold text-gray-900 dark:text-white sm:text-4xl">Access Your Dashboard</h2>
      <p className="mt-4 text-lg text-gray-700 dark:text-gray-300">
        Whether you're a community member seeking updates or law enforcement personnel looking to manage FIRs, access
        the tailored dashboard designed for your needs.
      </p>
      <div className="mt-8 flex justify-center gap-4">
        <button
          onClick={() => router.push("citizen")}
          className="btn inline-block px-6 py-1 bg-blue-600 text-white font-medium text-xs leading-tight uppercase rounded shadow-md hover:bg-blue-700 hover:shadow-lg focus:bg-blue-700 focus:shadow-lg focus:outline-none focus:ring-0 active:bg-blue-800 active:shadow-lg transition duration-150 ease-in-out"
        >
          User Dashboard
        </button>
        <button
          onClick={() => router.push("police")}
          className="btn inline-block px-6 py-2.5 bg-green-600 text-white font-medium text-xs leading-tight uppercase rounded shadow-md hover:bg-green-700 hover:shadow-lg focus:bg-green-700 focus:shadow-lg focus:outline-none focus:ring-0 active:bg-green-800 active:shadow-lg transition duration-150 ease-in-out"
        >
          Police Dashboard
        </button>
      </div>
    </div>
  );
};

export default StatisticsPage;
