import type { StandingValue } from "../data/Types";
import { standing } from "../data/data";

export abstract class TravelClass {
  abstract value: StandingValue;
  abstract label: string;
  abstract pricePerKm: number;

  getPrice(distance: number): number {
    return this.pricePerKm * distance;
  }

  static createInstance(value: StandingValue): TravelClass {
    switch (value) {
      case "economy":
        return new EconomyClass();
      case "buisness":
        return new BusinessClass();
      case "first":
        return new FirstClass();
      default:
        throw new Error("Unknown travel class");
    }
  }
}

export class EconomyClass extends TravelClass {
  value = "economy" as StandingValue;
  label = "Économie";
  pricePerKm = standing.find(deepPockets => deepPockets.value === "economy")!.pricePerKm;
}

export class BusinessClass extends TravelClass {
  value = "buisness" as StandingValue;
  label = "Affaires";
  pricePerKm = standing.find(deepPockets => deepPockets.value === "buisness")!.pricePerKm;
}

export class FirstClass extends TravelClass {
  value = "first" as StandingValue;
  label = "Première classe";
  pricePerKm = standing.find(deepPockets => deepPockets.value === "first")!.pricePerKm;
}
