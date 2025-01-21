import { logger } from "@/utils/logger";
import { DuffelProvider } from "./travel/duffel/duffel-provider";
import { AmadeusProvider } from "./travel/amadeus/amadeus-provider";
import { GoCardLessProvider } from "./finance/gocardless/gocardless-provider";
import { PlaidProvider } from "./finance/plaid/plaid-provider";
import { TellerProvider } from "./finance/teller/teller-provider";
import type {
  DeleteAccountsRequest,
  DeleteConnectionRequest,
  GetAccountBalanceRequest,
  GetAccountsRequest,
  GetConnectionStatusRequest,
  GetHealthCheckResponse,
  GetInstitutionsRequest,
  GetTransactionsRequest,
  ProviderParams,
  SearchFlightsRequest,
  GetOffersRequest,
  GetPricingRequest,
  CreateOrderRequest,
  RetrieveOrderRequest,
  CancelOrderRequest,
  ModifyOrderRequest,
  AddAncillariesRequest,
} from "./types";

export class Provider {
  #name?: string;

  #provider:
    | DuffelProvider
    | AmadeusProvider
    | PlaidProvider
    | TellerProvider
    | GoCardLessProvider
    | null = null;

  constructor(params?: ProviderParams) {
    this.#name = params?.provider;

    switch (params?.provider) {
      case "duffel":
        this.#provider = new DuffelProvider(params);
        break;
      case "amadeus":
        this.#provider = new AmadeusProvider(params);
        break;
      case "gocardless":
        this.#provider = new GoCardLessProvider(params);
        break;
      case "teller":
        this.#provider = new TellerProvider(params);
        break;
      case "plaid":
        this.#provider = new PlaidProvider(params);
        break;
      default:
    }
  }

  async getHealthCheck(
    params: Omit<ProviderParams, "provider">,
  ): Promise<GetHealthCheckResponse> {
    const duffel = new DuffelProvider(params);
    const amadeus = new AmadeusProvider(params);
    const teller = new TellerProvider(params);
    const plaid = new PlaidProvider(params);
    const gocardless = new GoCardLessProvider(params);

    try {
      const [
        isDuffelHealthy,
        isAmadeusHealthy,
        isPlaidHealthy,
        isGocardlessHealthy,
        isTellerHealthy,
      ] = await Promise.all([
        duffel.getHealthCheck(),
        amadeus.getHealthCheck(),
        plaid.getHealthCheck(),
        gocardless.getHealthCheck(),
        teller.getHealthCheck(),
      ]);

      return {
        duffel: {
          healthy: isDuffelHealthy,
        },
        amadeus: {
          healthy: isAmadeusHealthy,
        },
        plaid: {
          healthy: isPlaidHealthy,
        },
        gocardless: {
          healthy: isGocardlessHealthy,
        },
        teller: {
          healthy: isTellerHealthy,
        },
      };
    } catch {
      throw Error("Something went wrong");
    }
  }

  async searchFlights(params: SearchFlightsRequest) {
    logger(
      "searchFlights:",
      `provider: ${this.#name} origin: ${params.origin} destination: ${params.destination}`,
    );

    const data = await this.#provider?.searchFlights(params);

    if (data) {
      return data;
    }

    return [];
  }

  async getOffers(params: GetOffersRequest) {
    logger("getOffers:", `provider: ${this.#name} offerId: ${params.offerId}`);

    const data = await this.#provider?.getOffers(params);

    if (data) {
      return data;
    }

    return null;
  }

  async getPricing(params: GetPricingRequest) {
    logger("getPricing:", `provider: ${this.#name} offerId: ${params.offerId}`);

    const data = await this.#provider?.getPricing(params);

    if (data) {
      return data;
    }

    return null;
  }

  async createOrder(params: CreateOrderRequest) {
    logger(
      "createOrder:",
      `provider: ${this.#name} offerId: ${params.offerId}`,
    );

    const data = await this.#provider?.createOrder(params);

    if (data) {
      return data;
    }

    return null;
  }

  async retrieveOrder(params: RetrieveOrderRequest) {
    logger(
      "retrieveOrder:",
      `provider: ${this.#name} orderId: ${params.orderId}`,
    );

    const data = await this.#provider?.retrieveOrder(params);

    if (data) {
      return data;
    }

    return null;
  }

  async cancelOrder(params: CancelOrderRequest) {
    logger(
      "cancelOrder:",
      `provider: ${this.#name} orderId: ${params.orderId}`,
    );

    const data = await this.#provider?.cancelOrder(params);

    if (data) {
      return data;
    }

    return null;
  }

  async modifyOrder(params: ModifyOrderRequest) {
    logger(
      "modifyOrder:",
      `provider: ${this.#name} orderId: ${params.orderId}`,
    );

    const data = await this.#provider?.modifyOrder(params);

    if (data) {
      return data;
    }

    return null;
  }

  async addAncillaries(params: AddAncillariesRequest) {
    logger(
      "addAncillaries:",
      `provider: ${this.#name} orderId: ${params.orderId}`,
    );

    const data = await this.#provider?.addAncillaries(params);

    if (data) {
      return data;
    }

    return null;
  }

  async getTransactions(params: GetTransactionsRequest) {
    logger(
      "getTransactions:",
      `provider: ${this.#name} id: ${params.accountId}`,
    );

    const data = await this.#provider?.getTransactions(params);

    if (data) {
      return data;
    }

    return [];
  }

  async getAccounts(params: GetAccountsRequest) {
    logger("getAccounts:", `provider: ${this.#name}`);

    const data = await this.#provider?.getAccounts(params);

    if (data) {
      return data;
    }

    return [];
  }

  async getAccountBalance(params: GetAccountBalanceRequest) {
    logger(
      "getAccountBalance:",
      `provider: ${this.#name} id: ${params.accountId}`,
    );

    const data = await this.#provider?.getAccountBalance(params);

    if (data) {
      return data;
    }

    return null;
  }

  async getInstitutions(params: GetInstitutionsRequest) {
    logger("getInstitutions:", `provider: ${this.#name}`);

    const data = await this.#provider?.getInstitutions(params);

    if (data) {
      return data;
    }

    return [];
  }

  async deleteAccounts(params: DeleteAccountsRequest) {
    logger("delete:", `provider: ${this.#name}`);

    return this.#provider?.deleteAccounts(params);
  }

  async getConnectionStatus(params: GetConnectionStatusRequest) {
    logger("getConnectionStatus:", `provider: ${this.#name}`);

    const data = await this.#provider?.getConnectionStatus(params);

    if (data) {
      return data;
    }

    return { status: "connected" };
  }

  async deleteConnection(params: DeleteConnectionRequest) {
    logger("deleteConnection:", `provider: ${this.#name}`);

    return this.#provider?.deleteConnection(params);
  }
}
