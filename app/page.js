import Image from "next/image";
import PocketBase from "pocketbase";
import { config } from "dotenv";
import LiveSwitch from "@/components/LiveSwitch";
import LiveChart from "@/components/LiveCharts";
import BoringLeakageChart from "@/components/oldchart";
import MapComponent from "@/components/Map";

config();
const pb = new PocketBase(process.env.dbip);



export default function Home() {
  
  return (
    <div className="font-[family-name:var(--font-geist-sans)] max-w-4xl px-5">
      
      <MapComponent />
    </div>
  );
}
