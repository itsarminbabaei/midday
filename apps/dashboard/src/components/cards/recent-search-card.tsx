import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@travelese/ui/accordion";
import { ScrollArea } from "@travelese/ui/scroll-area";
import {
  Sheet,
  SheetContent,
  SheetHeader,
} from "@travelese/ui/sheet";
import { Button } from "@travelese/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@travelese/ui/card";
import { Icons } from "@travelese/ui/icons";
import { parseAsBoolean, parseAsString, useQueryStates } from "nuqs";
import { useState } from "react";

export function RecentSearchCard({
  id,
  from,
  to,
  departDate,
  returnDate,
  travellers,
  cabinClass,
  tripType,
  price,
  onSearch,
  flightDetails,
}: {
  id: string;
  from: string;
  to: string;
  departDate: string;
  returnDate: string;
  travellers: number;
  cabinClass: string;
  tripType: string;
  price: number;
  onSearch: () => void;
  flightDetails?: {
    airline: string;
    duration: string;
    stops: number;
    layovers?: string[];
  };
}) {
  const [params, setParams] = useQueryStates({
    search: parseAsString,
    details: parseAsBoolean,
  });

  const [isLoading, setLoading] = useState(false);

  const handleSearch = async () => {
    setLoading(true);
    await onSearch();
    setLoading(false);
  };

  return (
    <Card key={id} className="w-full flex flex-col">
      <Sheet 
        open={params.search === id} 
        onOpenChange={() => setParams(null)}
      >
        <div className="pt-6 px-6 h-16 flex items-center justify-between">
          <div className="p-2 bg-white/5 rounded-lg">
            <Icons.PlaneArrival className="h-5 w-5 text-gray-400" />
          </div>

          <span className="text-[#878787] bg-[#F2F1EF] text-[10px] dark:bg-[#1D1D1D] px-3 py-1 rounded-full font-mono">
            Recent
          </span>
        </div>

        <CardHeader className="pb-0">
          <div className="flex items-center space-x-2 pb-4">
            <CardTitle className="text-md font-medium leading-none p-0 m-0">
              <div className="flex items-center gap-2 text-sm text-gray-400">
          <Icons.Calendar className="h-3 w-3" />
          <span>{departDate}</span>
          <span>-</span>
          <span>{returnDate}</span>
        </div>
            </CardTitle>
          </div>
        </CardHeader>

        <CardContent className="text-xs text-[#878787] pb-4">
          <div className="flex items-center gap-2 text-sm text-gray-400">
          <Icons.User className="h-3 w-3" />
          <span>{travellers} traveller, {cabinClass}</span>
        </div>

        <div className="flex items-center gap-2 text-sm text-gray-400">
          <Icons.ArrowRotate className="h-3 w-3" />
          <span>{tripType}</span>
        </div>
        </CardContent>

        <div className="px-6 pb-6 flex gap-2 mt-auto">
          <Button
            variant="outline"
            className="w-full"
            onClick={() => setParams({ search: id })}
          >
            Details
          </Button>

          <Button
            variant="outline"
            className="w-full"
            onClick={handleSearch}
            disabled={isLoading}
          >
            {isLoading ? "Searching..." : "Repeat Search"}
          </Button>
        </div>

        <SheetContent>
          <SheetHeader>
            <div className="flex items-center justify-between border-b border-border pb-2">
              <div className="flex items-center space-x-2">
                <Icons.PlaneArrival className="h-5 w-5 text-gray-400" />
                <div>
                  <div className="flex items-center space-x-2">
                    <h3 className="text-lg leading-none">{from} → {to}</h3>
                  </div>
                  <span className="text-xs text-[#878787]">
                    {tripType} • {travellers} travellers
                  </span>
                </div>
              </div>

              <Button
                variant="outline"
                className="w-full border-primary"
                onClick={handleSearch}
                disabled={isLoading}
              >
                {isLoading ? "Searching..." : "Repeat Search"}
              </Button>
            </div>
          </SheetHeader>

          <ScrollArea className="h-[calc(100vh-530px)] pt-2" hideScrollbar>
            <Accordion
              type="multiple"
              defaultValue={["details", "itinerary"]}
              className="mt-4"
            >
              <AccordionItem value="details" className="border-none">
                <AccordionTrigger>Search Details</AccordionTrigger>
                <AccordionContent className="text-[#878787] text-sm">
                  <div className="space-y-2">
                    <div className="flex justify-between">
                      <span>Departure</span>
                      <span>{departDate}</span>
                    </div>
                    <div className="flex justify-between">
                      <span>Return</span>
                      <span>{returnDate}</span>
                    </div>
                    <div className="flex justify-between">
                      <span>Travellers</span>
                      <span>{travellers}</span>
                    </div>
                    <div className="flex justify-between">
                      <span>Cabin Class</span>
                      <span>{cabinClass}</span>
                    </div>
                    <div className="flex justify-between">
                      <span>Price</span>
                      <span>${price}</span>
                    </div>
                  </div>
                </AccordionContent>
              </AccordionItem>

              {flightDetails && (
                <AccordionItem value="itinerary" className="border-none">
                  <AccordionTrigger>Flight Itinerary</AccordionTrigger>
                  <AccordionContent className="text-[#878787] text-sm">
                    <div className="space-y-2">
                      <div className="flex justify-between">
                        <span>Airline</span>
                        <span>{flightDetails.airline}</span>
                      </div>
                      <div className="flex justify-between">
                        <span>Duration</span>
                        <span>{flightDetails.duration}</span>
                      </div>
                      <div className="flex justify-between">
                        <span>Stops</span>
                        <span>{flightDetails.stops}</span>
                      </div>
                      {flightDetails.layovers && (
                        <div>
                          <span>Layovers</span>
                          <ul className="list-disc pl-4">
                            {flightDetails.layovers.map((layover, index) => (
                              <li key={index}>{layover}</li>
                            ))}
                          </ul>
                        </div>
                      )}
                    </div>
                  </AccordionContent>
                </AccordionItem>
              )}
            </Accordion>
          </ScrollArea>

          <div className="absolute bottom-4 pt-8 border-t border-border">
            <p className="text-[10px] text-[#878787]">
              Prices and availability may change. Always verify current details.
            </p>
          </div>
        </SheetContent>
      </Sheet>
    </Card>
  );
}

