export type PartialOfferRequestSlice = {
  origin: string; // IATA code of origin airport/city
  destination: string; // IATA code of destination airport/city
  departure_date: string; // ISO 8601 date
};

export type PartialOfferRequestPassenger = {
  type: "adult" | "child" | "infant_without_seat" | "infant_with_seat";
  age?: number; // Age in years at time of departure
  loyalty_programme_accounts?: Array<{
    airline_iata_code: string; // IATA code of airline
    account_number: string; // Loyalty program account number
  }>;
};

export type CreatePartialOfferRequest = {
  slices: PartialOfferRequestSlice[];
  passengers: PartialOfferRequestPassenger[];
  cabin_class?: "first" | "business" | "premium_economy" | "economy";
  supplier_timeout?: number; // Timeout in seconds (min: 1, max: 60)
};

export type PartialOfferRequestResponse = {
  data: {
    id: string;
    live_mode: boolean;
    created_at: string; // ISO 8601 datetime
    updated_at: string; // ISO 8601 datetime
    slices: Array<{
      origin: {
        iata_code: string;
        iata_country_code: string;
        icao_code: string;
        name: string;
        latitude: number;
        longitude: number;
        time_zone: string;
        city_name: string;
        city_iata_code: string;
      };
      destination: {
        iata_code: string;
        iata_country_code: string;
        icao_code: string;
        name: string;
        latitude: number;
        longitude: number;
        time_zone: string;
        city_name: string;
        city_iata_code: string;
      };
      departure_date: string; // ISO 8601 date
    }>;
    passengers: Array<{
      id: string;
      type: "adult" | "child" | "infant_without_seat" | "infant_with_seat";
      age?: number;
      loyalty_programme_accounts: Array<{
        airline_iata_code: string;
        account_number: string;
      }>;
    }>;
    cabin_class?: "first" | "business" | "premium_economy" | "economy";
    offers: Array<{
      id: string;
      live_mode: boolean;
      created_at: string; // ISO 8601 datetime
      updated_at: string; // ISO 8601 datetime
      available_services: Array<{
        id: string;
        maximum_quantity: number;
        passenger_ids: string[];
        segment_ids: string[];
        total_amount: string; // Decimal string
        total_currency: string; // ISO 4217
        type: string;
      }>;
      base_amount: string; // Decimal string
      base_currency: string; // ISO 4217
      conditions: {
        change_before_departure: {
          allowed: boolean;
          penalty_amount?: string; // Decimal string
          penalty_currency?: string; // ISO 4217
        };
        refund_before_departure: {
          allowed: boolean;
          penalty_amount?: string; // Decimal string
          penalty_currency?: string; // ISO 4217
        };
      };
      owner: {
        iata_code: string;
        name: string;
      };
      passenger_identity_documents_required: boolean;
      passengers: Array<{
        id: string;
        given_name?: string;
        family_name?: string;
        loyalty_programme_accounts: Array<{
          airline_iata_code: string;
          account_number: string;
        }>;
      }>;
      payment_requirements: {
        requires_instant_payment: boolean;
        price_guarantee_expires_at: string; // ISO 8601 datetime
        payment_required_by: string; // ISO 8601 datetime
      };
      slices: Array<{
        id: string;
        origin: {
          iata_code: string;
          iata_country_code: string;
          icao_code: string;
          name: string;
          latitude: number;
          longitude: number;
          time_zone: string;
          city_name: string;
          city_iata_code: string;
        };
        destination: {
          iata_code: string;
          iata_country_code: string;
          icao_code: string;
          name: string;
          latitude: number;
          longitude: number;
          time_zone: string;
          city_name: string;
          city_iata_code: string;
        };
        departure_datetime: string; // ISO 8601 datetime
        arrival_datetime: string; // ISO 8601 datetime
        duration: string; // ISO 8601 duration
        segments: Array<{
          id: string;
          aircraft: {
            iata_code: string;
            name: string;
          };
          arriving_at: string; // ISO 8601 datetime
          departing_at: string; // ISO 8601 datetime
          destination: {
            iata_code: string;
            iata_country_code: string;
            icao_code: string;
            name: string;
            latitude: number;
            longitude: number;
            time_zone: string;
            city_name: string;
            city_iata_code: string;
          };
          destination_terminal?: string;
          duration: string; // ISO 8601 duration
          marketing_carrier: {
            iata_code: string;
            name: string;
          };
          marketing_carrier_flight_number: string;
          operating_carrier: {
            iata_code: string;
            name: string;
          };
          operating_carrier_flight_number: string;
          origin: {
            iata_code: string;
            iata_country_code: string;
            icao_code: string;
            name: string;
            latitude: number;
            longitude: number;
            time_zone: string;
            city_name: string;
            city_iata_code: string;
          };
          origin_terminal?: string;
          stops: number;
        }>;
      }>;
      tax_amount: string; // Decimal string
      tax_currency: string; // ISO 4217
      total_amount: string; // Decimal string
      total_currency: string; // ISO 4217
      total_emissions_kg: string; // Decimal string
    }>;
  };
};

