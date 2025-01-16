"use client";

import { searchTravelAction } from "@/actions/travel/search-travel-action";
import { searchTravelSchema } from "@/actions/schema";
import { RecentSearchCard } from "@/components/cards/recent-search-card";
import { TravelLocation } from "@/components/travel/travel-location";
import { TravelPeriod } from "@/components/travel/travel-period";
import { TravelType } from "@/components/travel/travel-type";
import { TravelTravellerCabin } from "@/components/travel/travel-traveller-cabin";
import { zodResolver } from "@hookform/resolvers/zod";
import { Button } from "@travelese/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from "@travelese/ui/form";
import { Icons } from "@travelese/ui/icons";
import { Separator } from "@travelese/ui/separator";
import { ShineBorder } from "@travelese/ui/shine-border";
import { SubmitButton } from "@travelese/ui/submit-button";
import { useToast } from "@travelese/ui/use-toast";
import { useAction } from "next-safe-action/hooks";
import { useForm } from "react-hook-form";
import type { z } from "zod";

const recentSearches = [
  {
    from: "Toronto",
    to: "Vancouver",
    departDate: "Sat 1/2",
    returnDate: "Sat 8/2",
    travellers: 1,
    cabinClass: "Economy",
    tripType: "Round-trip",
    price: 182,
  },
  {
    from: "Vancouver",
    to: "Calgary",
    departDate: "Sat 8/2",
    returnDate: "Sat 15/2",
    travellers: 1,
    cabinClass: "Economy",
    tripType: "Round-trip",
    price: 200,
  },
  {
    from: "New York",
    to: "Los Angeles",
    departDate: "Mon 3/2",
    returnDate: "Mon 10/2",
    travellers: 1,
    cabinClass: "Economy",
    tripType: "Round-trip",
    price: 250,
  },
];

type Props = {
  userId: string;
  currency: string;
  searchType: "flights";
  onChange?: (updates: Partial<z.infer<typeof searchTravelSchema>>) => void;
};

