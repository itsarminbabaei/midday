import { Duffel } from "@duffel/api";
import { ProviderError } from "@/utils/error";
import { logger } from "@/utils/logger";
import { paginate } from "@/utils/paginate";
import { withRetry } from "@/utils/retry";
import { isError } from "./utils";
import type { ProviderParams } from "../../types";
import type {
  CreatePartialOfferRequest,
  PartialOfferRequestResponse,
  GetPartialOfferRequest,
  GetPartialOfferFaresRequest,
  ListPartialOfferRequestsParams,
  GetOfferRequest,
  OfferResponse,
  ListOffersRequest,
  UpdateOfferPassengerRequest,
  UpdateOfferPassengerResponse,
  CreateOrderRequest,
  OrderResponse,
  ListOrdersRequest,
  GetOrderRequest,
  UpdateOrderRequest,
  CreatePaymentRequest,
  PaymentResponse,
  GetSeatMapsRequest,
  SeatMapResponse,
  GetOrderChangeRequest,
  OrderChangeResponse,
  ConfirmOrderChangeRequest,
  CreateOrderCancellationRequest,
  OrderCancellationResponse,
  GetOrderCancellationRequest,
  ConfirmOrderCancellationRequest,
  ListOrderCancellationsRequest,
  ListOrderChangeOffersRequest,
  GetOrderChangeOfferRequest,
  OrderChangeOfferResponse,
  CreateOrderChangeRequestRequest,
  GetOrderChangeRequestRequest,
  OrderChangeRequestResponse,
  ListAirlineInitiatedChangesRequest,
  UpdateAirlineInitiatedChangeRequest,
  AirlineInitiatedChangeResponse,
  AcceptAirlineInitiatedChangeRequest,
  ListAirlinesRequest,
  GetAirlineRequest,
  AirlineResponse,
  ListAircraftRequest,
  GetAircraftRequest,
  AircraftResponse,
  ListAirportsRequest,
  GetAirportRequest,
  AirportResponse,
  ListCitiesRequest,
  GetCityRequest,
  CityResponse,
  SearchPlacesRequest,
  PlaceResponse,
  ListLoyaltyProgrammesRequest,
  GetLoyaltyProgrammeRequest,
  LoyaltyProgrammeResponse,
} from "./types";

export class DuffelApi {
  #client: Duffel;
  #token: string;

