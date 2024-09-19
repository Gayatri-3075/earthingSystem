"use client";
import { useEffect, useState } from "react";
import PocketBase from "pocketbase";
import { config } from "dotenv";
config();

// Import the charting library
import { Line } from "react-chartjs-2";
import Chart from "chart.js/auto"; // Ensure Chart.js is registered

const pb = new PocketBase("http://127.0.0.1:8090");

export default function LeakageChart() {
  const [leakageData, setLeakageData] = useState([]);

  useEffect(() => {
    // Subscribe to real-time updates on the "Poles" collection
    pb.collection("Poles").subscribe("*", function (e) {
      if (e.action === "update") {
        console.log("update", e.record.poleid, e.record.leakage);
        // Append the new leakage value to the leakageData array, keeping only the latest 20 values
        setLeakageData((prevData) => {
          const newData = [
            ...prevData,
            { time: new Date(), value: e.record.leakage },
          ];

          // Check if the length exceeds 20, and remove the oldest value if necessary
          if (newData.length > 20) {
            newData.shift(); // Removes the first (oldest) element
          }

          return newData;
        });
      }

    });

    return () => {
      // Unsubscribe from all topics when the component unmounts
      pb.collection("Poles").unsubscribe();
    };
  }, []);

  // Prepare data for the chart
  const chartData = {
    labels: leakageData.map((dataPoint) => dataPoint.time.toLocaleTimeString()),
    datasets: [
      {
        label: "Leakage",
        data: leakageData.map((dataPoint) => dataPoint.value),
        fill: false,
        borderColor: "rgb(75,192,192)",
        tension: 0.1,
      },
    ],
  };

  return (
    <div className="flex items-center justify-center">
      <Line data={chartData} />
    </div>
  );
}
