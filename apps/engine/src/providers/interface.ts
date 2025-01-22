import type {
  DeleteAccountsRequest,
  DeleteConnectionRequest,
  GetAccountBalanceRequest,
  GetAccountBalanceResponse,
  GetAccountsRequest,
  GetAccountsResponse,
  GetConnectionStatusRequest,
  GetConnectionStatusResponse,
  GetInstitutionsRequest,
  GetInstitutionsResponse,
  GetTransactionsRequest,
  GetTransactionsResponse,
  SearchFlightsRequest,
  SearchFlightsResponse,
  GetOffersRequest,
  GetOffersResponse,
  GetPricingRequest,
  GetPricingResponse,
  CreateOrderRequest,
  CreateOrderResponse,
  RetrieveOrderRequest,
  RetrieveOrderResponse,
  CancelOrderRequest,
  CancelOrderResponse,
  ModifyOrderRequest,
  ModifyOrderResponse,
  AddAncillariesRequest,
  AddAncillariesResponse,
} from "./types";

export interface FinanceProvider {
  getTransactions: (
    params: GetTransactionsRequest,
  ) => Promise<GetTransactionsResponse>;
  getAccounts: (params: GetAccountsRequest) => Promise<GetAccountsResponse>;
  getAccountBalance: (params: GetAccountBalanceRequest) => Promise<GetAccountBalanceResponse>;
  getInstitutions: (params: GetInstitutionsRequest) => Promise<GetInstitutionsResponse>;
  getHealthCheck: () => Promise<boolean>;
  deleteAccounts: (params: DeleteAccountsRequest) => void;
  getConnectionStatus: (params: GetConnectionStatusRequest) => Promise<GetConnectionStatusResponse>;
  deleteConnection: (params: DeleteConnectionRequest) => void;
}

export interface TravelProvider {
  // Common
  getHealthCheck: () => Promise<boolean>;

  // Flights
  flights: {
    // Shopping (Search & Price)
    shopping: {
      search: (params: FlightSearchRequest) => Promise<FlightSearchResponse>;
      getOffers: (params: GetFlightOffersRequest) => Promise<GetFlightOffersResponse>;
      getPricing: (params: GetFlightPricingRequest) => Promise<GetFlightPricingResponse>;
      getSeatMaps: (params: GetSeatMapsRequest) => Promise<GetSeatMapsResponse>;
    };

    // Ordering (Book & Manage)
    ordering: {
      create: (params: CreateFlightOrderRequest) => Promise<CreateFlightOrderResponse>;
      retrieve: (params: RetrieveFlightOrderRequest) => Promise<RetrieveFlightOrderResponse>;
      cancel: (params: CancelFlightOrderRequest) => Promise<CancelFlightOrderResponse>;
    };

    // Servicing (Post-booking)
    servicing: {
      modify: (params: ModifyFlightOrderRequest) => Promise<ModifyFlightOrderResponse>;
      addAncillaries: (params: AddFlightAncillariesRequest) => Promise<AddFlightAncillariesResponse>;
    };
  };

  // Stays
  stays: {
    // Shopping (Search & Price)
    shopping: {
      search: (params: StaySearchRequest) => Promise<StaySearchResponse>;
      getOffers: (params: GetStayOffersRequest) => Promise<GetStayOffersResponse>;
      getPricing: (params: GetStayPricingRequest) => Promise<GetStayPricingResponse>;
    };

    // Ordering (Book & Manage)
    ordering: {
      create: (params: CreateStayOrderRequest) => Promise<CreateStayOrderResponse>;
      retrieve: (params: RetrieveStayOrderRequest) => Promise<RetrieveStayOrderResponse>;
      cancel: (params: CancelStayOrderRequest) => Promise<CancelStayOrderResponse>;
    };

    // Servicing (Post-booking)
    servicing: {
      modify: (params: ModifyStayOrderRequest) => Promise<ModifyStayOrderResponse>;
      addServices: (params: AddStayServicesRequest) => Promise<AddStayServicesResponse>;
    };
  };

  // Supporting Data
  data: {
    getAirports: (params: GetAirportsRequest) => Promise<GetAirportsResponse>;
    getCities: (params: GetCitiesRequest) => Promise<GetCitiesResponse>;
    getAirlines: (params: GetAirlinesRequest) => Promise<GetAirlinesResponse>;
    getAircrafts: (params: GetAircraftsRequest) => Promise<GetAircraftsResponse>;
  };
}

export type Provider = FinanceProvider | TravelProvider;
