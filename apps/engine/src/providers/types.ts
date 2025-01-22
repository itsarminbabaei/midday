import type { AccountType } from "@/utils/account";

export type Providers =
  | "duffel"
  | "amadeus"
  | "teller"
  | "plaid"
  | "gocardless";

export type ProviderParams = {
  provider: Providers;
  kv: KVNamespace;
  fetcher?: Fetcher | null; // Teller
  envs: {
    DUFFEL_TRAVELESE_PRO_ACCESS_TOKEN: string;
    AMADEUS_API_KEY: string;
    AMADEUS_API_SECRET: string;
    GOCARDLESS_SECRET_KEY: string;
    GOCARDLESS_SECRET_ID: string;
    PLAID_CLIENT_ID: string;
    PLAID_SECRET: string;
    PLAID_ENVIRONMENT: string;
  };
};

export type CabinClass = "economy" | "premium_economy" | "business" | "first";

export type PassengerType = "adult" | "child" | "infant";

export type SearchFlightsRequest = {
  origin: string;
  destination: string;
  departureDate: string;
  returnDate?: string;
  passengers: {
    adults: number;
    children?: number;
    infants?: number;
  };
  cabinClass: CabinClass;
};

export type SearchFlightsResponse = {
  offers: FlightOffer[];
  metadata: OfferMetadata;
};

export type GetOffersRequest = {
  offerId: string;
};

export type GetOffersResponse = {
  offer: FlightOffer;
};

export type GetPricingRequest = {
  offerId: string;
  passengers?: PassengerSelection[];
};

export type GetPricingResponse = {
  price: Price;
  conditions: PricingConditions;
};

export type CreateOrderRequest = {
  offerId: string;
  passengers: PassengerDetails[];
  contact: ContactInfo;
  paymentInfo?: PaymentDetails;
};

export type CreateOrderResponse = {
  orderId: string;
  status: OrderStatus;
  price: Price;
  passengers: PassengerInfo[];
  tickets?: TicketInfo[];
};

export type RetrieveOrderRequest = {
  orderId: string;
};

export type RetrieveOrderResponse = {
  order: Order;
};

export type CancelOrderRequest = {
  orderId: string;
  reason?: string;
};

export type CancelOrderResponse = {
  status: OrderStatus;
  refundAmount?: Price;
};

export type ModifyOrderRequest = {
  orderId: string;
  modifications: OrderModification[];
};

export type ModifyOrderResponse = {
  order: Order;
  changesFee?: Price;
};

export type AddAncillariesRequest = {
  orderId: string;
  services: AncillaryService[];
};

export type AddAncillariesResponse = {
  order: Order;
  addedServices: AncillaryService[];
};

export type FlightOffer = {
  id: string;
  price: Price;
  segments: FlightSegment[];
  available_services: AncillaryService[];
  conditions?: OfferConditions;
  validUntil: string;
};

export type FlightSegment = {
  id: string;
  departure: {
    airport: string;
    terminal?: string;
    time: string;
  };
  arrival: {
    airport: string;
    terminal?: string;
    time: string;
  };
  carrier: {
    code: string;
    name: string;
  };
  flightNumber: string;
  aircraft?: {
    code: string;
    name: string;
  };
  duration: string;
  stops: Stop[];
  cabinClass: CabinClass;
};

export type Price = {
  amount: number;
  currency: string;
  breakdown?: PriceBreakdown;
};

export type PriceBreakdown = {
  base: number;
  taxes: number;
  fees: number;
  services?: number;
};

export type PassengerDetails = {
  type: PassengerType;
  title?: string;
  firstName: string;
  lastName: string;
  dateOfBirth: string;
  email?: string;
  phone?: string;
  documents?: TravelDocument[];
};

export type TravelDocument = {
  type: "passport" | "id_card" | "visa";
  number: string;
  issuingCountry: string;
  expiryDate: string;
};

export type ContactInfo = {
  email: string;
  phone: string;
  address?: Address;
};