  constructor(params: Omit<ProviderParams, "provider">) {
    this.#token = params.envs.DUFFEL_TRAVELESE_PRO_ACCESS_TOKEN;
    this.#client = new Duffel({
      token: this.#token,
    });
  }

  async getHealthCheck() {
    try {
      await this.#client.offers.list({ limit: 1 });
      return true;
    } catch {
      return false;
    }
  }

  async createPartialOfferRequest(
    params: CreatePartialOfferRequest,
  ): Promise<PartialOfferRequestResponse> {
    try {
      const response = await this.#client.partialOfferRequests.create({
        slices: params.slices,
        passengers: params.passengers,
        cabin_class: params.cabin_class,
        supplier_timeout: params.supplier_timeout,
      });
      return response;
    } catch (error) {
      const parsedError = isError(error);
      if (parsedError) {
        throw new ProviderError(parsedError);
      }
      throw error;
    }
  }

  async getPartialOfferRequest(
    params: GetPartialOfferRequest,
  ): Promise<PartialOfferRequestResponse> {
    try {
      const response = await this.#client.partialOfferRequests.get({
        id: params.id,
      });
      return response;
    } catch (error) {
      const parsedError = isError(error);
      if (parsedError) {
        throw new ProviderError(parsedError);
      }
      throw error;
    }
  }

  async getPartialOfferFares(
    params: GetPartialOfferFaresRequest,
  ): Promise<PartialOfferRequestResponse> {
    try {
      const response = await this.#client.partialOfferRequests.getFullFares({
        id: params.id,
        options: params.options,
      });
      return response;
    } catch (error) {
      const parsedError = isError(error);
      if (parsedError) {
        throw new ProviderError(parsedError);
      }
      throw error;
    }
  }

  async listPartialOfferRequests(params?: ListPartialOfferRequestsParams) {
    return paginate({
      delay: { milliseconds: 100, onDelay: (message) => logger(message) },
      pageSize: 50,
      fetchData: (offset, limit) =>
        withRetry(() =>
          this.#client.partialOfferRequests
            .list({
              ...params,
              offset,
              limit,
            })
            .then(({ data }) => data.partial_offer_requests),
        ),
    });
  }

  async getOffer(params: GetOfferRequest): Promise<OfferResponse> {
    try {
      const response = await this.#client.offers.get({
        id: params.id,
        return_available_services: params.return_available_services,
      });
      return response;
    } catch (error) {
      const parsedError = isError(error);
      if (parsedError) {
        throw new ProviderError(parsedError);
      }
      throw error;
    }
  }

  async listOffers(params: ListOffersRequest) {
    return paginate({
      delay: { milliseconds: 100, onDelay: (message) => logger(message) },
      pageSize: 50,
      fetchData: (offset, limit) =>
        withRetry(() =>
          this.#client.offers
            .list({
              ...params,
              offset,
              limit,
            })
            .then(({ data }) => data.offers),
        ),
    });
  }

  async updateOfferPassenger(
    params: UpdateOfferPassengerRequest,
  ): Promise<UpdateOfferPassengerResponse> {
    try {
      const response = await this.#client.offers.updatePassenger({
        offerId: params.offer_id,
        passengerId: params.passenger_id,
        given_name: params.given_name,
        family_name: params.family_name,
        loyalty_programme_accounts: params.loyalty_programme_accounts,
      });
      return response;
    } catch (error) {
      const parsedError = isError(error);
      if (parsedError) {
        throw new ProviderError(parsedError);
      }
      throw error;
    }
  }

  async createOrder(params: CreateOrderRequest): Promise<OrderResponse> {
    try {
      const response = await this.#client.orders.create(params);
      return response;
    } catch (error) {
      const parsedError = isError(error);
      if (parsedError) {
        throw new ProviderError(parsedError);
      }
      throw error;
    }
  }

  async listOrders(params?: ListOrdersRequest) {
    return paginate({
      delay: { milliseconds: 100, onDelay: (message) => logger(message) },
      pageSize: 50,
      fetchData: (offset, limit) =>
        withRetry(() =>
          this.#client.orders
            .list({
              ...params,
              offset,
              limit,
            })
            .then(({ data }) => data.orders),
        ),
    });
  }

  async getOrder(params: GetOrderRequest): Promise<OrderResponse> {
    try {
      const response = await this.#client.orders.get({
        id: params.id,
      });
      return response;
    } catch (error) {
      const parsedError = isError(error);
      if (parsedError) {
        throw new ProviderError(parsedError);
      }
      throw error;
    }
  }

  async updateOrder(params: UpdateOrderRequest): Promise<OrderResponse> {
    try {
      const response = await this.#client.orders.update({
        id: params.id,
        metadata: params.metadata,
      });
      return response;
    } catch (error) {
      const parsedError = isError(error);
      if (parsedError) {
        throw new ProviderError(parsedError);
      }
      throw error;
    }
  }

  async createPayment(params: CreatePaymentRequest): Promise<PaymentResponse> {
    try {
      const response = await this.#client.payments.create({
        order_id: params.order_id,
        payment: {
          type: params.payment.type,
          amount: params.payment.amount,
          currency: params.payment.currency,
          card: params.payment.card,
        },
      });
      return response;
    } catch (error) {
      const parsedError = isError(error);
      if (parsedError) {
        throw new ProviderError(parsedError);
      }
      throw error;
    }
  }

  async getSeatMaps(params: GetSeatMapsRequest): Promise<SeatMapResponse> {
    try {
      const response = await this.#client.seatMaps.get({
        offer_id: params.offer_id,
      });
      return response;
    } catch (error) {
      const parsedError = isError(error);
      if (parsedError) {
        throw new ProviderError(parsedError);
      }
      throw error;
    }
  }

  async getOrderChange(
    params: GetOrderChangeRequest,
  ): Promise<OrderChangeResponse> {
    try {
      const response = await this.#client.orderChanges.get({
        id: params.id,
      });
      return response;
    } catch (error) {
      const parsedError = isError(error);
      if (parsedError) {
        throw new ProviderError(parsedError);
      }
      throw error;
    }
  }

  async confirmOrderChange(
    params: ConfirmOrderChangeRequest,
  ): Promise<OrderChangeResponse> {
    try {
      const response = await this.#client.orderChanges.confirm({
        id: params.id,
        payment: params.payment,
      });
      return response;
    } catch (error) {
      const parsedError = isError(error);
      if (parsedError) {
        throw new ProviderError(parsedError);
      }
      throw error;
    }
  }

  async createOrderCancellation(
    params: CreateOrderCancellationRequest,
  ): Promise<OrderCancellationResponse> {
    try {
      const response = await this.#client.orderCancellations.create({
        order_id: params.order_id,
      });
      return response;
    } catch (error) {
      const parsedError = isError(error);
      if (parsedError) {
        throw new ProviderError(parsedError);
      }
      throw error;
    }
  }

  async getOrderCancellation(
    params: GetOrderCancellationRequest,
  ): Promise<OrderCancellationResponse> {
    try {
      const response = await this.#client.orderCancellations.get({
        id: params.id,
      });
      return response;
    } catch (error) {
      const parsedError = isError(error);
      if (parsedError) {
        throw new ProviderError(parsedError);
      }
      throw error;
    }
  }

  async confirmOrderCancellation(
    params: ConfirmOrderCancellationRequest,
  ): Promise<OrderCancellationResponse> {
    try {
      const response = await this.#client.orderCancellations.confirm({
        id: params.id,
      });
      return response;
    } catch (error) {
      const parsedError = isError(error);
      if (parsedError) {
        throw new ProviderError(parsedError);
      }
      throw error;
    }
  }

  async listOrderCancellations(params?: ListOrderCancellationsRequest) {
    return paginate({
      delay: { milliseconds: 100, onDelay: (message) => logger(message) },
      pageSize: 50,
      fetchData: (offset, limit) =>
        withRetry(() =>
          this.#client.orderCancellations
            .list({
              ...params,
              offset,
              limit,
            })
            .then(({ data }) => data.order_cancellations),
        ),
    });
  }

  async listOrderChangeOffers(params: ListOrderChangeOffersRequest) {
    return paginate({
      delay: { milliseconds: 100, onDelay: (message) => logger(message) },
      pageSize: 50,
      fetchData: (offset, limit) =>
        withRetry(() =>
          this.#client.orderChangeOffers
            .list({
              ...params,
              offset,
              limit,
            })
            .then(({ data }) => data.order_change_offers),
        ),
    });
  }

  async getOrderChangeOffer(
    params: GetOrderChangeOfferRequest,
  ): Promise<OrderChangeOfferResponse> {
    try {
      const response = await this.#client.orderChangeOffers.get({
        id: params.id,
        return_available_services: params.return_available_services,
      });
      return response;
    } catch (error) {
      const parsedError = isError(error);
      if (parsedError) {
        throw new ProviderError(parsedError);
      }
      throw error;
    }
  }

  async createOrderChangeRequest(
    params: CreateOrderChangeRequestRequest,
  ): Promise<OrderChangeRequestResponse> {
    try {
      const response = await this.#client.orderChangeRequests.create({
        order_id: params.order_id,
        slices: params.slices,
      });
      return response;
    } catch (error) {
      const parsedError = isError(error);
      if (parsedError) {
        throw new ProviderError(parsedError);
      }
      throw error;
    }
  }

  async getOrderChangeRequest(
    params: GetOrderChangeRequestRequest,
  ): Promise<OrderChangeRequestResponse> {
    try {
      const response = await this.#client.orderChangeRequests.get({
        id: params.id,
      });
      return response;
    } catch (error) {
      const parsedError = isError(error);
      if (parsedError) {
        throw new ProviderError(parsedError);
      }
      throw error;
    }
  }

  async listAirlineInitiatedChanges(
    params: ListAirlineInitiatedChangesRequest,
  ) {
    return paginate({
      delay: { milliseconds: 100, onDelay: (message) => logger(message) },
      pageSize: 50,
      fetchData: (offset, limit) =>
        withRetry(() =>
          this.#client.airlineInitiatedChanges
            .list({
              ...params,
              offset,
              limit,
            })
            .then(({ data }) => data.airline_initiated_changes),
        ),
    });
  }

  async updateAirlineInitiatedChange(
    params: UpdateAirlineInitiatedChangeRequest,
  ): Promise<AirlineInitiatedChangeResponse> {
    try {
      const response = await this.#client.airlineInitiatedChanges.update({
        id: params.id,
        action_taken: params.action_taken,
      });
      return response;
    } catch (error) {
      const parsedError = isError(error);
      if (parsedError) {
        throw new ProviderError(parsedError);
      }
      throw error;
    }
  }

  async acceptAirlineInitiatedChange(
    params: AcceptAirlineInitiatedChangeRequest,
  ): Promise<AirlineInitiatedChangeResponse> {
    try {
      const response = await this.#client.airlineInitiatedChanges.accept({
        id: params.id,
      });
      return response;
    } catch (error) {
      const parsedError = isError(error);
      if (parsedError) {
        throw new ProviderError(parsedError);
      }
      throw error;
    }
  }

  async listAirlines(params?: ListAirlinesRequest) {
    return paginate({
      delay: { milliseconds: 100, onDelay: (message) => logger(message) },
      pageSize: 50,
      fetchData: (offset, limit) =>
        withRetry(() =>
          this.#client.airlines
            .list({
              ...params,
              offset,
              limit,
            })
            .then(({ data }) => data.airlines),
        ),
    });
  }

  async getAirline(params: GetAirlineRequest): Promise<AirlineResponse> {
    try {
      const response = await this.#client.airlines.get({
        id: params.id,
      });
      return response;
    } catch (error) {
      const parsedError = isError(error);
      if (parsedError) {
        throw new ProviderError(parsedError);
      }
      throw error;
    }
  }

  async listAircraft(params?: ListAircraftRequest) {
    return paginate({
      delay: { milliseconds: 100, onDelay: (message) => logger(message) },
      pageSize: 50,
      fetchData: (offset, limit) =>
        withRetry(() =>
          this.#client.aircraft
            .list({
              ...params,
              offset,
              limit,
            })
            .then(({ data }) => data.aircraft),
        ),
    });
  }

  async getAircraft(params: GetAircraftRequest): Promise<AircraftResponse> {
    try {
      const response = await this.#client.aircraft.get({
        id: params.id,
      });
      return response;
    } catch (error) {
      const parsedError = isError(error);
      if (parsedError) {
        throw new ProviderError(parsedError);
      }
      throw error;
    }
  }

  async listAirports(params?: ListAirportsRequest) {
    return paginate({
      delay: { milliseconds: 100, onDelay: (message) => logger(message) },
      pageSize: 50,
      fetchData: (offset, limit) =>
        withRetry(() =>
          this.#client.airports
            .list({
              ...params,
              offset,
              limit,
            })
            .then(({ data }) => data.airports),
        ),
    });
  }

  async getAirport(params: GetAirportRequest): Promise<AirportResponse> {
    try {
      const response = await this.#client.airports.get({
        id: params.id,
      });
      return response;
    } catch (error) {
      const parsedError = isError(error);
      if (parsedError) {
        throw new ProviderError(parsedError);
      }
      throw error;
    }
  }

  async listCities(params?: ListCitiesRequest) {
    return paginate({
      delay: { milliseconds: 100, onDelay: (message) => logger(message) },
      pageSize: 50,
      fetchData: (offset, limit) =>
        withRetry(() =>
          this.#client.cities
            .list({
              ...params,
              offset,
              limit,
            })
            .then(({ data }) => data.cities),
        ),
    });
  }

  async getCity(params: GetCityRequest): Promise<CityResponse> {
    try {
      const response = await this.#client.cities.get({
        id: params.id,
      });
      return response;
    } catch (error) {
      const parsedError = isError(error);
      if (parsedError) {
        throw new ProviderError(parsedError);
      }
      throw error;
    }
  }

  async searchPlaces(params: SearchPlacesRequest): Promise<PlaceResponse> {
    try {
      const response = await this.#client.places.get({
        query: params.query,
        type: params.type,
        limit: params.limit,
      });
      return response;
    } catch (error) {
      const parsedError = isError(error);
      if (parsedError) {
        throw new ProviderError(parsedError);
      }
      throw error;
    }
  }

  async listLoyaltyProgrammes(params?: ListLoyaltyProgrammesRequest) {
    return paginate({
      delay: { milliseconds: 100, onDelay: (message) => logger(message) },
      pageSize: 50,
      fetchData: (offset, limit) =>
        withRetry(() =>
          this.#client.loyaltyProgrammes
            .list({
              ...params,
              offset,
              limit,
            })
            .then(({ data }) => data.loyalty_programmes),
        ),
    });
  }

  async getLoyaltyProgramme(
    params: GetLoyaltyProgrammeRequest,
  ): Promise<LoyaltyProgrammeResponse> {
    try {
      const response = await this.#client.loyaltyProgrammes.get({
        id: params.id,
      });
      return response;
    } catch (error) {
      const parsedError = isError(error);
      if (parsedError) {
        throw new ProviderError(parsedError);
      }
      throw error;
    }
  }
}
