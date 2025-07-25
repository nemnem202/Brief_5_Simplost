import type { Component } from "../lib/component";

export type CityLabel =
  | "Paris"
  | "Londres"
  | "Berlin"
  | "Madrid"
  | "Rome"
  | "Lisbonne"
  | "Vienne"
  | "Amsterdam"
  | "Bruxelles"
  | "Copenhague";

export type CityValue =
  | "paris"
  | "london"
  | "berlin"
  | "madrid"
  | "rome"
  | "lisbon"
  | "vienna"
  | "amsterdam"
  | "brussels"
  | "copenhagen";

export type StandingLabel = "Économie" | "Affaires" | "Première classe";

export type StandingValue = "economy" | "buisness" | "first";

export type Destination = { label: CityLabel; value: CityValue; distanceFromParis: number };

export type Perk =
  | "Siège standard"
  | "Siège large"
  | "Repas chaud"
  | "Accès salon"
  | "Chauffeur"
  | "Service à la place"
  | "Champagne"
  | "Siège premium";

export type Standing = {
  label: StandingLabel;
  value: StandingValue;
  pricePerKm: number;
  perks: Perk[];
};

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
  standing: StandingValue;
  originCity: CityValue;
  destinationCity: CityValue;
};

export type FlightInformationRaw = {
  date: string; //  string au lieu de Date
  price: number;
  standing: StandingValue;
  originCity: CityValue;
  destinationCity: CityValue;
};


export type PageLabel = "home" | "form" | "payment" | "history" | "not-found";

export type PageItem = {
  label: PageLabel;
  pageConstructor: () => Component;
};
