import { Amadeus } from "amadeus";
import { ProviderError } from "@/utils/error";
import { logger } from "@/utils/logger";
import { paginate } from "@/utils/paginate";
import { withRetry } from "@/utils/retry";
import { isError } from "./utils";
import type { ProviderParams } from "../../types";
import type {
  FlightOffersSearchRequest,
  FlightOffersSearchResponse,
  FlightOffersPriceRequest,
  FlightOffersPriceResponse,
  FlightCreateOrderRequest,
  FlightOrderResponse,
  GetFlightOrderRequest,
  GetFlightOrderResponse,
  DeleteFlightOrderRequest,
  DeleteFlightOrderResponse,
  GetSeatMapRequest,
  SeatMapResponse,
  GetAirlineRequest,
  AirlineResponse,
  LocationSearchRequest,
  LocationResponse
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
        keyword: "LON",
        subType: Amadeus.location.city,
      });
      return true;
    } catch {
      return false;
    }
  }

  async searchFlightOffers(
    params: FlightOffersSearchRequest,
  ): Promise<FlightOffersSearchResponse> {
    try {
      const response = await this.#client.shopping.flightOffersSearch.get({
        originLocationCode: params.originLocationCode,
        destinationLocationCode: params.destinationLocationCode,
        departureDate: params.departureDate,
        adults: params.adults,
        returnDate: params.returnDate,
        children: params.children,
        infants: params.infants,
        travelClass: params.travelClass,
        includedAirlineCodes: params.includedAirlineCodes,
        excludedAirlineCodes: params.excludedAirlineCodes,
        nonStop: params.nonStop,
        currencyCode: params.currencyCode,
        maxPrice: params.maxPrice,
        max: params.max,
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

  async priceFlightOffers(
    params: FlightOffersPriceRequest,
  ): Promise<FlightOffersPriceResponse> {
    try {
      const response = await this.#client.shopping.flightOffers.pricing.post(
        JSON.stringify({
          data: {
            type: params.data.type,
            flightOffers: params.data.flightOffers,
          },
        }),
      );
      return response;
    } catch (error) {
      const parsedError = isError(error);
      if (parsedError) {
        throw new ProviderError(parsedError);
      }
      throw error;
    }
  }

  async createFlightOrder(
    params: FlightCreateOrderRequest,
  ): Promise<FlightOrderResponse> {
    try {
      const response = await this.#client.booking.flightOrders.post(
        JSON.stringify(params),
      );
      return response;
    } catch (error) {
      const parsedError = isError(error);
      if (parsedError) {
        throw new ProviderError(parsedError);
      }
      throw error;
    }
  }

  async getFlightOrder(
    params: GetFlightOrderRequest,
  ): Promise<GetFlightOrderResponse> {
    try {
      const response = await this.#client.booking
        .flightOrder(params.orderId)
        .get();
      return response;
    } catch (error) {
      const parsedError = isError(error);
      if (parsedError) {
        throw new ProviderError(parsedError);
      }
      throw error;
    }
  }

  async deleteFlightOrder(
    params: DeleteFlightOrderRequest,
  ): Promise<DeleteFlightOrderResponse> {
    try {
      const response = await this.#client.booking
        .flightOrder(params.orderId)
        .delete();
      return response;
    } catch (error) {
      const parsedError = isError(error);
      if (parsedError) {
        throw new ProviderError(parsedError);
      }
      throw error;
    }
  }

  async getSeatMap(params: GetSeatMapRequest): Promise<SeatMapResponse> {
    try {
      const response = await this.#client.shopping.seatMaps.post(
        JSON.stringify(params),
      );
      return response;
    } catch (error) {
      const parsedError = isError(error);
      if (parsedError) {
        throw new ProviderError(parsedError);
      }
      throw error;
    }
  }

    async getAirline(params: GetAirlineRequest): Promise<AirlineResponse> {
    try {
      const response = await this.#client.referenceData.airlines.get({
        airlineCodes: params.airlineCodes
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

    async searchLocations(params: LocationSearchRequest): Promise<LocationResponse> {
    try {
      const response = await this.#client.referenceData.locations.get({
        keyword: params.keyword,
        subType: params.subType?.join(","),
        countryCode: params.countryCode,
        view: params.view,
        "page[limit]": params.page?.limit,
        "page[offset]": params.page?.offset
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
