export interface FlightOffersSearchRequest {
  origin: string;
  destination: string;
  departureDate: string;
  returnDate?: string;
  passengers: {
    adults: number;
    children?: number;
    infants?: number;
  };
  cabinClass?: "ECONOMY" | "PREMIUM_ECONOMY" | "BUSINESS" | "FIRST";
}