export function TravelSearchForm({
  userId,
  currency,
  searchType,
  onChange = () => { },
}: Props) {
  const { toast } = useToast();

  const searchTravel = useAction(searchTravelAction, {
    onSuccess: () => {
      toast({
        title: "Travel Search",
        description: "Travel Search Successful",
        variant: "success",
      });
    },
  });

  const form = useForm<z.infer<typeof searchTravelSchema>>({
    resolver: zodResolver(searchTravelSchema),
    defaultValues: {
      search_type: searchType,
      user_id: userId,
      currency,
      travel_type: "one_way",
      slices: [{ origin: "", destination: "", departure_date: "" }],
      passengers: [{ type: "adult" }],
    },
  });

  const isSubmitting = searchTravel.status === "executing";
  const travelType = form.watch("travel_type");
  const slices = form.watch("slices") || [];

  const handleSwapLocations = () => {
    const currentSlices = form.getValues("slices");
    const origin = currentSlices[0].origin;
    const destination = currentSlices[0].destination;

    form.setValue("slices.0.origin", destination);
    form.setValue("slices.0.destination", origin);
    onChange({
      slices: [
        {
          ...currentSlices[0],
          origin: destination,
          destination: origin,
        },
      ],
    });
  };

  const addFlightSegment = () => {
    const currentSlices = form.getValues("slices") || [];
    if (currentSlices.length < 6) {
      const newSlices = [
        ...currentSlices,
        { origin: "", destination: "", departure_date: "" },
      ];
      form.setValue("slices", newSlices);
      onChange({ slices: newSlices });
    }
  };

  const removeFlightSegment = (index: number) => {
    const currentSlices = form.getValues("slices") || [];
    if (currentSlices.length > 2) {
      const newSlices = currentSlices.filter((_, i) => i !== index);
      form.setValue("slices", newSlices);
      onChange({ slices: newSlices });
    }
  };
  return (
    <div className="min-h-[calc(100vh-100px)] bg-background text-primary flex flex-col items-center justify-center p-4 relative">
      <div className="w-full max-w-4xl space-y-4">
        <Form {...form}>
          <form onSubmit={form.handleSubmit(searchTravel.execute)}>
            <ShineBorder
              borderRadius={12}
              borderWidth={1}
              duration={10}
              color={["#ffffff33", "#ffffff66"]}
              className="w-full bg-card/50 space-y-4"
            >
              <div className="w-full max-w-4xl rounded-2xl backdrop-blur-sm">
                <div className="flex gap-2 pl-1">
                  <FormField
                    control={form.control}
                    name="travel_type"
                    render={({ field }) => (
                      <FormItem>
                        <FormControl>
                          <TravelType
                            value={
                              field.value as "one_way" | "return" | "multi_city"
                            }
                            onChange={(value) => {
                              field.onChange(value);
                              if (value === "multi_city" && slices.length < 2) {
                                form.setValue("slices", [
                                  ...slices,
                                  {
                                    origin: "",
                                    destination: "",
                                    departure_date: "",
                                  },
                                ]);
                              }
                              onChange({ travel_type: value });
                            }}
                            disabled={isSubmitting}
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={form.control}
                    name="passengers"
                    render={({ field }) => (
                      <FormItem>
                        <FormControl>
                          <TravelTravellerCabin
                            form={form}
                            searchType={searchType}
                            onChange={onChange}
                            isSubmitting={isSubmitting}
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>
              </div>

              {travelType === "multi_city" ? (
                <>
                  {slices.map((_, index) => (
                    <div
                      key={index}
                      className="w-full flex bg-card rounded-lg overflow-hidden p-1 space-x-1 items-center border"
                    >
                      <div className="flex-1">
                        <FormField
                          control={form.control}
                          name={`slices.${index}.origin`}
                          render={({ field }) => (
                            <FormItem>
                              <FormControl>
                                <TravelLocation
                                  type="origin"
                                  placeholder="Origin"
                                  value={field.value}
                                  onChange={(value, place) => {
                                    field.onChange(value);
                                    const newSlices = [...slices];
                                    newSlices[index] = {
                                      ...newSlices[index],
                                      origin: place?.iata_code || value,
                                    };
                                    onChange({ slices: newSlices });
                                  }}
                                  searchType={searchType}
                                />
                              </FormControl>
                              <FormMessage />
                            </FormItem>
                          )}
                        />
                      </div>

                      <Separator
                        orientation="vertical"
                        className="h-8 bg-muted-foreground"
                      />

                      <Button
                        size="icon"
                        variant="ghost"
                        onClick={handleSwapLocations}
                      >
                        <Icons.ArrowRotate className="size-4" />
                      </Button>

                      <Separator
                        orientation="vertical"
                        className="h-8 bg-muted-foreground"
                      />

                      <div className="flex-1">
                        <FormField
                          control={form.control}
                          name={`slices.${index}.destination`}
                          render={({ field }) => (
                            <FormItem>
                              <FormControl>
                                <TravelLocation
                                  type="destination"
                                  placeholder="Destination"
                                  value={field.value}
                                  onChange={(value, place) => {
                                    field.onChange(value);
                                    const newSlices = [...slices];
                                    newSlices[index] = {
                                      ...newSlices[index],
                                      destination: place?.iata_code || value,
                                    };
                                    onChange({ slices: newSlices });
                                  }}
                                  searchType={searchType}
                                />
                              </FormControl>
                              <FormMessage />
                            </FormItem>
                          )}
                        />
                      </div>

                      <Separator
                        orientation="vertical"
                        className="h-8 bg-muted-foreground"
                      />

                      <div className="flex-1">
                        <FormField
                          control={form.control}
                          name={`slices.${index}.departure_date`}
                          render={({ field }) => (
                            <FormItem>
                              <FormControl>
                                <TravelPeriod
                                  value={{
                                    from: field.value,
                                    to: undefined,
                                  }}
                                  travelType="one_way"
                                  index={index}
                                  onChange={(value) => {
                                    field.onChange(value.from);
                                    const newSlices = [...slices];
                                    newSlices[index] = {
                                      ...newSlices[index],
                                      departure_date: value.from,
                                    };
                                    onChange({ slices: newSlices });
                                  }}
                                />
                              </FormControl>
                              <FormMessage />
                            </FormItem>
                          )}
                        />
                      </div>

                      {slices.length > 2 && (
                        <Button
                          type="button"
                          variant="ghost"
                          size="icon"
                          onClick={() => removeFlightSegment(index)}
                        >
                          <Icons.Close className="size-4" />
                        </Button>
                      )}
                    </div>
                  ))}

                  <div className="w-full flex justify-end space-x-2 items-center pt-2">
                    <Button
                      type="button"
                      variant="outline"
                      className="w-auto"
                      onClick={addFlightSegment}
                      disabled={slices.length >= 6}
                    >
                      Add another flight
                    </Button>

                    <SubmitButton
                      className="w-auto"
                      isSubmitting={isSubmitting}
                    >
                      Search
                    </SubmitButton>
                  </div>
                </>
              ) : (
                <div className="w-full flex bg-card rounded-lg overflow-hidden p-1 space-x-1 items-center border">
                  <div className="flex-1">
                    <FormField
                      control={form.control}
                      name="slices.0.origin"
                      render={({ field }) => (
                        <FormItem>
                          <FormControl>
                            <TravelLocation
                              type="origin"
                              placeholder="Origin"
                              value={field.value}
                              onChange={(value, place) => {
                                field.onChange(value);
                                onChange({
                                  slices: [
                                    {
                                      ...form.getValues("slices")[0],
                                      origin: place?.iata_code,
                                    },
                                  ],
                                });
                              }}
                              searchType={searchType}
                            />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  </div>

                  <Separator
                    orientation="vertical"
                    className="h-8 bg-muted-foreground"
                  />

                  <Button
                    size="icon"
                    variant="ghost"
                    onClick={handleSwapLocations}
                  >
                    <Icons.ArrowRotate className="size-4" />
                  </Button>

                  <Separator
                    orientation="vertical"
                    className="h-8 bg-muted-foreground"
                  />

                  <div className="flex-1">
                    <FormField
                      control={form.control}
                      name="slices.0.destination"
                      render={({ field }) => (
                        <FormItem>
                          <FormControl>
                            <TravelLocation
                              type="destination"
                              placeholder="Destination"
                              value={field.value}
                              onChange={(value, place) => {
                                field.onChange(value);
                                onChange({
                                  slices: [
                                    {
                                      ...form.getValues("slices")[0],
                                      destination: place?.iata_code,
                                    },
                                  ],
                                });
                              }}
                              searchType={searchType}
                            />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  </div>

                  <Separator
                    orientation="vertical"
                    className="h-8 bg-muted-foreground"
                  />

                  <div className="flex-1">
                    <FormField
                      control={form.control}
                      name="slices.0.departure_date"
                      render={({ field }) => (
                        <FormItem>
                          <FormControl>
                            <TravelPeriod
                              value={{
                                from: field.value,
                                to: undefined,
                              }}
                              travelType={travelType}
                              index={0}
                              onChange={(value) => {
                                field.onChange(value.from);
                                onChange({
                                  slices: [
                                    {
                                      ...form.getValues("slices")[0],
                                      departure_date: value.from,
                                    },
                                  ],
                                });
                              }}
                            />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  </div>

                  <div className="flex items-center py-1">
                    <SubmitButton
                      className="w-full"
                      isSubmitting={isSubmitting}
                    >
                      Search
                    </SubmitButton>
                  </div>
                </div>
              )}
            </ShineBorder>
          </form>
        </Form>
        <div className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {recentSearches.map((search, index) => (
              <RecentSearchCard
                key={index}
                {...search}
                onSearch={() => console.log("Searching...", search)}
              />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
