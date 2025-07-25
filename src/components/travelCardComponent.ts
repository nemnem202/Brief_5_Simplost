import { Component } from "../lib/component";
import template from "../componentsTemplates/travelCardComponent.html?raw";
import "../componentsStyleSheets/formComponent.css";
import type { ClientInformations, FlightInformation } from "../data/Types";
import { standing } from "../data/data";

export class travelCardComponent extends Component {
  flightInformation;
  clientInformation;
  id;
  idTarget

  constructor(
    idTarget: string,
    pFlightInformation: FlightInformation,
    pClientInformation: ClientInformations
  ) {
    super(template);

    this.idTarget = idTarget
    this.flightInformation = pFlightInformation;
    this.clientInformation = pClientInformation;
    this.id = Math.floor(Math.random() * 1000000000);

    this.chargingData()


  }

  private chargingData () {

  setTimeout (()=>{


    console.log(" travel cardinit");
    console.log(this.id);

    // const spanArray: HTMLElement[] = [];

    const spanBookingNumber: HTMLElement | null =
      this.getAndChangeID("bookingNumber");

    // const spanBookingNumber: HTMLElement | null = document.getElementById("bookingNumber");

    if (spanBookingNumber) {
      spanBookingNumber.innerText = this.id + "";
      // spanArray.push(span);
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
        (std) => std.value == this.flightInformation?.standing
      );

      // const perksUl = document.getElementById("perks");
      const perksUl: HTMLElement | null = this.getAndChangeID("perks");

      if (standingPlace && perksUl) {
        perksUl.id = this.id + "perks";
        standingPlace.perks.forEach((perk) => {
          const li = document.createElement("li");
          li.textContent = perk;
          perksUl.appendChild(li);
        });
      }
    }

    this.displayComp(this.idTarget);



  }),0



  }

  private displayComp(idTarget: string) {
    const target = document.getElementById(idTarget);

    if (target && this.content) {
      target.appendChild(this.content);
    } else {
      console.log(target);
    }
  }

  private changeSpanFI(spanID: keyof FlightInformation) {
    // const span: HTMLElement | null = document.getElementById(spanID);
    const span: HTMLElement | null = this.getAndChangeID(spanID);

    if (span && this.flightInformation) {
      // span.id = this.id + spanID;
      span.innerText = this.flightInformation[spanID] + "";
      // spanArray.push(span);
    }
  }

  private changeSpanCI(spanID: keyof ClientInformations) {
    // const span: HTMLElement | null = document.getElementById(spanID);
    const span: HTMLElement | null = this.getAndChangeID(spanID);

    if (span && this.clientInformation) {
      // span.id = this.id + spanID;
      span.innerText = this.clientInformation[spanID] + "";
      // spanArray.push(span);
    }
  }

  private getAndChangeID(oldID: string) {
    const tempDOM = document.getElementById(oldID);
    const newID = oldID + "_" + this.id;
    if (tempDOM) {
      tempDOM.id = newID;
      // setTimeout(()=> {return document.getElementById(newID)},0

      // )

      return document.getElementById(newID);
    } else {
      return null;
    }
  }
}
