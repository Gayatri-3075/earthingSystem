import { AreasChart } from "@/components/areaChart";
import { DataTableDemo } from "@/components/table";

export default function Losses() {
    return (
        <div className="grid grid-rows-2 grid-cols-3 gap-4 px-5">
            <DataTableDemo />
            <AreasChart />
        </div>

    )
}