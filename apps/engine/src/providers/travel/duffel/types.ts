import type {
  OfferRequest,
  Offer,
  PassengerType,
  CabinClass,
  ListOffersParams,
  LoyaltyProgrammeAccounts,
  Order,
  PaymentType,
  DuffelPassengerGender,
  DuffelPassengerTitle,
  PassengerIdentityDocumentType,
  Payment,
  SeatMap,
  OrderCancellation,
  CreateOrderCancellation,
  ListOrderCancellationsParams,
  OrderChangeOffer,
  PaginationMeta,
  OrderChange,
  CreateOrderChangeRequest,
  OrderChangeRequestResponse,
  ConfirmOrderChangePayment,
  AirlineInitiatedChange,
  AirlineInitiatedChangeActionTaken,
} from "@duffel/api/types";

import type { SelectedPartialOffersParams } from "@duffel/api/booking/PartialOfferRequests/PartialOfferRequestTypes";

export type GetOfferRequest = {
  id: string;
  return_available_services?: boolean;
};
export type GetOfferResponse = Offer;

export type UpdateOfferPassengerRequest = {
  offerId: string;
  passengerId: string;
  loyalty_programme_accounts: LoyaltyProgrammeAccounts[];
  given_name: string;
  family_name: string;
};
export type UpdateOfferPassengerResponse = Offer;

export type ListOffersRequest = ListOffersParams;
export type ListOffersResponse = Offer[];

export type ListOrdersRequest = {
  awaiting_payment?: boolean;
  "passenger_name[]"?: string[];
  booking_reference?: string;
  limit?: number;
  before?: string;
  after?: string;
};
export type ListOrdersResponse = Order[];

export type CreateOrderRequest = {
  selected_offers: string[];
  services?: Array<{
    id: string;
    quantity: number;
  }>;
  passengers: Array<{
    born_on: string;
    family_name: string;
    given_name: string;
    gender: DuffelPassengerGender;
    title: DuffelPassengerTitle;
    email: string;
    phone_number: string;
    identity_documents?: Array<{
      type: PassengerIdentityDocumentType;
      unique_identifier: string;
      issuing_country_code: string;
      expires_on: string;
    }>;
  }>;
  payments?: Array<{
    type: PaymentType;
    amount: string;
    currency: string;
  }>;
  type: "instant" | "pay_later";
  metadata?: Record<string, string>;
};
export type CreateOrderResponse = Order;

export type ListOrderServicesRequest = {
  id: string;
};
export type ListOrderServicesResponse = Order;

export type GetOrderRequest = {
  id: string;
};
export type GetOrderResponse = Order;

export type UpdateOrderRequest = {
  id: string;
  metadata: Record<string, string>;
};
export type UpdateOrderResponse = Order;

export type AddOrderServiceRequest = {
  id: string;
  payment: {
    type: PaymentType;
    amount: string;
    currency: string;
  };
  add_services: Array<{
    id: string;
    quantity: number;
  }>;
};
export type AddOrderServiceResponse = Order;

export type CreatePaymentRequest = {
  order_id: string;
  payment: Omit<Payment, "created_at" | "id">;
};
export type CreatePaymentResponse = Payment;

export type GetSeatMapsRequest = {
  offer_id: string;
};
export type GetSeatMapsResponse = SeatMap[];

export type ListOrderCancellationsRequest = ListOrderCancellationsParams;
export type ListOrderCancellationsResponse = OrderCancellation[];

export type CreateOrderCancellationRequest = CreateOrderCancellation;
export type CreateOrderCancellationResponse = OrderCancellation;

export type GetOrderCancellationRequest = {
  id: string;
};
export type GetOrderCancellationResponse = OrderCancellation;

export type ConfirmOrderCancellationRequest = {
  id: string;
};
export type ConfirmOrderCancellationResponse = OrderCancellation;

export type CreateOrderChangeRequestRequest = CreateOrderChangeRequest;
export type CreateOrderChangeRequestResponse = OrderChangeRequestResponse;

export type GetOrderChangeRequestRequest = {
  id: string;
};
export type GetOrderChangeRequestResponse = OrderChangeRequestResponse;

export type ListOrderChangeOffersRequest = PaginationMeta;
export type ListOrderChangeOffersResponse = OrderChangeOffer[];

export type GetOrderChangeOfferRequest = {
  id: string;
};
export type GetOrderChangeOfferResponse = OrderChangeOffer;

export type ConfirmOrderChangeRequest = {
  id: string;
  payment: Partial<ConfirmOrderChangePayment>;
};
export type ConfirmOrderChangeResponse = OrderChange;

export type GetOrderChangeRequest = {
  id: string;
};
export type GetOrderChangeResponse = OrderChange;

export type CreateOrderChangeOfferRequest = {
  id: string;
};
export type CreateOrderChangeResponse = OrderChange;

export type GetPartialOfferFaresRequest = {
  id: string;
  options?: SelectedPartialOffersParams;
};
export type GetPartialOfferFaresResponse = OfferRequest;

export type GetPartialOfferRequestRequest = {
  id: string;
  options?: SelectedPartialOffersParams;
};
export type GetPartialOfferRequestResponse = OfferRequest;

export type CreatePartialOfferRequestRequest = {
  slices: Array<{
    origin: string;
    destination: string;
    departure_date: string;
  }>;
  passengers: Array<{
    type: PassengerType;
    age?: number;
    loyalty_programme_accounts?: Array<{
      airline_iata_code: string;
      account_number: string;
    }>;
  }>;
  cabin_class?: CabinClass;
  supplier_timeout?: number;
};
export type CreatePartialOfferRequestResponse = OfferRequest;

export type UpdateAirlineInitiatedChangeRequest = {
  id: string;
  action_taken: AirlineInitiatedChangeActionTaken;
};
export type UpdateAirlineInitiatedChangeResponse = AirlineInitiatedChange;

export type AcceptAirlineInitiatedChangeRequest = {
  id: string;
};
export type AcceptAirlineInitiatedChangeResponse = AirlineInitiatedChange;

export type ListAirlineInitiatedChangesRequest = {
  order_id: string;
};
export type ListAirlineInitiatedChangesResponse = AirlineInitiatedChange[];