export type GetPartialOfferRequest = {
  id: string;
};

export type GetPartialOfferFaresRequest = {
  id: string;
  options?: {
    selected_partial_offers?: Array<{
      partial_offer_id: string;
      passenger_ids: string[];
    }>;
  };
};

export type ListPartialOfferRequestsParams = {
  after?: string; // Identifier of the last item in the previous page
  before?: string; // Identifier of the first item in the previous page
  limit?: number; // Maximum number of records to return (1-200)
};

export type ListPartialOfferRequestsResponse = {
  data: {
    partial_offer_requests: PartialOfferRequestResponse[];
    slice_data: {
      slices: Array<{
        origin: {
          iata_code: string;
          iata_country_code: string;
          icao_code: string;
          name: string;
          latitude: number;
          longitude: number;
          time_zone: string;
          city_name: string;
          city_iata_code: string;
        };
        destination: {
          iata_code: string;
          iata_country_code: string;
          icao_code: string;
          name: string;
          latitude: number;
          longitude: number;
          time_zone: string;
          city_name: string;
          city_iata_code: string;
        };
        departure_date: string;
      }>;
    };
    pagination: {
      before: string | null;
      after: string | null;
      limit: number;
    };
  };
};

export type OfferPassenger = {
  id: string;
  given_name?: string;
  family_name?: string;
  loyalty_programme_accounts: Array<{
    airline_iata_code: string;
    account_number: string;
  }>;
};

export type OfferSlice = {
  id: string;
  origin: {
    iata_code: string;
    iata_country_code: string;
    icao_code: string;
    name: string;
    latitude: number;
    longitude: number;
    time_zone: string;
    city_name: string;
    city_iata_code: string;
  };
  destination: {
    iata_code: string;
    iata_country_code: string;
    icao_code: string;
    name: string;
    latitude: number;
    longitude: number;
    time_zone: string;
    city_name: string;
    city_iata_code: string;
  };
  departure_datetime: string;
  arrival_datetime: string;
  duration: string;
  segments: Array<{
    id: string;
    aircraft: {
      iata_code: string;
      name: string;
    };
    arriving_at: string;
    departing_at: string;
    destination: {
      iata_code: string;
      iata_country_code: string;
      icao_code: string;
      name: string;
      latitude: number;
      longitude: number;
      time_zone: string;
      city_name: string;
      city_iata_code: string;
    };
    destination_terminal?: string;
    duration: string;
    marketing_carrier: {
      iata_code: string;
      name: string;
    };
    marketing_carrier_flight_number: string;
    operating_carrier: {
      iata_code: string;
      name: string;
    };
    operating_carrier_flight_number: string;
    origin: {
      iata_code: string;
      iata_country_code: string;
      icao_code: string;
      name: string;
      latitude: number;
      longitude: number;
      time_zone: string;
      city_name: string;
      city_iata_code: string;
    };
    origin_terminal?: string;
    stops: number;
  }>;
};

export type OfferResponse = {
  data: {
    id: string;
    live_mode: boolean;
    available_services: Array<{
      id: string;
      maximum_quantity: number;
      passenger_ids: string[];
      segment_ids: string[];
      total_amount: string;
      total_currency: string;
      type: string;
    }>;
    base_amount: string;
    base_currency: string;
    conditions: {
      change_before_departure: {
        allowed: boolean;
        penalty_amount?: string;
        penalty_currency?: string;
      };
      refund_before_departure: {
        allowed: boolean;
        penalty_amount?: string;
        penalty_currency?: string;
      };
    };
    created_at: string;
    updated_at: string;
    owner: {
      iata_code: string;
      name: string;
    };
    passenger_identity_documents_required: boolean;
    passengers: OfferPassenger[];
    payment_requirements: {
      requires_instant_payment: boolean;
      price_guarantee_expires_at: string;
      payment_required_by: string;
    };
    slices: OfferSlice[];
    tax_amount: string;
    tax_currency: string;
    total_amount: string;
    total_currency: string;
    total_emissions_kg: string;
  };
};

