"use client";

import { useEffect, useState } from "react";
import useLeakageData from "./utils/useLeakageData";
import { Legend, Line, LineChart, Tooltip, XAxis, YAxis } from "recharts";

const DATAPOINTS = 14;

export default function BoringLeakageChart({ pid = "PID1"}) {
  
  const fetchedData = useLeakageData(pid);
  const [data, setData] = useState(fetchedData);
  useEffect(()=>{
    setData(()=>{
      const newData = [];
      for (let i = fetchedData.length - 1; i >= fetchedData.length - DATAPOINTS && i >= 0; i--) {
        newData.unshift(fetchedData[i]);
        console.log(fetchedData[i]);
      }
      return newData;
    })
  }, [fetchedData]);


  return (
    <LineChart
      width={730}
      height={250}
      data={data}
      margin={{ top: 5, right: 30, left: 20, bottom: 5 }}
    >
      <XAxis dataKey="time" />
      <YAxis />
      <Tooltip />
      <Legend />
      <Line type="monotone" dataKey="current" stroke="#8884d8" />
    </LineChart>
  );
}