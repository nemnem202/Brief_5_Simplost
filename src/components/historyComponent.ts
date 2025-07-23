import { AppManager } from "../appManager";
import { Component } from "../lib/component";
import createButton from "../utils/button";
import templateHTML from "../componentsTemplates/historyComponent.html?raw";
import type { ClientInformations, FlightInformation } from "../data/Types";

export class HistoryComponent extends Component {
  flightInformation: FlightInformation | undefined;
  clientInformation: ClientInformations | undefined;

  constructor() {
    super(templateHTML);

    setTimeout(() => {
      this.flightInformation = AppManager.getInstance().flightInformation;
      this.clientInformation = AppManager.getInstance().clientInformations;

      const tic = document.getElementById("travel-info-container");

      if (this.clientInformation && this.clientInformation) {
        //création du truc
      } else {
        if (tic) {
          tic.innerHTML = "";
        }
      }
      const homeButton = document.getElementById("home-button-container");
      homeButton?.appendChild(createButton("Go Back to Home Page", "home-button", ()=>AppManager.getInstance().changePage("home")  ))

    }, 0);
  }
}
