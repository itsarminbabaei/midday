export type FlightOffersSearchRequest = {
  // Required parameters
  originLocationCode: string;        // IATA city/airport code
  destinationLocationCode: string;   // IATA city/airport code
  departureDate: string;            // YYYY-MM-DD
  adults: number;                   // Minimum 1, Maximum 9

  // Optional parameters
  returnDate?: string;              // YYYY-MM-DD
  children?: number;                // Age 2-12 - Maximum 9
  infants?: number;                 // Age 0-2 - Maximum 9
  travelClass?: "ECONOMY" | "PREMIUM_ECONOMY" | "BUSINESS" | "FIRST";
  includedAirlineCodes?: string;    // Comma-separated IATA airline codes
  excludedAirlineCodes?: string;    // Comma-separated IATA airline codes
  nonStop?: boolean;
  currencyCode?: string;            // ISO 4217 format
  maxPrice?: number;                // Maximum price per traveler
  max?: number;                     // Maximum number of flight offers (1-250)
};

export type FlightOffersSearchResponse = {
  data: Array<{
    type: string;                   // "flight-offer"
    id: string;
    source: string;                 // "GDS"
    instantTicketingRequired: boolean;
    nonHomogeneous: boolean;
    oneWay: boolean;
    lastTicketingDate: string;      // YYYY-MM-DD
    numberOfBookableSeats: number;
    itineraries: Array<{
      duration: string;             // PnYnMnDTnHnMnS
      segments: Array<{
        departure: {
          iataCode: string;
          terminal?: string;
          at: string;               // YYYY-MM-DDTHH:mm:ss
        };
        arrival: {
          iataCode: string;
          terminal?: string;
          at: string;               // YYYY-MM-DDTHH:mm:ss
        };
        carrierCode: string;        // IATA airline code
        number: string;             // Flight number
        aircraft: {
          code: string;             // IATA aircraft code
        };
        operating: {
          carrierCode: string;      // IATA airline code
        };
        duration: string;           // PnYnMnDTnHnMnS
        id: string;
        numberOfStops: number;
        blacklistedInEU: boolean;
      }>;
    }>;
    price: {
      currency: string;             // ISO 4217
      total: string;
      base: string;
      fees: Array<{
        amount: string;
        type: string;
      }>;
      grandTotal: string;
      additionalServices?: Array<{
        amount: string;
        type: string;
      }>;
    };
    pricingOptions: {
      fareType: string[];          // ["PUBLISHED"]
      includedCheckedBagsOnly: boolean;
    };
    validatingAirlineCodes: string[];
    travelerPricings: Array<{
      travelerId: string;
      fareOption: string;
      travelerType: "ADULT" | "CHILD" | "INFANT";
      price: {
        currency: string;
        total: string;
        base: string;
        taxes: Array<{
          amount: string;
          code: string;
        }>;
      };
      fareDetailsBySegment: Array<{
        segmentId: string;
        cabin: string;
        fareBasis: string;
        brandedFare?: string;
        class: string;
        includedCheckedBags: {
          quantity: number;
        };
      }>;
    }>;
  }>;
  dictionaries?: {
    locations: Record<string, {
      cityCode: string;
      countryCode: string;
    }>;
    aircraft: Record<string, string>;
    currencies: Record<string, string>;
    carriers: Record<string, string>;
  };
};

export type FlightOffersPriceRequest = {
  data: {
    type: "flight-offers-pricing";
    flightOffers: FlightOffersSearchResponse['data']; // Reuse the flight offers from search
  };
};

