export type TAddress = {
  _id: string;
  alias: string;
  details?: string;
  phone: string;
  city: string;
  postalCode?: string;
};

export type TAddressResponse = {
  status: string;
  message: string;
  data: TAddress[];
};
