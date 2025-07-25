import { Component } from "../lib/component";
import template from "../componentsTemplates/travelCardComponent.html?raw";
import "../componentsStyleSheets/formComponent.css";
import type { ClientInformations, FlightInformation } from "../data/Types";
import { standing } from "../data/data";

export class travelCardComponent extends Component {
  flightInformation;
  clientInformation;
  id;
  idTarget;

  constructor(
    idTarget: string,
    pFlightInformation: FlightInformation,
    pClientInformation: ClientInformations
  ) {
    super(template);

    this.idTarget = idTarget;
    this.flightInformation = pFlightInformation;
    this.clientInformation = pClientInformation;
    this.id = Math.floor(Math.random() * 1000000000);

    this.chargingData();
    this.displayComp(this.idTarget);
  }

  private chargingData() {
    const spanBookingNumber = this.getAndChangeID("bookingNumber");
    if (spanBookingNumber) {
      spanBookingNumber.innerText = this.id + "";
    }

    this.changeSpanFI("originCity");
    this.changeSpanFI("destinationCity");
    this.changeSpanFI("price");
    this.changeSpanFI("standing");
    this.changeSpanFI("date");

    this.changeSpanCI("name");
    this.changeSpanCI("lastName");
    this.changeSpanCI("email");
    this.changeSpanCI("phoneNumber");

    if (this.flightInformation) {
      const standingPlace = standing.find(
        (std) => std.value === this.flightInformation.standing
      );

      const perksUl = this.getAndChangeID("perks");
      if (standingPlace && perksUl) {
        perksUl.id = this.id + "perks";
        standingPlace.perks.forEach((perk) => {
          const li = document.createElement("li");
          li.textContent = perk;
          perksUl.appendChild(li);
        });
      }
    }
  }

  private displayComp(idTarget: string) {
    const target = document.getElementById(idTarget);
    if (target && this.content) {
      target.appendChild(this.content);
    } else {
      console.warn("Target not found for travel card:", idTarget);
    }
  }

  private changeSpanFI(spanID: keyof FlightInformation) {
    const span = this.getAndChangeID(spanID);
    if (span && this.flightInformation) {
      span.innerText = String(this.flightInformation[spanID]);
    }
  }

  private changeSpanCI(spanID: keyof ClientInformations) {
    const span = this.getAndChangeID(spanID);
    if (span && this.clientInformation) {
      span.innerText = String(this.clientInformation[spanID]);
    }
  }

  private getAndChangeID(oldID: string): HTMLElement | null {
    if (this.content) {
      const tempDOM = this.content.querySelector(
        `#${oldID}`
      ) as HTMLElement | null;
      const newID = `${oldID}_${this.id}`;
      if (tempDOM) {
        tempDOM.id = newID;
        return tempDOM;
      }
    }
    return null;
  }
}