export type FlightOffersPriceResponse = {
  data: {
    type: string;                   // "flight-offers-pricing"
    flightOffers: Array<{
      type: string;                 // "flight-offer"
      id: string;
      source: string;               // "GDS"
      instantTicketingRequired: boolean;
      nonHomogeneous: boolean;
      oneWay: boolean;
      lastTicketingDate: string;    // YYYY-MM-DD
      numberOfBookableSeats: number;
      itineraries: Array<{
        duration: string;           // PnYnMnDTnHnMnS
        segments: Array<{
          departure: {
            iataCode: string;
            terminal?: string;
            at: string;             // YYYY-MM-DDTHH:mm:ss
          };
          arrival: {
            iataCode: string;
            terminal?: string;
            at: string;             // YYYY-MM-DDTHH:mm:ss
          };
          carrierCode: string;      // IATA airline code
          number: string;           // Flight number
          aircraft: {
            code: string;           // IATA aircraft code
          };
          operating: {
            carrierCode: string;    // IATA airline code
          };
          duration: string;         // PnYnMnDTnHnMnS
          id: string;
          numberOfStops: number;
          blacklistedInEU: boolean;
        }>;
      }>;
      price: {
        currency: string;           // ISO 4217
        total: string;
        base: string;
        fees: Array<{
          amount: string;
          type: string;
        }>;
        grandTotal: string;
        billingCurrency: string;
      };
      pricingOptions: {
        fareType: string[];         // ["PUBLISHED"]
        includedCheckedBagsOnly: boolean;
      };
      validatingAirlineCodes: string[];
      travelerPricings: Array<{
        travelerId: string;
        fareOption: string;
        travelerType: "ADULT" | "CHILD" | "INFANT";
        price: {
          currency: string;
          total: string;
          base: string;
          taxes: Array<{
            amount: string;
            code: string;
          }>;
        };
        fareDetailsBySegment: Array<{
          segmentId: string;
          cabin: string;
          fareBasis: string;
          brandedFare?: string;
          class: string;
          includedCheckedBags: {
            quantity: number;
          };
        }>;
      }>;
    }>;
    bookingRequirements?: {
      invoiceAddressRequired: boolean;
      emailAddressRequired: boolean;
      phoneCountryCodeRequired: boolean;
      mobilePhoneNumberRequired: boolean;
      postalCodeRequired: boolean;
    };
  };
  dictionaries?: {
    locations: Record<string, {
      cityCode: string;
      countryCode: string;
    }>;
    aircraft: Record<string, string>;
    currencies: Record<string, string>;
    carriers: Record<string, string>;
  };
};

export type FlightCreateOrderRequest = {
  data: {
    type: "flight-order";
    flightOffers: FlightOffersSearchResponse['data'];
    travelers: Array<{
      id: string;
      dateOfBirth: string;         // YYYY-MM-DD
      name: {
        firstName: string;
        lastName: string;
      };
      gender: "MALE" | "FEMALE";
      contact: {
        emailAddress: string;
        phones: Array<{
          deviceType: "MOBILE" | "LANDLINE";
          countryCallingCode: string;
          number: string;
        }>;
      };
      documents?: Array<{
        documentType: "PASSPORT" | "VISA";
        birthPlace: string;
        issuanceLocation: string;
        issuanceDate: string;      // YYYY-MM-DD
        number: string;
        expiryDate: string;        // YYYY-MM-DD
        issuanceCountry: string;   // ISO 3166-1 alpha-2
        validityCountry: string;   // ISO 3166-1 alpha-2
        nationality: string;       // ISO 3166-1 alpha-2
        holder: boolean;
      }>;
    }>;
    remarks?: {
      general: Array<{
        subType: "GENERAL_MISCELLANEOUS";
        text: string;
      }>;
    };
    ticketingAgreement?: {
      option: "DELAY_TO_CANCEL" | "GUARANTEE";
      delay?: string;              // ISO 8601 duration
    };
    contacts?: Array<{
      addresseeName: {
        firstName: string;
        lastName: string;
      };
      address: {
        lines: string[];
        postalCode: string;
        countryCode: string;       // ISO 3166-1 alpha-2
        cityName: string;
      };
      purpose: "STANDARD" | "INVOICE";
      phones: Array<{
        deviceType: "MOBILE" | "LANDLINE";
        countryCallingCode: string;
        number: string;
      }>;
      companyName?: string;
      emailAddress?: string;
    }>;
  };
};