export type Address = {
  street: string;
  city: string;
  postalCode: string;
  country: string;
};

export type OrderStatus =
  | "pending"
  | "confirmed"
  | "ticketed"
  | "cancelled"
  | "modified";

export type AncillaryService = {
  id: string;
  type: "baggage" | "seat" | "meal" | "lounge" | "insurance";
  price: Price;
  details: Record<string, unknown>;
};

export type OrderModification = {
  type: "change_flight" | "add_service" | "remove_service" | "change_passenger";
  details: Record<string, unknown>;
};

export type Stop = {
  airport: string;
  duration: string;
  arrivalTime: string;
  departureTime: string;
};

export type OfferMetadata = {
  currency: string;
  totalResults: number;
  provider: Providers;
};

export type OfferConditions = {
  changeAllowed: boolean;
  refundAllowed: boolean;
  changeFee?: Price;
  refundFee?: Price;
};

export type PricingConditions = {
  validUntil: string;
  availableSeats: number;
  restrictions?: string[];
};

export type PassengerSelection = {
  type: PassengerType;
  count: number;
};

export type Order = {
  id: string;
  status: OrderStatus;
  price: Price;
  passengers: PassengerInfo[];
  flights: FlightSegment[];
  services?: AncillaryService[];
  contact: ContactInfo;
  created: string;
  modified?: string;
};

export type PassengerInfo = PassengerDetails & {
  id: string;
  ticketNumber?: string;
  services?: AncillaryService[];
};

export type TicketInfo = {
  ticketNumber: string;
  passengerId: string;
  status: "issued" | "void" | "refunded";
  issuedAt: string;
};

export type PaymentDetails = {
  type: "card" | "bank_transfer" | "paypal";
  token?: string;
  details: Record<string, unknown>;
};

export type Transaction = {
  id: string;
  amount: number;
  currency: string;
  date: string;
  status: "posted" | "pending";
  balance: number | null;
  category: string | null;
  method: string;
  name: string;
  description: string | null;
  currency_rate: number | null;
  currency_source: string | null;
};

export type Institution = {
  id: string;
  name: string;
  logo: string | null;
  provider: Providers;
};

export type Account = {
  id: string;
  name: string;
  currency: string;
  type: AccountType;
  institution: Institution;
  balance: Balance;
  enrollment_id: string | null; // Teller
  resource_id: string | null; // GoCardLess
};

export type ConnectionStatus = {
  status: "connected" | "disconnected";
};

export type Balance = {
  amount: number;
  currency: string;
};

export type GetTransactionsRequest = {
  accountId: string;
  latest?: boolean;
  accessToken?: string; // Teller & Plaid
  accountType: AccountType;
};

export type GetAccountsRequest = {
  id?: string; // GoCardLess
  accessToken?: string; // Teller & Plaid
  institutionId?: string; // Plaid
};

export type GetAccountBalanceRequest = {
  accountId: string;
  accessToken?: string; // Teller & Plaid
};

export type GetAccountBalanceResponse = {
  currency: string;
  amount: number;
};

export type DeleteAccountsRequest = {
  accountId?: string; // GoCardLess
  accessToken?: string; // Teller & Plaid
};

export type GetConnectionStatusRequest = {
  id?: string;
  accessToken?: string; // Teller & Plaid
};

export type GetTransactionsResponse = Transaction[];

export type GetAccountsResponse = Account[];

export type GetInstitutionsResponse = {
  id: string;
  name: string;
  logo: string | null;
  provider: Providers;
}[];

export type GetInstitutionsRequest = {
  countryCode?: string;
};

export type HealthCheckResponse = {
  healthy: boolean;
};

export type GetHealthCheckResponse = {
  duffel: HealthCheckResponse;
  teller: HealthCheckResponse;
  gocardless: HealthCheckResponse;
  plaid: HealthCheckResponse;
};

export type GetConnectionStatusResponse = ConnectionStatus;

export type DeleteConnectionRequest = {
  id: string; // GoCardLess
  accessToken?: string; // Teller & Plaid
};
