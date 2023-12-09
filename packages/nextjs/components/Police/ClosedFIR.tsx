// pages/dashboard.tsx
import React from "react";
import Head from "next/head";

type FIRRecord = {
  id: string;
  status: string;
  suspectName: string;
  crime: string;
};

// Mock data - replace with actual data retrieval from your decentralized system
const firRecords: FIRRecord[] = [
  {
    id: "FIR123",
    status: "Open",
    suspectName: "John Doe",
    crime: "Burglary",
  },
  // ... add more records here
];

const ClosedFir: React.FC = () => {
  return (
    <div className="h-full bg-gray-100">
      <Head>
        <title>Police Dashboard</title>
      </Head>
      <div className="container  mx-auto px-4 sm:px-8 max-w-3xl">
        <div className="py-8">
          <h1 className="text-2xl font-semibold text-gray-900 leading-tight">Police Dashboard</h1>
          <div className="my-4 overflow-hidden rounded-lg shadow-sm">
            <table className="min-w-full leading-normal">
              <thead>
                <tr>
                  <th className="px-5 py-3 border-b-2 border-gray-200 bg-gray-100 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                    FIR ID
                  </th>
                  <th className="px-5 py-3 border-b-2 border-gray-200 bg-gray-100 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                    Status
                  </th>
                  <th className="px-5 py-3 border-b-2 border-gray-200 bg-gray-100 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                    Suspect Name
                  </th>
                  <th className="px-5 py-3 border-b-2 border-gray-200 bg-gray-100 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                    Crime
                  </th>
                </tr>
              </thead>
              <tbody>
                {firRecords.map(record => (
                  <tr key={record.id} className="hover:bg-gray-50">
                    <td className="px-5 py-3 border-b border-gray-200 bg-white text-sm">
                      <div className="flex items-center">
                        <div className="ml-3">
                          <p className="text-gray-900 whitespace-no-wrap">{record.id}</p>
                        </div>
                      </div>
                    </td>
                    <td className="px-5 py-3 border-b border-gray-200 bg-white text-sm">
                      <span
                        className={`relative inline-block px-3 py-1 font-semibold leading-tight ${
                          record.status === "Open" ? "text-green-900 bg-green-200" : "text-red-900 bg-red-200"
                        }`}
                      >
                        <span aria-hidden="true" className="absolute inset-0 opacity-50 rounded-full"></span>
                        <span className="relative">{record.status}</span>
                      </span>
                    </td>
                    <td className="px-5 py-3 border-b border-gray-200 bg-white text-sm">
                      <p className="text-gray-900 whitespace-no-wrap">{record.suspectName}</p>
                    </td>
                    <td className="px-5 py-3 border-b border-gray-200 bg-white text-sm">
                      <p className="text-gray-900 whitespace-no-wrap">{record.crime}</p>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ClosedFir;