export type GetOfferRequest = {
  id: string;
  return_available_services?: boolean;
};

export type ListOffersRequest = {
  offer_request_id: string;
  after?: string;
  before?: string;
  limit?: number;
  return_available_services?: boolean;
  sort?: "total_amount" | "-total_amount";
};

export type ListOffersResponse = {
  data: {
    offers: OfferResponse[];
    pagination: {
      before: string | null;
      after: string | null;
      limit: number;
    };
  };
};

export type UpdateOfferPassengerRequest = {
  offer_id: string;
  passenger_id: string;
  given_name: string;
  family_name: string;
  loyalty_programme_accounts?: Array<{
    airline_iata_code: string;
    account_number: string;
  }>;
};

export type UpdateOfferPassengerResponse = {
  data: {
    id: string;
    live_mode: boolean;
    available_services: Array<{
      id: string;
      maximum_quantity: number;
      passenger_ids: string[];
      segment_ids: string[];
      total_amount: string;
      total_currency: string;
      type: string;
    }>;
    base_amount: string;
    base_currency: string;
    conditions: {
      change_before_departure: {
        allowed: boolean;
        penalty_amount?: string;
        penalty_currency?: string;
      };
      refund_before_departure: {
        allowed: boolean;
        penalty_amount?: string;
        penalty_currency?: string;
      };
    };
    created_at: string;
    updated_at: string;
    owner: {
      iata_code: string;
      name: string;
    };
    passenger_identity_documents_required: boolean;
    passengers: Array<{
      id: string;
      given_name: string;
      family_name: string;
      loyalty_programme_accounts: Array<{
        airline_iata_code: string;
        account_number: string;
      }>;
    }>;
    payment_requirements: {
      requires_instant_payment: boolean;
      price_guarantee_expires_at: string;
      payment_required_by: string;
    };
    slices: OfferSlice[];
    tax_amount: string;
    tax_currency: string;
    total_amount: string;
    total_currency: string;
    total_emissions_kg: string;
  };
};

export type OrderPassenger = {
  id: string;
  born_on: string;
  title: "mr" | "ms" | "mrs" | "miss" | "dr" | "prof";
  gender: "m" | "f";
  given_name: string;
  family_name: string;
  email: string;
  phone_number: string;
  infant_passenger?: {
    born_on: string;
    given_name: string;
    family_name: string;
  };
  identity_documents: Array<{
    unique_identifier: string;
    expires_on: string;
    issuing_country_code: string;
    type:
    | "passport"
    | "national_id"
    | "visa"
    | "known_traveler_number"
    | "redress_number";
  }>;
};

export type CreateOrderRequest = {
  selected_offers: string[];
  passengers: Array<{
    born_on: string;
    title: "mr" | "ms" | "mrs" | "miss" | "dr" | "prof";
    gender: "m" | "f";
    given_name: string;
    family_name: string;
    email: string;
    phone_number: string;
    infant_passenger?: {
      born_on: string;
      given_name: string;
      family_name: string;
    };
    identity_documents?: Array<{
      unique_identifier: string;
      expires_on: string;
      issuing_country_code: string;
      type:
      | "passport"
      | "national_id"
      | "visa"
      | "known_traveler_number"
      | "redress_number";
    }>;
  }>;
  services?: Array<{
    id: string;
    quantity: number;
  }>;
  payments?: Array<{
    type: "balance" | "card" | "instant_bank_transfer";
    amount: string;
    currency: string;
  }>;
  type: "instant" | "pay_later";
  metadata?: Record<string, string>;
};