export type FlightOrderResponse = {
  data: {
    type: string;                  // "flight-order"
    id: string;                    // Unique identifier of the order
    queuingOfficeId: string;
    associatedRecords: Array<{
      reference: string;
      creationDate: string;        // YYYY-MM-DD
      originSystemCode: string;
      flightOfferId: string;
    }>;
    travelers: Array<{
      id: string;
      dateOfBirth: string;         // YYYY-MM-DD
      gender: "MALE" | "FEMALE";
      name: {
        firstName: string;
        lastName: string;
      };
      contact?: {
        emailAddress?: string;
        phones?: Array<{
          deviceType: "MOBILE" | "LANDLINE";
          countryCallingCode: string;
          number: string;
        }>;
      };
      documents?: Array<{
        documentType: "PASSPORT" | "VISA";
        birthPlace: string;
        issuanceLocation: string;
        issuanceDate: string;      // YYYY-MM-DD
        number: string;
        expiryDate: string;        // YYYY-MM-DD
        issuanceCountry: string;   // ISO 3166-1 alpha-2
        validityCountry: string;   // ISO 3166-1 alpha-2
        nationality: string;       // ISO 3166-1 alpha-2
        holder: boolean;
      }>;
    }>;
    flightOffers: Array<{
      type: string;
      id: string;
      source: string;
      nonHomogeneous: boolean;
      lastTicketingDate: string;   // YYYY-MM-DD
      itineraries: Array<{
        segments: Array<{
          departure: {
            iataCode: string;
            terminal?: string;
            at: string;            // YYYY-MM-DDTHH:mm:ss
          };
          arrival: {
            iataCode: string;
            terminal?: string;
            at: string;            // YYYY-MM-DDTHH:mm:ss
          };
          carrierCode: string;
          number: string;
          aircraft: {
            code: string;
          };
          operating: {
            carrierCode: string;
          };
          id: string;
          numberOfStops: number;
          co2Emissions: Array<{
            weight: number;
            weightUnit: string;
            cabin: string;
          }>;
        }>;
      }>;
      price: {
        currency: string;
        total: string;
        base: string;
        fees: Array<{
          amount: string;
          type: string;
        }>;
        grandTotal: string;
        billingCurrency: string;
      };
      pricingOptions: {
        fareType: string[];
        includedCheckedBagsOnly: boolean;
      };
      validatingAirlineCodes: string[];
      travelerPricings: Array<{
        travelerId: string;
        fareOption: string;
        travelerType: string;
        price: {
          currency: string;
          total: string;
          base: string;
          taxes: Array<{
            amount: string;
            code: string;
          }>;
        };
        fareDetailsBySegment: Array<{
          segmentId: string;
          cabin: string;
          fareBasis: string;
          class: string;
          includedCheckedBags: {
            quantity: number;
          };
        }>;
      }>;
    }>;
    contacts?: Array<{
      addresseeName: {
        firstName: string;
        lastName: string;
      };
      address: {
        lines: string[];
        postalCode: string;
        countryCode: string;
        cityName: string;
      };
      purpose: string;
      phones: Array<{
        deviceType: "MOBILE" | "LANDLINE";
        countryCallingCode: string;
        number: string;
      }>;
      companyName?: string;
      emailAddress?: string;
    }>;
    ticketingAgreement?: {
      option: "DELAY_TO_CANCEL" | "GUARANTEE";
      delay?: string;
    };
  };
  dictionaries?: {
    locations: Record<string, {
      cityCode: string;
      countryCode: string;
    }>;
    aircraft: Record<string, string>;
    currencies: Record<string, string>;
    carriers: Record<string, string>;
  };
};

export type GetFlightOrderRequest = {
  orderId: string;
};

export type DeleteFlightOrderRequest = {
  orderId: string;
};

// The response type is the same as FlightOrderResponse from create order
export type GetFlightOrderResponse = FlightOrderResponse;

export type DeleteFlightOrderResponse = {
  data: {
    id: string;
    type: string;           // "flight-order"
    deletedDate: string;    // ISO 8601 datetime
    deletedBy: string;
  };
};

export type GetSeatMapRequest = {
  // Can use either flight offer or flight order
  data: {
    type: "seatmap-query";
    flightOrderId?: string;
    flightOffers?: FlightOffersSearchResponse['data'];
  };
};

