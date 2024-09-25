
import { useEffect, useState } from "react";
let bool = true;
const newRandData = () => ({
                                date: (new Date()).toTimeString().match(/\d{2}:\d{2}:\d{2}/)[0],
                                value: Math.floor(Math.random() * 5)
                            })

export default function useLeakRandom() {
    const [leakage, setLeakage] = useState([
        0, 0, 0, 0, 0, 0, 0, 0, 0, 0
    ]);
    useEffect(() => {
        // send min len 10, fill with 0 in beginning
        const interval = setInterval(() => {
            setLeakage((prevData)=> {
                let i = 0;
                if (prevData.at(0)!==0){
                    return [...prevData, newRandData()];
                }
                while (prevData.at(--i) !== 0);
                prevData[leakage.length + i] = newRandData();
                return [...prevData];
            }
        );
        }, 300);
        return () => clearInterval(interval);
    }, []);
    return leakage;
}