export type OrderResponse = {
  data: {
    id: string;
    live_mode: boolean;
    booking_reference: string;
    created_at: string;
    updated_at: string;
    owner: {
      iata_code: string;
      name: string;
    };
    passengers: OrderPassenger[];
    services: Array<{
      id: string;
      quantity: number;
      status: "confirmed" | "pending" | "cancelled";
      type: string;
      metadata: Record<string, string>;
    }>;
    slices: Array<{
      id: string;
      origin: {
        iata_code: string;
        iata_country_code: string;
        icao_code: string;
        name: string;
        latitude: number;
        longitude: number;
        time_zone: string;
        city_name: string;
        city_iata_code: string;
      };
      destination: {
        iata_code: string;
        iata_country_code: string;
        icao_code: string;
        name: string;
        latitude: number;
        longitude: number;
        time_zone: string;
        city_name: string;
        city_iata_code: string;
      };
      departure_datetime: string;
      arrival_datetime: string;
      duration: string;
      segments: Array<{
        id: string;
        aircraft: {
          iata_code: string;
          name: string;
        };
        arriving_at: string;
        departing_at: string;
        destination: {
          iata_code: string;
          iata_country_code: string;
          icao_code: string;
          name: string;
          latitude: number;
          longitude: number;
          time_zone: string;
          city_name: string;
          city_iata_code: string;
        };
        destination_terminal?: string;
        duration: string;
        marketing_carrier: {
          iata_code: string;
          name: string;
        };
        marketing_carrier_flight_number: string;
        operating_carrier: {
          iata_code: string;
          name: string;
        };
        operating_carrier_flight_number: string;
        origin: {
          iata_code: string;
          iata_country_code: string;
          icao_code: string;
          name: string;
          latitude: number;
          longitude: number;
          time_zone: string;
          city_name: string;
          city_iata_code: string;
        };
        origin_terminal?: string;
        stops: number;
      }>;
    }>;
    total_amount: string;
    total_currency: string;
    base_amount: string;
    base_currency: string;
    tax_amount: string;
    tax_currency: string;
    payment_status: {
      awaiting_payment: boolean;
      price_guarantee_expires_at: string;
      payment_required_by: string;
      price_guaranteed: boolean;
    };
    documents: Array<{
      type: "electronic_ticket" | "electronic_miscellaneous_document";
      unique_identifier: string;
      issued_at: string;
    }>;
    conditions: {
      change_before_departure: {
        allowed: boolean;
        penalty_amount?: string;
        penalty_currency?: string;
      };
      refund_before_departure: {
        allowed: boolean;
        penalty_amount?: string;
        penalty_currency?: string;
      };
    };
    metadata?: Record<string, string>;
  };
};

export type ListOrdersRequest = {
  awaiting_payment?: boolean;
  "passenger_name[]"?: string[];
  booking_reference?: string;
  after?: string;
  before?: string;
  limit?: number;
};

export type ListOrdersResponse = {
  data: {
    orders: OrderResponse[];
    pagination: {
      before: string | null;
      after: string | null;
      limit: number;
    };
  };
};

export type GetOrderRequest = {
  id: string;
};

export type UpdateOrderRequest = {
  id: string;
  metadata: Record<string, string>;
};

export type CreatePaymentRequest = {
  order_id: string;
  payment: {
    type: "balance" | "card" | "instant_bank_transfer";
    amount: string;
    currency: string;
    // Only required when type is "card"
    card?: {
      number: string;
      expiry_month: number;
      expiry_year: number;
      cvv?: string;
    };
  };
};

export type PaymentResponse = {
  data: {
    id: string;
    live_mode: boolean;
    amount: string;
    currency: string;
    created_at: string;
    status: "pending" | "succeeded" | "failed";
    type: "balance" | "card" | "instant_bank_transfer";
    order_id: string;
  };
};

export type GetSeatMapsRequest = {
  offer_id: string;
};

export type SeatMapResponse = {
  data: Array<{
    id: string;
    cabins: Array<{
      aisles: number;
      rows: Array<{
        elements: Array<{
          designator: string; // The seat number, e.g. "1A"
          type: "seat" | "exit_row" | "empty" | "unknown";
          available_services: Array<{
            id: string;
            total_amount: string;
            total_currency: string;
          }>;
          // Only included when type is "seat"
          disclosures?: Array<
            | "exit_row"
            | "leg_space_limited"
            | "leg_space_extra"
            | "window"
            | "aisle"
            | "middle"
          >;
          name?: string;
          // Only included when type is "seat"
          restricted_by_passenger_ids?: string[];
          // Only included when type is "seat"
          restricted_to_passenger_ids?: string[];
        }>;
        row_number: string;
      }>;
      deck: number;
      wings: {
        first_row_index: number;
        last_row_index: number;
      };
    }>;
    segment_id: string;
  }>;
};

