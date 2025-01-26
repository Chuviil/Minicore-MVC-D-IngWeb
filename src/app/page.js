"use client";

import { useState } from "react";

export default function Home() {
  const [fromDate, setFromDate] = useState("");
  const [toDate, setToDate] = useState("");
  const [salesData, setSalesData] = useState([]);

  const fetchSalesData = async () => {
    const response = await fetch(`/api/sales?fromDate=${fromDate}&toDate=${toDate}`);
    const data = await response.json();
    setSalesData(data);
  };

  return (
    <div className="min-h-screen bg-gray-100 flex items-center justify-center">
      <main className="bg-white p-8 rounded shadow-md w-full max-w-lg">
        <h1 className="text-2xl font-bold mb-6 text-center">Minicore Filtro Fechas</h1>
        <div className="mb-4">
          <label className="block mb-2">
            From:
            <input
              type="date"
              value={fromDate}
              onChange={(e) => setFromDate(e.target.value)}
              className="mt-1 block w-full border border-gray-300 rounded p-2"
            />
          </label>
          <label className="block mb-4">
            To:
            <input
              type="date"
              value={toDate}
              onChange={(e) => setToDate(e.target.value)}
              className="mt-1 block w-full border border-gray-300 rounded p-2"
            />
          </label>
          <button
            onClick={fetchSalesData}
            className="w-full bg-blue-500 text-white py-2 rounded hover:bg-blue-600"
          >
            Calculate
          </button>
        </div>
        <table className="min-w-full bg-white">
          <thead>
            <tr>
              <th className="py-2 px-4 border-b">Department</th>
              <th className="py-2 px-4 border-b">Total</th>
            </tr>
          </thead>
          <tbody>
            {salesData.map((row) => (
              <tr key={row.department}>
                <td className="py-2 px-4 border-b">{row.department}</td>
                <td className="py-2 px-4 border-b">{row.total}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </main>
    </div>
  );
}
