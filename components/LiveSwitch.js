"use client";
import { useEffect, useState } from "react";
import PocketBase from "pocketbase";
import { config } from "dotenv";
config();

const pb = new PocketBase("http://localhost:8090");

export default function LiveSwitch() {
  const [danger, setDanger] = useState(false);

  useEffect(() => {
    pb.collection("Poles").subscribe(
      "*",
      function (e) {
        if (e.action === "update") {
            console.log("update", e.record.poleid, e.record.danger);
            setDanger(e.record.danger);
        }
      },
      {
        /* other options like expand, custom headers, etc. */
      }
    );
    return () => {
      pb.collection("Poles").unsubscribe(); // remove all '*' topic subscriptions
    };
  }, []);

  // return slider button
  return (
    <div className="flex items-center justify-center">
      
        {danger ? "Stop Live" : "Start Live"}
    </div>
  );
}