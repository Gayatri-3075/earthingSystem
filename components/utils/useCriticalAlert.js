import { useEffect, useState } from "react";
import PocketBase from "pocketbase";
import { getTimeDataSorted } from "./utils";


const pb = new PocketBase(process.env.NEXT_PUBLIC_dbip);

export default function useCriticalAlert() {
  const [criticalRecord, setCriticalRecord] = useState({critical: false});

  useEffect(() => {
    pb.collection("Poles").subscribe(
      "*",
      function (e) {
        if (e.action === "update") {
          if (e.record.critical === true) {
            const temp = async () => {
                const lastRecord = (await getTimeDataSorted(e.record.poleid, 2))[1];
                if (lastRecord.critical === false){
                    setCriticalRecord(e.record);
                }
            }
            temp();
          }
        }
      }
    );
    return () => {
      pb.collection("Poles").unsubscribe(); // remove all '*' topic subscriptions
    };
  }, []);
  return [criticalRecord, setCriticalRecord];
}