export type SeatMapResponse = {
  data: Array<{
    type: string;                // "seatmap"
    id: string;
    departure: {
      iataCode: string;
      terminal?: string;
      at: string;               // ISO 8601 datetime
    };
    arrival: {
      iataCode: string;
      terminal?: string;
      at: string;               // ISO 8601 datetime
    };
    carrierCode: string;
    number: string;
    operating: {
      carrierCode: string;
      number?: string;
    };
    aircraft: {
      code: string;
      modelName?: string;
    };
    class: {
      code: string;
    };
    decks: Array<{
      deckType: string;         // MAIN or UPPER
      deckConfiguration: {
        width: number;
        length: number;
        startSeatRow: number;
        endSeatRow: number;
        startWingsRow: number;
        endWingsRow: number;
        startExitRow: number[];
        endExitRow: number[];
      };
      facilities: Array<{
        code: string;           // LA (lavatory), G (galley), CL (closet), ST (stairs), E (exit)
        column: string;
        row: string;
        position: "FRONT" | "MIDDLE" | "BACK";
        coordinates: {
          x: number;
          y: number;
        };
      }>;
      seats: Array<{
        cabin: string;
        number: string;
        characteristicsCodes: string[];  // CH (chargeable), E (exit), etc.
        travelerPricing?: Array<{
          travelerId: string;
          seatAvailabilityStatus: "AVAILABLE" | "BLOCKED" | "NOT_AVAILABLE";
          price: {
            currency: string;
            total: string;
            base: string;
            taxes: Array<{
              amount: string;
              code: string;
            }>;
          };
        }>;
        coordinates: {
          x: number;
          y: number;
        };
      }>;
    }>;
    availableSeatsCounters?: Array<{
      travelerId: string;
      value: number;
    }>;
  }>;
  dictionaries?: {
    locations: Record<string, {
      cityCode: string;
      countryCode: string;
    }>;
    facilities: Record<string, string>;
    seatCharacteristics: Record<string, string>;
  };
};

export type GetAirlineRequest = {
  airlineCodes: string;      // Comma-separated IATA airline codes (e.g., "BA,LH")
};

export type AirlineResponse = {
  data: Array<{
    type: string;            // "airline"
    id: string;             // Airline IATA code
    href: string;           // Link to more information
    name: string;           // Full name of the airline
    communityRatings?: {    // Optional ratings info
      averageRating: number;
      numberOfRatings: number;
      numberOfReviews: number;
    };
    logo?: {               // Optional logo info
      imageId: string;
      small: string;       // URL to small logo
      medium: string;      // URL to medium logo
      large: string;       // URL to large logo;
    };
    icaoCode: string;      // ICAO code of the airline
    businessName?: string; // Optional business name if different from name
  }>;
  meta: {
    count: number;         // Number of airlines returned
    links: {
      self: string;        // Link to current request
    };
  };
};

export type LocationSearchRequest = {
  keyword: string;                // City/Airport name or code to search for
  subType?: Array<
    | "AIRPORT"
    | "CITY"
    | "DISTRICT"
    | "COUNTRY"
  >;
  countryCode?: string;          // ISO 3166-1 alpha-2 code (e.g., "US")
  view?: "LIGHT" | "FULL";       // Level of details in response
  page?: {
    limit?: number;              // Max number of results (default: 10)
    offset?: number;             // Starting point in pagination
  };
};

export type LocationResponse = {
  meta: {
    count: number;               // Total number of results
    links: {
      self: string;             // Current page link
      next?: string;            // Next page link
      previous?: string;        // Previous page link
      first?: string;           // First page link
      last?: string;           // Last page link
    };
  };
  data: Array<{
    type: string;               // "location"
    subType: "AIRPORT" | "CITY" | "DISTRICT" | "COUNTRY";
    name: string;               // Location name
    detailedName: string;       // Detailed location name
    id: string;                 // Location ID
    self: {
      href: string;             // Link to location details
      methods: string[];        // Available HTTP methods
    };
    timeZoneOffset: string;     // "+HH:MM" or "-HH:MM"
    iataCode: string;           // Location IATA code
    geoCode: {
      latitude: number;
      longitude: number;
    };
    address: {
      cityName: string;
      cityCode: string;
      countryName: string;
      countryCode: string;      // ISO 3166-1 alpha-2
      regionCode: string;       // ISO 3166-2
      stateCode?: string;       // For US/CA/AU addresses
    };
    analytics?: {
      travelers: {
        score: number;          // Popularity score
      };
    };
    relevance: number;          // Search relevance score
    category?: string;          // Only in FULL view
    title?: string;             // Only in FULL view
    tags?: string[];            // Only in FULL view
  }>;
};
