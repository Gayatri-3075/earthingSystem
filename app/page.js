import Image from "next/image";
import PocketBase from "pocketbase";
import { config } from "dotenv";
import LiveSwitch from "@/components/LiveSwitch";
import LiveChart from "@/components/LiveCharts";
import BoringLeakageChart from "@/components/oldchart";
import MapComponent from "@/components/Map";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import {
  HoverCard,
  HoverCardContent,
  HoverCardTrigger,
} from "@/components/ui/hover-card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { MapProvider } from "@/components/utils/context";
import { NavigateTo } from "@/components/NavigateTo";


config();
const pb = new PocketBase(process.env.dbip);

const areas = [
  {
    areaName: "Chandni Chowk",
    polesInDanger: 3,
    poles: [
      { number: 110, coordinates: { lat: 22.2964, lng: 88.4421 } },
      { number: 111 },
      { number: 112 }
    ]
  },
  {
    areaName: "Karol Bagh",
    polesInDanger: 4,
    poles: [
      { number: 210 },
      { number: 211 },
      { number: 212 },
      { number: 213 }
    ]
  },
  {
    areaName: "Connaught Place",
    polesInDanger: 2,
    poles: [
      { number: 310 },
      { number: 311 }
    ]
  },
  {
    areaName: "Saket",
    polesInDanger: 3,
    poles: [
      { number: 410 },
      { number: 411 },
      { number: 412 }
    ]
  }
];

const AccordionItemComponent = ({ areaName, polesInDanger, children }) => (
  <AccordionItem value={areaName.toLowerCase().replace(/\s+/g, "-")} className="pl-3">
    <AccordionTrigger>
      <div className="flex flex-col">
        <span className="text-lg font-bold text-left">{areaName}</span>
        <span className="text-xs text-gray-500 text-left">
          Poles in danger: {polesInDanger}
        </span>
      </div>
    </AccordionTrigger>
    <AccordionContent>
      <ul>{children}</ul>
    </AccordionContent>
  </AccordionItem>
);

export default function Home() {
  
  return (
    <div className="font-[family-name:var(--font-geist-sans)] px-5 grid place-items-center mapgrid w-full gap-4">
      <MapProvider>
        <Card className="text-left overflow-y-scroll h-full w-full justify-self-start scroll-smooth scroll-w-thin max-h-[25rem]">
          <CardHeader>
            <CardTitle className="text-lg font-bold items-center text-2xl">
              Significant Leakages
            </CardTitle>
            <CardDescription className="text-sm text-gray-500">
              Areas with significant power loss due to pole leakages
            </CardDescription>
            <HoverCard>
              <HoverCardTrigger asChild>
                <Avatar className="self-end absolute -translate-y-2 translate-x-4">
                  <AvatarImage src="/icons/info.png" className="size-6" />
                  <AvatarFallback>i</AvatarFallback>
                </Avatar>
              </HoverCardTrigger>
              <HoverCardContent>
                These poles are potentially dangerous to nearby people and have
                abnormal amount of leakage. These poles have been specifically
                flagged by the our ml model that has analyzed thier leakage
                current data over a period of time.
              </HoverCardContent>
            </HoverCard>
          </CardHeader>
          <CardContent className="px-5">
            <Accordion type="single" collapsible className="w-full mt-[-2rem]">
              {areas.map((area) => (
                <AccordionItemComponent
                  key={area.areaName}
                  areaName={area.areaName}
                  polesInDanger={area.polesInDanger}
                >
                  {area.poles.map((pole) => (
                    <li
                      key={pole.number}
                      className="flex justify-between items-center"
                    >
                      Pole {pole.number}
                      <NavigateTo pole={pole} />
                    </li>
                  ))}
                </AccordionItemComponent>
              ))}
            </Accordion>
          </CardContent>
        </Card>

        <div className="w-full h-full">
          <MapComponent />
        </div>

        <Card className="text-left overflow-y-scroll h-full w-full justify-self-start scroll-smooth scroll-w-thin max-h-[22rem] self-start">
          <CardHeader>
            <CardTitle className="text-lg font-bold items-center text-2xl">
              Poles Offline
            </CardTitle>
            <CardDescription className="text-sm text-gray-500">
              Areas with significant power loss due to pole leakages
            </CardDescription>
            <HoverCard>
              <HoverCardTrigger asChild>
                <Avatar className="self-end absolute -translate-y-2 translate-x-4">
                  <AvatarImage src="/icons/info.png" className="size-6" />
                  <AvatarFallback>i</AvatarFallback>
                </Avatar>
              </HoverCardTrigger>
              <HoverCardContent>
                These poles are potentially dangerous to nearby people and have
                abnormal amount of leakage. These poles have been specifically
                flagged by the our ml model that has analyzed thier leakage
                current data over a period of time.
              </HoverCardContent>
            </HoverCard>
          </CardHeader>
          <CardContent className="px-5">
            <Accordion type="single" collapsible className="w-full mt-[-2rem]">
              {areas.map((area) => (
                <AccordionItemComponent
                  key={area.areaName}
                  areaName={area.areaName}
                  polesInDanger={area.polesInDanger}
                >
                  {area.poles.map((pole) => (
                    <li
                      key={pole.number}
                      className="flex justify-between items-center"
                    >
                      Pole {pole.number}
                      <NavigateTo pole={pole} />
                    </li>
                  ))}
                </AccordionItemComponent>
              ))}
            </Accordion>
          </CardContent>
        </Card>

        <div className="">
          <BoringLeakageChart />
        </div>
      </MapProvider>
    </div>
  );
}


      
