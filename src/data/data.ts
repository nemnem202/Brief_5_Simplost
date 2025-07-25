import { FormComponent } from "../components/formComponent";
import { HomeComponent } from "../components/homeComponent";
import { HistoryComponent } from "../components/historyComponent";
import { NotFoundComponent } from "../components/notFoundComponent";
import type { Destination, PageItem, Standing } from "./Types";
import { PaymentComponent } from "../components/PaymentComponent";

export const destinations: Destination[] = [
  { label: "Paris", value: "paris", distanceFromParis: 0 },
  { label: "Londres", value: "london", distanceFromParis: 340 },
  { label: "Berlin", value: "berlin", distanceFromParis: 1050 },
  { label: "Madrid", value: "madrid", distanceFromParis: 1250 },
  { label: "Rome", value: "rome", distanceFromParis: 1100 },
  { label: "Lisbonne", value: "lisbon", distanceFromParis: 1450 },
  { label: "Vienne", value: "vienna", distanceFromParis: 1230 },
  { label: "Amsterdam", value: "amsterdam", distanceFromParis: 510 },
  { label: "Bruxelles", value: "brussels", distanceFromParis: 300 },
  { label: "Copenhague", value: "copenhagen", distanceFromParis: 1380 },
];

export const standing: Standing[] = [
  {
    label: "Économie",
    value: "economy",
    pricePerKm: 0.1,
    perks: ["Siège standard"],
  },
  {
    label: "Affaires",
    value: "buisness",
    pricePerKm: 0.25,
    perks: ["Siège large", "Repas chaud", "Accès salon"],
  },
  {
    label: "Première classe",
    value: "first",
    pricePerKm: 0.5,
    perks: ["Chauffeur", "Service à la place", "Champagne", "Siège premium"],
  },
];

export const pagesItems: PageItem[] = [
  {
    label: "home",
    pageConstructor: () => new HomeComponent(),
  },
  {
    label: "form",
    pageConstructor: () => new FormComponent(),
  },
  {
    label: "payment",
    pageConstructor: () => new PaymentComponent(),
  },
  {
    label: "history",
    pageConstructor: () => new HistoryComponent(),
  },
  {
    label: "not-found",
    pageConstructor: () => new NotFoundComponent(),
  },
];
