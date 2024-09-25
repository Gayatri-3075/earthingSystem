'use client';

import { toast } from "@/hooks/use-toast";
import useCriticalAlert from "./utils/useCriticalAlert";
import { Toaster } from "./ui/toaster";
import { ToastAction } from "@radix-ui/react-toast";

export default function Alert() {
    const [criticalRecord, setCriticalRecord] = useCriticalAlert();
    if (criticalRecord.critical === true) {
        toast({
            variant: "destructive",
            title: `${criticalRecord.time} Pole Failure`,
            description: `${criticalRecord.poleid} failed just now`,
            action: <ToastAction altText="Maps"> Maps </ToastAction>,
        })
        setInterval(()=>setCriticalRecord({ critical: false }), 0);

    }
    
    return <>
    {/* <button className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded" onClick={() => setCriticalRecord({critical: true})}>Critical Alert</button> */}
    </>
}