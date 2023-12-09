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
    <div className="min-h-screen  px-4 sm:px-6 lg:px-8">
      <h1 className="text-4xl font-bold text-center text-gray-900 dark:text-white">FIR Statistics Dashboard</h1>

      <div className="mt-10 grid gap-6 mb-8 md:grid-cols-2 xl:grid-cols-4">
        {/* Stat Cards */}
        <StatCard
          title="FIRs Filed This Month"
          value={stats.totalFiledThisMonth}
          icon="📈"
          borderColor="border-blue-500"
        />
        <StatCard
          title="FIRs Resolved/Month"
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
      <div className="bg-white  dark:bg-gray-800 rounded-lg shadow p-5">
        <h2 className="text-lg font-semibold text-gray-700 dark:text-gray-300 mb-2">Monthly FIR Overview</h2>
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
    <div className=" gap-4 flex-1 bg-gradient-to-b from-blue-200 to-blue-400 dark:from-blue-600 dark:to-blue-800 rounded-lg flex items-center justify-center text-white text-2xl">
      <div className="hero h-full bg-base-200 items-center justify-center mt-3">
        <div className="hero-content text-center">
          <div className="max-w-md">
            <h1 className="text-5xl font-bold">Access Your Dashboard </h1>
            <p className="py-6"></p>
            <div className="flex justify-center space-x-4">
              <button className="btn btn-primary" onClick={() => router.push("citizen")}>
                User Dashboard
              </button>
              <button className="btn btn-secondary" onClick={() => router.push("police")}>
                Police Dashboard
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default StatisticsPage;
