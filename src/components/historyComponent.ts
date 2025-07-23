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

    setTimeout(
      () => {
        const date = new Date();
        date.setMonth(8);
        date.setDate(12);

        AppManager.getInstance().flightInformation = {
          originCity: "paris",
          destinationCity: "lisbon",
          price: 33,
          standing: "economy",
          date: date,
        };

        
      },

      0
    );

    setTimeout(() => {
      this.flightInformation = AppManager.getInstance().flightInformation;
      this.clientInformation = AppManager.getInstance().clientInformations;

      const tic = document.getElementById("travel-info-container");

      if (this.flightInformation) { // && this.clientInformation

        const spanArray : HTMLElement[]= []
    
        const changeSpan = (spanID: keyof FlightInformation) => 
        {
          const span: HTMLElement | null =document.getElementById(spanID)

          if (span && this.flightInformation)
          {
            span.innerText = this.flightInformation[spanID]+''
            spanArray.push(span)
          }
        }

        changeSpan("originCity")
        changeSpan("destinationCity")
        changeSpan("price")
        changeSpan("standing")
        changeSpan("date")

        //todo  addclass service included
      } else {
        if (tic) {
          tic.innerHTML = "";
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
