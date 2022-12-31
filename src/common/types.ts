// eslint-disable-next-line @typescript-eslint/no-explicit-any
export type KeyValueMap = Record<string, any>;

export type Destination = {
  url: string;
  method: "get" | "post" | "put" | "delete";
};

export type FuelPriceMessage = {
  destination: Destination;
  data: {
    fuelType: string;
    publicMessage: boolean;
  };
};
