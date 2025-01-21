import { Amadeus } from "amadeus";
import { ProviderError } from "@/utils/error";
import { logger } from "@/utils/logger";
import { withRetry } from "@/utils/retry";
import { isError } from "./utils";
import type { ProviderParams } from "../../types";
import type {
  FlightOffersSearchRequest,
  FlightOffersSearchResponse,
} from "./types";

export class AmadeusApi {
  #client: Amadeus;

  constructor(params: Omit<ProviderParams, "provider">) {
    this.#client = new Amadeus({
      clientId: params.envs.AMADEUS_API_KEY,
      clientSecret: params.envs.AMADEUS_API_SECRET,
    });
  }

  async getHealthCheck() {
    try {
      await this.#client.referenceData.location.get({
        keyword: 'LON',
        subType: Amadeus.location.city
      });
      return true;
    } catch {
      return false;
    }
  }

  async searchFlights(params: FlightOffersSearchRequest): Promise<FlightOffersSearchResponse> {
    try {
      const response = await withRetry(() => 
        this.#client.shopping.flightOffersSearch.get({
          originLocationCode: params.origin,
          destinationLocationCode: params.destination,
          departureDate: params.departureDate,
          returnDate: params.returnDate,
          adults: params.passengers.adults,
          children: params.passengers.children,
          infants: params.passengers.infants,
          travelClass: params.cabinClass,
          currencyCode: 'USD', // Could be made configurable
          max: 250
        })
      );

      return response.data;
    } catch (error) {
      const parsedError = isError(error);
      if (parsedError) {
        throw new ProviderError(parsedError);
      }
      throw error;
    }
  }

  async getPricing(offerId: string) {
    try {
      const response = await withRetry(() => 
        this.#client.shopping.flightOffers.pricing.post(
          JSON.stringify({
            data: {
              type: 'flight-offers-pricing',
              flightOffers: [offerId]
            }
          })
        )
      );

      return response.data;
    } catch (error) {
      const parsedError = isError(error);
      if (parsedError) {
        throw new ProviderError(parsedError);
      }
      throw error;
    }
  }

  async createOrder(params: any) {
    try {
      const response = await withRetry(() => 
        this.#client.booking.flightOrders.post(
          JSON.stringify({
            data: {
              type: 'flight-order',
              flightOffers: [params.offerId],
              travelers: params.passengers
            }
          })
        )
      );

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
