import { AppManager } from "../appManager";
import { Component } from "../lib/component";
import createButton from "../utils/button";
import templateHTML from "../componentsTemplates/historyComponent.html?raw";
import type {
  ClientInformations,
  FlightInformation,
  FlightInformationRaw,
} from "../data/Types";
import { travelCardComponent } from "./travelCardComponent";

export class HistoryComponent extends Component {
  flightInformation: FlightInformation | undefined;
  clientInformation: ClientInformations | undefined;

  constructor() {
    super(templateHTML);

    const getClient = (): ClientInformations[] => {
      const raw = localStorage.getItem("clients");
      return raw ? (JSON.parse(raw) as ClientInformations[]) : [];
    };

    const getFlights = (): FlightInformationRaw[] => {
      const raw = localStorage.getItem("flights");
      return raw ? (JSON.parse(raw) as FlightInformationRaw[]) : [];
    };

    const convertDate = (raw: FlightInformationRaw): FlightInformation => ({
      ...raw,
      date: new Date(raw.date),
    });

    const pastClients: ClientInformations[] = getClient();

    const pastFlights: FlightInformation[] = getFlights().map((flightRaw) =>
      convertDate(flightRaw)
    );

    console.log("ICI");

    console.log(pastClients, pastFlights);

    setTimeout(() => {
      this.flightInformation = AppManager.getInstance().flightInformation;
      this.clientInformation = AppManager.getInstance().clientInformations;

      const tic = document.getElementById("travel-info-container");

      if (this.flightInformation && this.clientInformation) {
        new travelCardComponent(
          "upcoming-travel",
          this.flightInformation,
          this.clientInformation
        );
      } else {
        if (tic) {
          tic.innerHTML = "";
        }
      }

      for (let i = 0; i < pastClients.length; i++) {
        if (pastFlights[i]) {

          new travelCardComponent(
            "past-travels",
            pastFlights[i],
            pastClients[i]
          );
        }
      }

      const homeButton = document.getElementById("home-button-container");
      homeButton?.appendChild(
        createButton("Go Back to Home Page", "home-button", () =>
          AppManager.getInstance().changePage("home")
        )
      );
    }, 0);
  }
}
