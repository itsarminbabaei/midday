import type { 
  Offer as DuffelOffer, 
  Order as DuffelOrder,
  SeatMap as DuffelSeatMap,
  OrderCancellation as DuffelOrderCancellation,
  OrderChangeRequestResponse as DuffelOrderChangeRequest,
  OrderChangeOffer as DuffelOrderChangeOffer,
  OrderChange as DuffelOrderChange,
  OfferRequest as DuffelPartialOfferRequest,
  AirlineInitiatedChange as DuffelAirlineInitiatedChange
} from "@duffel/api/types";
import type { 
  Offer, 
  Order, 
  SeatMap,
  OrderCancellation,
  OrderChangeRequest,
  OrderChangeOffer,
  OrderChange,
  PartialOfferRequest,
  AirlineInitiatedChange
} from "../../types";

export function transformOffer(duffelOffer: DuffelOffer): Offer {
  return {
    id: duffelOffer.id,
    origin: duffelOffer.slices[0]?.origin || '',
    destination: duffelOffer.slices[0]?.destination || '',
    total_amount: parseFloat(duffelOffer.total_amount),
    total_currency: duffelOffer.total_currency,
  };
}

export function transformOrder(duffelOrder: DuffelOrder): Order {
  return {
    id: duffelOrder.id,
    reference: duffelOrder.reference,
    total_amount: parseFloat(duffelOrder.total_amount),
    total_currency: duffelOrder.total_currency,
  };
}

export function transformSeatMap(duffelSeatMap: DuffelSeatMap): SeatMap {
  return {
    id: duffelSeatMap.id,
  };
}

export function transformOrderCancellation(duffelOrderCancellation: DuffelOrderCancellation): OrderCancellation {
  return {
    id: duffelOrderCancellation.id,
  };
}

export function transformOrderChangeRequest(duffelOrderChangeRequest: DuffelOrderChangeRequest): OrderChangeRequest {
  return {
    id: duffelOrderChangeRequest.id,
  };
}

export function transformOrderChangeOffer(duffelOrderChangeOffer: DuffelOrderChangeOffer): OrderChangeOffer {
  return {
    id: duffelOrderChangeOffer.id,
  };
}

export function transformOrderChange(duffelOrderChange: DuffelOrderChange): OrderChange {
  return {
    id: duffelOrderChange.id,
  };
}

export function transformPartialOfferRequest(duffelPartialOfferRequest: DuffelPartialOfferRequest): PartialOfferRequest {
  return {
    id: duffelPartialOfferRequest.id,
  };
}

export function transformAirlineInitiatedChange(duffelAirlineInitiatedChange: DuffelAirlineInitiatedChange): AirlineInitiatedChange {
  return {
    id: duffelAirlineInitiatedChange.id,
  };
}

