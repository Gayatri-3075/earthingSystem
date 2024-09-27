// hooks/useLeakageData.js

import { useEffect, useState } from "react";
import PocketBase from "pocketbase";
import { getidbyPoleid, getTimeDataSorted } from "./utils";

// Initialize PocketBase outside the hook to prevent multiple instances
const pb = new PocketBase(process.env.NEXT_PUBLIC_dbip);
let initialized = false;


/**
 * Custom hook to fetch and subscribe to leakage data from PocketBase.
 * @returns {Array} leakageData - Array of leakage data points.
 */

const useLeakageData = (poleid="PID1") => {
  
  // await getTimeDataSorted(poleid); // initialize the use state with this value
  const [leakageData, setLeakageData] = useState(
    [
      {
        time: (new Date()).toTimeString().match(/\d{2}:\d{2}:\d{2}/)[0],
        current: Math.floor(Math.random() * 5)
      }
    ]
  );

  useEffect(() => {
    let recordid;
    const initialize = async () => {
    // Subscribe to real-time updates on the "Poles" collection
      console.log("async useEffect");
      if (!initialized) {
        const records = await getTimeDataSorted(poleid);
        setLeakageData(records);
        initialized = true;
      }
      recordid = await getidbyPoleid(poleid); 
      pb.collection("Poles").subscribe(recordid, (e) => {
        if (e.action === "update") {
          console.log("update", e.record.poleid, e.record.leakage);
          setLeakageData((prevData) => [
            ...prevData,
            { time: (new Date()).toTimeString().match(/\d{2}:\d{2}:\d{2}/)[0], current: e.record.leakage },
          ]);
        }
      });
    }
    initialize();

    // Cleanup function to unsubscribe when the component unmounts
    return () => {
      pb.collection("Poles").unsubscribe(recordid);
    };
  }, []);

// return current time and value in object
  return leakageData;
};

export default useLeakageData;
