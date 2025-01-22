
"use client";
import { AccordionItemComponent } from "@/app/page";
import {
  Accordion,
} from "@/components/ui/accordion";
import { NavigateTo } from "./NavigateTo";
import { useEffect, useState } from "react";
import { convertCoords, getTimeDataSorted, pb } from "./utils/utils";
import { revalidateTag } from "next/cache";
import { useUpdates } from "./utils/context";

const fetch = async () => {
  console.log("Trying to update");
  let areas = await pb.collection("Areas").getFullList({
    expand: "Poles",
    cache: "no-store",
  });
  areas = areas
    .map((area) => {
      const dangerpoles = area.expand?.Poles?.filter((pole) => pole.critical);
      if (!dangerpoles || dangerpoles == 0) return;
      return {
        areaName: area.AreaName,
        polesInDanger: dangerpoles.length,
        poles: dangerpoles.map((pole) => ({
          number: pole.poleid,
          coordinates: convertCoords(pole.Coordinates),
        })),
      };
    })
    .filter((area) => area);
  return areas;
};

async function AreaList({ critAreas }) {
    
    const [critAreasData, setCritAreasData] = useState(critAreas);
    const {callback} = useUpdates();

    useEffect(() => {
        const cb = {
            action: "update",
            callback: async (e) => {
                if (e.critical === true) {
                    const lastRecord = (await getTimeDataSorted(e.poleid, 2))[1];
                    if (lastRecord.critical === false) {
                        const data = await fetch();
                        console.log(data);
                        setCritAreasData(data);
                    }
                }
            }
        }
        callback.current.push(cb);
        return () => {
            callback.current = callback.current.filter(
                (item) => item !== cb
            );
        };

    }, [])



  return (
    <Accordion type="single" collapsible className="w-full mt-[-2rem]">
      {critAreasData.map((area) => (
        <AccordionItemComponent
          key={area.areaName}
          areaName={area.areaName}
          polesInDanger={area.polesInDanger}
        >
          {area.poles.map((pole) => (
            <li key={pole.number} className="flex justify-between items-center">
              Pole {pole.number}
              <NavigateTo pole={pole} />
            </li>
          ))}
        </AccordionItemComponent>
      ))}
    </Accordion>
  );
}

export default AreaList;