export type GetOrderChangeRequest = {
  id: string;
};

export type ConfirmOrderChangeRequest = {
  id: string;
  payment: {
    type: "balance" | "card" | "instant_bank_transfer";
    amount: string;
    currency: string;
    // Only required when type is "card"
    card?: {
      number: string;
      expiry_month: number;
      expiry_year: number;
      cvv?: string;
    };
  };
};

export type OrderChangeResponse = {
  data: {
    id: string;
    live_mode: boolean;
    created_at: string;
    expires_at: string;
    order_id: string;
    slices: {
      add: Array<{
        id: string;
        origin: {
          iata_code: string;
          iata_country_code: string;
          icao_code: string;
          name: string;
          latitude: number;
          longitude: number;
          time_zone: string;
          city_name: string;
          city_iata_code: string;
        };
        destination: {
          iata_code: string;
          iata_country_code: string;
          icao_code: string;
          name: string;
          latitude: number;
          longitude: number;
          time_zone: string;
          city_name: string;
          city_iata_code: string;
        };
        departure_datetime: string;
        arrival_datetime: string;
        duration: string;
        segments: Array<{
          id: string;
          aircraft: {
            iata_code: string;
            name: string;
          };
          arriving_at: string;
          departing_at: string;
          destination: {
            iata_code: string;
            iata_country_code: string;
            icao_code: string;
            name: string;
            latitude: number;
            longitude: number;
            time_zone: string;
            city_name: string;
            city_iata_code: string;
          };
          destination_terminal?: string;
          duration: string;
          marketing_carrier: {
            iata_code: string;
            name: string;
          };
          marketing_carrier_flight_number: string;
          operating_carrier: {
            iata_code: string;
            name: string;
          };
          operating_carrier_flight_number: string;
          origin: {
            iata_code: string;
            iata_country_code: string;
            icao_code: string;
            name: string;
            latitude: number;
            longitude: number;
            time_zone: string;
            city_name: string;
            city_iata_code: string;
          };
          origin_terminal?: string;
          stops: number;
        }>;
      }>;
      remove: Array<{
        slice_id: string;
      }>;
    };
    penalties: Array<{
      amount: string;
      currency: string;
    }>;
    change_total_amount: string;
    change_total_currency: string;
    refund_to: {
      type: "balance" | "card" | "instant_bank_transfer";
      amount: string;
      currency: string;
    };
    new_total_amount: string;
    new_total_currency: string;
    conditions: {
      change_before_departure: {
        allowed: boolean;
        penalty_amount?: string;
        penalty_currency?: string;
      };
      refund_before_departure: {
        allowed: boolean;
        penalty_amount?: string;
        penalty_currency?: string;
      };
    };
  };
};

export type CreateOrderCancellationRequest = {
  order_id: string;
};

export type GetOrderCancellationRequest = {
  id: string;
};

export type ConfirmOrderCancellationRequest = {
  id: string;
};

export type ListOrderCancellationsRequest = {
  order_id?: string;
  before?: string;
  after?: string;
  limit?: number;
};

export type OrderCancellationResponse = {
  data: {
    id: string;
    live_mode: boolean;
    created_at: string;
    expires_at: string;
    refund_amount: string;
    refund_currency: string;
    refund_to: {
      type: "balance" | "card" | "instant_bank_transfer";
      amount: string;
      currency: string;
    };
    order_id: string;
    confirmed_at?: string;
    status: "pending" | "confirmed" | "expired";
    penalties: Array<{
      amount: string;
      currency: string;
    }>;
  };
};

export type ListOrderCancellationsResponse = {
  data: {
    order_cancellations: OrderCancellationResponse[];
    pagination: {
      before: string | null;
      after: string | null;
      limit: number;
    };
  };
};

export type ListOrderChangeOffersRequest = {
  order_change_request_id: string;
  after?: string;
  before?: string;
  limit?: number;
  return_available_services?: boolean;
  sort?: "total_amount" | "-total_amount";
};

export type GetOrderChangeOfferRequest = {
  id: string;
  return_available_services?: boolean;
};

