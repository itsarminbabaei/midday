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
  getAccountBalance: (
    params: GetAccountBalanceRequest,
  ) => Promise<GetAccountBalanceResponse>;
  getInstitutions: (
    params: GetInstitutionsRequest,
  ) => Promise<GetInstitutionsResponse>;
  getHealthCheck: () => Promise<boolean>;
  deleteAccounts: (params: DeleteAccountsRequest) => void;
  getConnectionStatus: (
    params: GetConnectionStatusRequest,
  ) => Promise<GetConnectionStatusResponse>;
  deleteConnection: (params: DeleteConnectionRequest) => void;
}

export interface TravelProvider {
  // Shopping
  searchFlights: (
    params: SearchFlightsRequest,
  ) => Promise<SearchFlightsResponse>;
  getOffers: (params: GetOffersRequest) => Promise<GetOffersResponse>;
  getPricing: (params: GetPricingRequest) => Promise<GetPricingResponse>;

  // Ordering
  createOrder: (params: CreateOrderRequest) => Promise<CreateOrderResponse>;
  retrieveOrder: (
    params: RetrieveOrderRequest,
  ) => Promise<RetrieveOrderResponse>;
  cancelOrder: (params: CancelOrderRequest) => Promise<CancelOrderResponse>;

  // Servicing
  modifyOrder: (params: ModifyOrderRequest) => Promise<ModifyOrderResponse>;
  addAncillaries: (
    params: AddAncillariesRequest,
  ) => Promise<AddAncillariesResponse>;
  getHealthCheck: () => Promise<boolean>;
}

export type Provider = FinanceProvider | TravelProvider;
