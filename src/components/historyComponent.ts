import { AppManager } from "../appManager";
import { Component } from "../lib/component";
import createButton from "../utils/button";
import templateHTML from "../componentsTemplates/historyComponent.html?raw";
import type { ClientInformations, FlightInformation, FlightInformationRaw } from "../data/Types";
import { standing } from "../data/data";

export class HistoryComponent extends Component {
  flightInformation: FlightInformation | undefined;
  clientInformation: ClientInformations | undefined;

  constructor() {
    super(templateHTML);

    const getClient  = (): ClientInformations[] => {
  const raw = localStorage.getItem("clients");
  return raw ? JSON.parse(raw) as ClientInformations[] : [];
};


const getFlights = () : FlightInformationRaw[] => {

  const raw = localStorage.getItem("flights");
  return raw ? JSON.parse(raw) as FlightInformationRaw[] : [];

};


const convertDate = (
  raw: FlightInformationRaw
): FlightInformation => ({
  ...raw,
  date: new Date(raw.date),
});



const clients : ClientInformations[]=  getClient() 

const flights : FlightInformation[] =   getFlights().map ( flightRaw =>   convertDate( flightRaw) )  


console.log ( "ICI")

console.log ( clients , flights )



    setTimeout(() => {
      this.flightInformation = AppManager.getInstance().flightInformation;
      this.clientInformation = AppManager.getInstance().clientInformations;

      const tic = document.getElementById("travel-info-container");

      if (this.flightInformation && this.clientInformation )
         {
        const spanArray: HTMLElement[] = [];

        const changeSpanFI = (spanID: keyof FlightInformation) => {
          const span: HTMLElement | null = document.getElementById(spanID);

          if (span && this.flightInformation) {
            span.innerText = this.flightInformation[spanID] + "";
            spanArray.push(span);
          }
        };
        const changeSpanCI = (spanID: keyof ClientInformations) => {
          const span: HTMLElement | null = document.getElementById(spanID);

          if (span && this.clientInformation) {
            span.innerText = this.clientInformation[spanID] + "";
            spanArray.push(span);
          }
        };

        changeSpanFI("originCity");
        changeSpanFI("destinationCity");
        changeSpanFI("price");
        changeSpanFI("standing");
        changeSpanFI("date");

        changeSpanCI("name");
        changeSpanCI("lastName");
        changeSpanCI("email");
        changeSpanCI("phoneNumber");

        if (this.flightInformation) {
          const standingPlace = standing.find(
            (std) => std.value == this.flightInformation?.standing
          );

          const perksUl = document.getElementById("perks");
          if (standingPlace && perksUl) {
            standingPlace.perks.forEach((perk) => {
              const li = document.createElement("li");
              li.textContent = perk;
              perksUl.appendChild(li);
              //todo
            });
          }
        }

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
