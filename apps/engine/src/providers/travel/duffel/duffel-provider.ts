import type { Provider } from "../../interface";
import type { ProviderParams } from "../../types";
import { DuffelApi } from "./duffel-api";
import {
  transformOffer,
  transformOrder,
  transformSeatMap,
  transformOrderCancellation,
  transformOrderChangeRequest,
  transformOrderChangeOffer,
  transformOrderChange,
  transformPartialOfferRequest,
  transformAirlineInitiatedChange,
} from "./transform";

export class DuffelProvider implements Provider {
  #api: DuffelApi;

  constructor(params: Omit<ProviderParams, "provider">) {
    this.#api = new DuffelApi(params);
  }

  async getHealthCheck() {
    return this.#api.getHealthCheck();
  }

  // Offers
  async getOffer(params) {
    const response = await this.#api.getOffer(params);
    return transformOffer(response);
  }

  async updateOfferPassenger(params) {
    const response = await this.#api.updateOfferPassenger(params);
    return transformOffer(response);
  }

  async getOffers(params) {
    const response = await this.#api.listOffers(params);
    return response.map(transformOffer);
  }

  // Orders
  async listOrders(params) {
    const response = await this.#api.listOrders(params);
    return response.map(transformOrder);
  }

  async createOrder(params) {
    const response = await this.#api.createOrder(params);
    return transformOrder(response);
  }

  async listOrderServices(params) {
    const response = await this.#api.listOrderServices(params);
    return transformOrder(response);
  }

  async getOrder(params) {
    const response = await this.#api.getOrder(params);
    return transformOrder(response);
  }

  async updateOrder(params) {
    const response = await this.#api.updateOrder(params);
    return transformOrder(response);
  }

  async addOrderService(params) {
    const response = await this.#api.addOrderService(params);
    return transformOrder(response);
  }

  // Payments
  async createPayment(params) {
    const response = await this.#api.createPayment(params);
    return response;
  }

  // Seat Maps
  async getSeatMaps(params) {
    const response = await this.#api.getSeatMaps(params);
    return response.map(transformSeatMap);
  }

  // Order Cancellations
  async listOrderCancellations(params) {
    const response = await this.#api.listOrderCancellations(params);
    return response.map(transformOrderCancellation);
  }

  async createOrderCancellation(params) {
    const response = await this.#api.createOrderCancellation(params);
    return transformOrderCancellation(response);
  }

  async getOrderCancellation(params) {
    const response = await this.#api.getOrderCancellation(params);
    return transformOrderCancellation(response);
  }

  async confirmOrderCancellation(params) {
    const response = await this.#api.confirmOrderCancellation(params);
    return transformOrderCancellation(response);
  }

  // Order Change Requests
  async createOrderChangeRequest(params) {
    const response = await this.#api.createOrderChangeRequest(params);
    return transformOrderChangeRequest(response);
  }

  async getOrderChangeRequest(params) {
    const response = await this.#api.getOrderChangeRequest(params);
    return transformOrderChangeRequest(response);
  }

  // Order Change Offers
  async listOrderChangeOffers(params) {
    const response = await this.#api.listOrderChangeOffers(params);
    return response.map(transformOrderChangeOffer);
  }

  async getOrderChangeOffer(params) {
    const response = await this.#api.getOrderChangeOffer(params);
    return transformOrderChangeOffer(response);
  }

  // Order Changes
  async confirmOrderChange(params) {
    const response = await this.#api.confirmOrderChange(params);
    return transformOrderChange(response);
  }

  async getOrderChange(params) {
    const response = await this.#api.getOrderChange(params);
    return transformOrderChange(response);
  }

  // Partial Offer Requests
  async getPartialOfferFares(params) {
    const response = await this.#api.getPartialOfferFares(params);
    return transformPartialOfferRequest(response);
  }

  async getPartialOfferRequest(params) {
    const response = await this.#api.getPartialOfferRequest(params);
    return transformPartialOfferRequest(response);
  }

  async createPartialOfferRequest(params) {
    const response = await this.#api.createPartialOfferRequest(params);
    return transformPartialOfferRequest(response);
  }

  // Airline-Initiated Changes
  async listAirlineInitiatedChanges(params) {
    const response = await this.#api.listAirlineInitiatedChanges(params);
    return response.map(transformAirlineInitiatedChange);
  }

  async updateAirlineInitiatedChange(params) {
    const response = await this.#api.updateAirlineInitiatedChange(params);
    return transformAirlineInitiatedChange(response);
  }

  async acceptAirlineInitiatedChange(params) {
    const response = await this.#api.acceptAirlineInitiatedChange(params);
    return transformAirlineInitiatedChange(response);
  }
}