export type OrderChangeOfferResponse = {
  data: {
    id: string;
    live_mode: boolean;
    created_at: string;
    updated_at: string;
    available_services: Array<{
      id: string;
      maximum_quantity: number;
      passenger_ids: string[];
      segment_ids: string[];
      total_amount: string;
      total_currency: string;
      type: string;
    }>;
    change_total_amount: string;
    change_total_currency: string;
    expires_at: string;
    new_total_amount: string;
    new_total_currency: string;
    order_change_request_id: string;
    penalties: Array<{
      amount: string;
      currency: string;
    }>;
    refund_to: {
      type: "balance" | "card" | "instant_bank_transfer";
      amount: string;
      currency: string;
    };
    slices: {
      add: Array<{
        id: string;
        origin: {
          iata_code: string;
          iata_country_code: string;
          icao_code: string;
          name: string;
          latitude: number;
          longitude: number;
          time_zone: string;
          city_name: string;
          city_iata_code: string;
        };
        destination: {
          iata_code: string;
          iata_country_code: string;
          icao_code: string;
          name: string;
          latitude: number;
          longitude: number;
          time_zone: string;
          city_name: string;
          city_iata_code: string;
        };
        departure_datetime: string;
        arrival_datetime: string;
        duration: string;
        segments: Array<{
          id: string;
          aircraft: {
            iata_code: string;
            name: string;
          };
          arriving_at: string;
          departing_at: string;
          destination: {
            iata_code: string;
            iata_country_code: string;
            icao_code: string;
            name: string;
            latitude: number;
            longitude: number;
            time_zone: string;
            city_name: string;
            city_iata_code: string;
          };
          destination_terminal?: string;
          duration: string;
          marketing_carrier: {
            iata_code: string;
            name: string;
          };
          marketing_carrier_flight_number: string;
          operating_carrier: {
            iata_code: string;
            name: string;
          };
          operating_carrier_flight_number: string;
          origin: {
            iata_code: string;
            iata_country_code: string;
            icao_code: string;
            name: string;
            latitude: number;
            longitude: number;
            time_zone: string;
            city_name: string;
            city_iata_code: string;
          };
          origin_terminal?: string;
          stops: number;
        }>;
      }>;
      remove: Array<{
        slice_id: string;
      }>;
    };
    conditions: {
      change_before_departure: {
        allowed: boolean;
        penalty_amount?: string;
        penalty_currency?: string;
      };
      refund_before_departure: {
        allowed: boolean;
        penalty_amount?: string;
        penalty_currency?: string;
      };
    };
  };
};

export type ListOrderChangeOffersResponse = {
  data: {
    order_change_offers: OrderChangeOfferResponse[];
    pagination: {
      before: string | null;
      after: string | null;
      limit: number;
    };
  };
};

export type CreateOrderChangeRequestRequest = {
  order_id: string;
  slices: {
    add?: Array<{
      cabin_class?: "first" | "business" | "premium_economy" | "economy";
      departure_date: string;
      destination: string;
      origin: string;
    }>;
    remove?: Array<{
      slice_id: string;
    }>;
  };
};

export type GetOrderChangeRequestRequest = {
  id: string;
};

