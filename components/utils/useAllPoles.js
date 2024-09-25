import { useEffect, useState } from "react";
import { pb } from "./utils";



export function useAllPoles() {
  const [records, setRecords] = useState([]);
  const [loaded, setLoaded] = useState(false);
  useEffect(() => {
    const initialize = async () => {
      const records = await pb.collection("Poles").getFullList();
      setRecords(records);
      setLoaded(true);
    };
    initialize();
    pb.collection("Poles").subscribe(
      "*",
      function (e) {
        if (e.action === "update") {
          initialize();
        }
      }
    );
    return () => {
      pb.collection("Poles").unsubscribe(); // remove all '*' topic subscriptions
    };
  }, []);
  return [records, loaded];
}
