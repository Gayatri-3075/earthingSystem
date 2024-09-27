import MapComponent from "@/components/Map";
import Search from "@/components/search";
import { Card, CardContent, CardTitle } from "@/components/ui/card";
import { MapProvider } from "@/components/utils/context";

export default function Health() {
    return (
      <div className="grid grid-cols-[2fr_10fr] w-full h-[48rem] gap-2 px-2">
        <MapProvider>
            <Card className="py-3 pl-3 text-xl flex flex-col items-start">
                <CardContent className="p-0 h-2/5 w-full">
                    <Search />
                </CardContent>
            </Card>
            <Card className="h-full w-full p-2 bg-slate-400">
                <MapComponent />
            </Card>
        </MapProvider>
      </div>
    );
}