export type OrderChangeRequestResponse = {
  data: {
    id: string;
    live_mode: boolean;
    created_at: string;
    expires_at: string;
    order_id: string;
    slices: {
      add: Array<{
        cabin_class?: "first" | "business" | "premium_economy" | "economy";
        departure_date: string;
        destination: {
          iata_code: string;
          iata_country_code: string;
          icao_code: string;
          name: string;
          latitude: number;
          longitude: number;
          time_zone: string;
          city_name: string;
          city_iata_code: string;
        };
        origin: {
          iata_code: string;
          iata_country_code: string;
          icao_code: string;
          name: string;
          latitude: number;
          longitude: number;
          time_zone: string;
          city_name: string;
          city_iata_code: string;
        };
      }>;
      remove: Array<{
        slice_id: string;
      }>;
    };
    status: "pending" | "completed";
    order_change_offers: Array<{
      id: string;
      created_at: string;
      expires_at: string;
      change_total_amount: string;
      change_total_currency: string;
      new_total_amount: string;
      new_total_currency: string;
      penalties: Array<{
        amount: string;
        currency: string;
      }>;
      refund_to: {
        type: "balance" | "card" | "instant_bank_transfer";
        amount: string;
        currency: string;
      };
      slices: {
        add: Array<{
          id: string;
          origin: {
            iata_code: string;
            iata_country_code: string;
            icao_code: string;
            name: string;
            latitude: number;
            longitude: number;
            time_zone: string;
            city_name: string;
            city_iata_code: string;
          };
          destination: {
            iata_code: string;
            iata_country_code: string;
            icao_code: string;
            name: string;
            latitude: number;
            longitude: number;
            time_zone: string;
            city_name: string;
            city_iata_code: string;
          };
          departure_datetime: string;
          arrival_datetime: string;
          duration: string;
          segments: Array<{
            id: string;
            aircraft: {
              iata_code: string;
              name: string;
            };
            arriving_at: string;
            departing_at: string;
            destination: {
              iata_code: string;
              iata_country_code: string;
              icao_code: string;
              name: string;
              latitude: number;
              longitude: number;
              time_zone: string;
              city_name: string;
              city_iata_code: string;
            };
            destination_terminal?: string;
            duration: string;
            marketing_carrier: {
              iata_code: string;
              name: string;
            };
            marketing_carrier_flight_number: string;
            operating_carrier: {
              iata_code: string;
              name: string;
            };
            operating_carrier_flight_number: string;
            origin: {
              iata_code: string;
              iata_country_code: string;
              icao_code: string;
              name: string;
              latitude: number;
              longitude: number;
              time_zone: string;
              city_name: string;
              city_iata_code: string;
            };
            origin_terminal?: string;
            stops: number;
          }>;
        }>;
        remove: Array<{
          slice_id: string;
        }>;
      };
      conditions: {
        change_before_departure: {
          allowed: boolean;
          penalty_amount?: string;
          penalty_currency?: string;
        };
        refund_before_departure: {
          allowed: boolean;
          penalty_amount?: string;
          penalty_currency?: string;
        };
      };
    }>;
  };
};

export type ListAirlineInitiatedChangesRequest = {
  order_id: string;
  before?: string;
  after?: string;
  limit?: number;
};

export type UpdateAirlineInitiatedChangeRequest = {
  id: string;
  action_taken:
  | "accepted"
  | "alternative_requested"
  | "customer_service_requested";
};

export type AcceptAirlineInitiatedChangeRequest = {
  id: string;
};

export type AirlineInitiatedChangeResponse = {
  data: {
    id: string;
    live_mode: boolean;
    created_at: string;
    updated_at: string;
    order_id: string;
    status:
    | "pending"
    | "accepted"
    | "alternative_requested"
    | "customer_service_requested";
    slices: {
      add: Array<{
        id: string;
        origin: {
          iata_code: string;
          iata_country_code: string;
          icao_code: string;
          name: string;
          latitude: number;
          longitude: number;
          time_zone: string;
          city_name: string;
          city_iata_code: string;
        };
        destination: {
          iata_code: string;
          iata_country_code: string;
          icao_code: string;
          name: string;
          latitude: number;
          longitude: number;
          time_zone: string;
          city_name: string;
          city_iata_code: string;
        };
        departure_datetime: string;
        arrival_datetime: string;
        duration: string;
        segments: Array<{
          id: string;
          aircraft: {
            iata_code: string;
            name: string;
          };
          arriving_at: string;
          departing_at: string;
          destination: {
            iata_code: string;
            iata_country_code: string;
            icao_code: string;
            name: string;
            latitude: number;
            longitude: number;
            time_zone: string;
            city_name: string;
            city_iata_code: string;
          };
          destination_terminal?: string;
          duration: string;
          marketing_carrier: {
            iata_code: string;
            name: string;
          };
          marketing_carrier_flight_number: string;
          operating_carrier: {
            iata_code: string;
            name: string;
          };
          operating_carrier_flight_number: string;
          origin: {
            iata_code: string;
            iata_country_code: string;
            icao_code: string;
            name: string;
            latitude: number;
            longitude: number;
            time_zone: string;
            city_name: string;
            city_iata_code: string;
          };
          origin_terminal?: string;
          stops: number;
        }>;
      }>;
      remove: Array<{
        slice_id: string;
      }>;
    };
    reason: {
      code:
      | "schedule_change"
      | "route_change"
      | "aircraft_change"
      | "flight_cancellation"
      | "flight_discontinuation"
      | "other";
      category: "minor" | "major";
      description?: string;
    };
  };
};

