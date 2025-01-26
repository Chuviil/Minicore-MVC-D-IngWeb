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
    <div>
      <main>
        <h1>Filter App Here</h1>
        <div>
          <label>
            From:
            <input
              type="date"
              value={fromDate}
              onChange={(e) => setFromDate(e.target.value)}
            />
          </label>
          <label>
            To:
            <input
              type="date"
              value={toDate}
              onChange={(e) => setToDate(e.target.value)}
            />
          </label>
          <button onClick={fetchSalesData}>Fetch</button>
        </div>
        <table>
          <thead>
            <tr>
              <th>Department</th>
              <th>Total</th>
            </tr>
          </thead>
          <tbody>
            {salesData.map((row) => (
              <tr key={row.department}>
                <td>{row.department}</td>
                <td>{row.total}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </main>
    </div>
  );
}
