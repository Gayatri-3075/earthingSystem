import Image from "next/image";
import PocketBase from "pocketbase";
import { config } from "dotenv";
import LiveSwitch from "@/components/LiveSwitch";
import LeakageChart from "@/components/LiveCharts";

config();
const pb = new PocketBase(process.env.dbip);



export default function Home() {
  // Subscribe to the "Poles" collection

  
  return (
    <div className="grid grid-rows-[20px_1fr_20px] items-center justify-items-center min-h-screen p-8 pb-20 gap-16 sm:p-20 font-[family-name:var(--font-geist-sans)]">
      <main className="flex flex-col gap-8 row-start-2 items-center sm:items-start">
        <div className="flex flex-col gap-8 row-start-2 items-center sm:items-start">
          page.js
          <LeakageChart />
        </div>
      </main>
    </div>
  );
}