export type ListAirlineInitiatedChangesResponse = {
  data: {
    airline_initiated_changes: AirlineInitiatedChangeResponse[];
    pagination: {
      before: string | null;
      after: string | null;
      limit: number;
    };
  };
};

export type ListAirlinesRequest = {
  before?: string;
  after?: string;
  limit?: number;
};

export type GetAirlineRequest = {
  id: string;
};

export type AirlineResponse = {
  data: {
    id: string;
    name: string;
    iata_code: string | null;
    logo_symbol_url: string | null;
    logo_lockup_url: string | null;
    conditions_of_carriage_url: string | null;
    created_at: string;
    updated_at: string;
  };
};

export type ListAirlinesResponse = {
  data: {
    airlines: AirlineResponse[];
    pagination: {
      before: string | null;
      after: string | null;
      limit: number;
    };
  };
};

export type ListAircraftRequest = {
  before?: string;
  after?: string;
  limit?: number;
};

export type GetAircraftRequest = {
  id: string;
};

export type AircraftResponse = {
  data: {
    id: string;
    name: string;
    iata_code: string | null;
    created_at: string;
    updated_at: string;
  };
};

export type ListAircraftResponse = {
  data: {
    aircraft: AircraftResponse[];
    pagination: {
      before: string | null;
      after: string | null;
      limit: number;
    };
  };
};

export type ListAirportsRequest = {
  before?: string;
  after?: string;
  limit?: number;
};

export type GetAirportRequest = {
  id: string;
};

export type AirportResponse = {
  data: {
    id: string;
    name: string;
    iata_code: string;
    icao_code: string;
    latitude: number;
    longitude: number;
    time_zone: string;
    city_name: string;
    city: {
      id: string;
      name: string;
      iata_code: string | null;
    };
    country: {
      id: string;
      name: string;
      iso2: string;
    };
    metropolitan_area: {
      id: string;
      name: string;
      iata_code: string | null;
    } | null;
    created_at: string;
    updated_at: string;
  };
};

export type ListAirportsResponse = {
  data: {
    airports: AirportResponse[];
    pagination: {
      before: string | null;
      after: string | null;
      limit: number;
    };
  };
};

export type ListCitiesRequest = {
  before?: string;
  after?: string;
  limit?: number;
};

export type GetCityRequest = {
  id: string;
};

export type CityResponse = {
  data: {
    id: string;
    name: string;
    iata_code: string | null;
    iata_country_code: string;
    latitude: number;
    longitude: number;
    time_zone: string;
    country: {
      id: string;
      name: string;
      iso2: string;
    };
    metropolitan_area: {
      id: string;
      name: string;
      iata_code: string | null;
    } | null;
    created_at: string;
    updated_at: string;
  };
};

export type ListCitiesResponse = {
  data: {
    cities: CityResponse[];
    pagination: {
      before: string | null;
      after: string | null;
      limit: number;
    };
  };
};

export type PlaceType = "airport" | "city";

export type SearchPlacesRequest = {
  query: string;
  type?: PlaceType;
  limit?: number;
};

export type PlaceResponse = {
  data: Array<{
    type: PlaceType;
    name: string;
    iata_code: string | null;
    iata_country_code: string;
    icao_code: string | null;
    latitude: number;
    longitude: number;
    time_zone: string;
    city_name?: string;
    city: {
      id: string;
      name: string;
      iata_code: string | null;
    } | null;
    metropolitan_area: {
      id: string;
      name: string;
      iata_code: string | null;
    } | null;
    country: {
      id: string;
      name: string;
      iso2: string;
    };
  }>;
};

export type ListLoyaltyProgrammesRequest = {
  airline_iata_code?: string;
  before?: string;
  after?: string;
  limit?: number;
};

export type GetLoyaltyProgrammeRequest = {
  id: string;
};

export type LoyaltyProgrammeResponse = {
  data: {
    id: string;
    name: string;
    airline: {
      id: string;
      name: string;
      iata_code: string;
    };
    created_at: string;
    updated_at: string;
  };
};

export type ListLoyaltyProgrammesResponse = {
  data: {
    loyalty_programmes: LoyaltyProgrammeResponse[];
    pagination: {
      before: string | null;
      after: string | null;
      limit: number;
    };
  };
};
