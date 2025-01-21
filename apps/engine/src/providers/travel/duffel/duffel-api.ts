import { Duffel } from "@duffel/api";
import { ProviderError } from "@/utils/error";
import { logger } from "@/utils/logger";
import { paginate } from "@/utils/paginate";
import { withRetry } from "@/utils/retry";
import { isError } from "./utils";
import type { ProviderParams } from "../../types";
import type {
  GetOfferRequest,
  ListOffersRequest,
  CreateOrderRequest,
  GetSeatMapsRequest,
  CreateOrderCancellationRequest,
  CreateOrderChangeRequestRequest,
  CreatePartialOfferRequestRequest,
  UpdateOfferPassengerRequest,
  ListOrdersRequest,
  GetOrderRequest,
  UpdateOrderRequest,
  AddOrderServiceRequest,
  CreatePaymentRequest,
  GetOrderCancellationRequest,
  ConfirmOrderCancellationRequest,
  GetOrderChangeRequestRequest,
  ListOrderChangeOffersRequest,
  GetOrderChangeOfferRequest,
  ConfirmOrderChangeRequest,
  GetOrderChangeRequest,
  GetPartialOfferFaresRequest,
  GetPartialOfferRequestRequest,
  UpdateAirlineInitiatedChangeRequest,
  AcceptAirlineInitiatedChangeRequest,
  ListAirlineInitiatedChangesRequest,
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

  async getOffer(params: GetOfferRequest) {
    try {
      const response = await this.#client.offers.get(params);
      return response.data;
    } catch (error) {
      const parsedError = isError(error);
      if (parsedError) {
        throw new ProviderError(parsedError);
      }
      throw error;
    }
  }

  async updateOfferPassenger(params: UpdateOfferPassengerRequest) {
    try {
      const response = await this.#client.offers.updatePassenger(params);
      return response.data;
    } catch (error) {
      const parsedError = isError(error);
      if (parsedError) {
        throw new ProviderError(parsedError);
      }
      throw error;
    }
  }

  async listOffers(params?: ListOffersRequest) {
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

  async createOrder(params: CreateOrderRequest) {
    try {
      const response = await this.#client.orders.create(params);
      return response.data;
    } catch (error) {
      const parsedError = isError(error);
      if (parsedError) {
        throw new ProviderError(parsedError);
      }
      throw error;
    }
  }

  async getOrder(params: GetOrderRequest) {
    try {
      const response = await this.#client.orders.get(params);
      return response.data;
    } catch (error) {
      const parsedError = isError(error);
      if (parsedError) {
        throw new ProviderError(parsedError);
      }
      throw error;
    }
  }

  async updateOrder(params: UpdateOrderRequest) {
    try {
      const response = await this.#client.orders.update(params);
      return response.data;
    } catch (error) {
      const parsedError = isError(error);
      if (parsedError) {
        throw new ProviderError(parsedError);
      }
      throw error;
    }
  }

  async addOrderService(params: AddOrderServiceRequest) {
    try {
      const response = await this.#client.orders.addServices(params);
      return response.data;
    } catch (error) {
      const parsedError = isError(error);
      if (parsedError) {
        throw new ProviderError(parsedError);
      }
      throw error;
    }
  }

  async createPayment(params: CreatePaymentRequest) {
    try {
      const response = await this.#client.payments.create(params);
      return response.data;
    } catch (error) {
      const parsedError = isError(error);
      if (parsedError) {
        throw new ProviderError(parsedError);
      }
      throw error;
    }
  }

  async getSeatMaps(params: GetSeatMapsRequest) {
    try {
      const response = await this.#client.seatMaps.get(params);
      return response.data;
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
            .then(({ data }) => data.orderCancellations),
        ),
    });
  }

  async createOrderCancellation(params: CreateOrderCancellationRequest) {
    try {
      const response = await this.#client.orderCancellations.create(params);
      return response.data;
    } catch (error) {
      const parsedError = isError(error);
      if (parsedError) {
        throw new ProviderError(parsedError);
      }
      throw error;
    }
  }

  async getOrderCancellation(params: GetOrderCancellationRequest) {
    try {
      const response = await this.#client.orderCancellations.get(params);
      return response.data;
    } catch (error) {
      const parsedError = isError(error);
      if (parsedError) {
        throw new ProviderError(parsedError);
      }
      throw error;
    }
  }

  async confirmOrderCancellation(params: ConfirmOrderCancellationRequest) {
    try {
      const response = await this.#client.orderCancellations.confirm(params);
      return response.data;
    } catch (error) {
      const parsedError = isError(error);
      if (parsedError) {
        throw new ProviderError(parsedError);
      }
      throw error;
    }
  }

  async createOrderChangeRequest(params: CreateOrderChangeRequestRequest) {
    try {
      const response = await this.#client.orderChangeRequests.create(params);
      return response.data;
    } catch (error) {
      const parsedError = isError(error);
      if (parsedError) {
        throw new ProviderError(parsedError);
      }
      throw error;
    }
  }

  async getOrderChangeRequest(params: GetOrderChangeRequestRequest) {
    try {
      const response = await this.#client.orderChangeRequests.get(params);
      return response.data;
    } catch (error) {
      const parsedError = isError(error);
      if (parsedError) {
        throw new ProviderError(parsedError);
      }
      throw error;
    }
  }

  async listOrderChangeOffers(params?: ListOrderChangeOffersRequest) {
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
            .then(({ data }) => data.orderChangeOffers),
        ),
    });
  }

  async getOrderChangeOffer(params: GetOrderChangeOfferRequest) {
    try {
      const response = await this.#client.orderChangeOffers.get(params);
      return response.data;
    } catch (error) {
      const parsedError = isError(error);
      if (parsedError) {
        throw new ProviderError(parsedError);
      }
      throw error;
    }
  }

  async confirmOrderChange(params: ConfirmOrderChangeRequest) {
    try {
      const response = await this.#client.orderChanges.confirm(params);
      return response.data;
    } catch (error) {
      const parsedError = isError(error);
      if (parsedError) {
        throw new ProviderError(parsedError);
      }
      throw error;
    }
  }

  async getOrderChange(params: GetOrderChangeRequest) {
    try {
      const response = await this.#client.orderChanges.get(params);
      return response.data;
    } catch (error) {
      const parsedError = isError(error);
      if (parsedError) {
        throw new ProviderError(parsedError);
      }
      throw error;
    }
  }

  async getPartialOfferFares(params: GetPartialOfferFaresRequest) {
    try {
      const response =
        await this.#client.partialOfferRequests.getFullFares(params);
      return response.data;
    } catch (error) {
      const parsedError = isError(error);
      if (parsedError) {
        throw new ProviderError(parsedError);
      }
      throw error;
    }
  }

  async getPartialOfferRequest(params: GetPartialOfferRequestRequest) {
    try {
      const response = await this.#client.partialOfferRequests.get(params);
      return response.data;
    } catch (error) {
      const parsedError = isError(error);
      if (parsedError) {
        throw new ProviderError(parsedError);
      }
      throw error;
    }
  }

  async createPartialOfferRequest(params: CreatePartialOfferRequestRequest) {
    try {
      const response = await this.#client.partialOfferRequests.create(params);
      return response.data;
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
            .then(({ data }) => data.airlineInitiatedChanges),
        ),
    });
  }

  async updateAirlineInitiatedChange(
    params: UpdateAirlineInitiatedChangeRequest,
  ) {
    try {
      const response =
        await this.#client.airlineInitiatedChanges.update(params);
      return response.data;
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
  ) {
    try {
      const response =
        await this.#client.airlineInitiatedChanges.accept(params);
      return response.data;
    } catch (error) {
      const parsedError = isError(error);
      if (parsedError) {
        throw new ProviderError(parsedError);
      }
      throw error;
    }
  }
}
