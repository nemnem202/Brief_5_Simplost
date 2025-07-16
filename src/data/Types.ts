export type Destinations = { label: string; value: string; distanceFromParis: number }[];

export type Standing = { label: string; value: string; pricePerKm: number; perks: string[] }[];

export type ClientInformations = {
  name: string;
  lastName: string;
  email: string;
  phoneNumber: string;
};

export type PaymentInformations = {
  cardNumber: string;
  cvv: string;
  dateOfExpiry: { year: string; month: string };
  fullName: string;
};

export type FlightInformation = {
  date: Date;
  price: number;
  standing: Standing;
  originCity: string;
  destinationCity: string;
};
