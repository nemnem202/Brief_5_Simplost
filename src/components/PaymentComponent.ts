import { Component } from "../lib/component";
import type { ClientInformations, FlightInformation } from "../data/Types";
import { AppManager } from "../appManager";
import templateHTML from "../componentsTemplates/paymentComponent.html?raw";

export class PaymentComponent extends Component {
  private clientData: ClientInformations | undefined;
  private travelData: FlightInformation | undefined;

  constructor() {
    super(templateHTML);
    this.clientData = AppManager.getInstance().clientInformations;
    this.travelData = AppManager.getInstance().flightInformation;
    this.fillTravelInfos();
  }

  private fillTravelInfos(){
    if(this.content && this.clientData && this.travelData){
      const divClientInfos: HTMLElement | null = this.content.querySelector("div#clientInfos");
      if(divClientInfos){
        this.addTextToHTMLElement(divClientInfos,`${this.clientData.name} ${this.clientData.lastName}`);
        this.addTextToHTMLElement(divClientInfos,this.clientData.email);
        this.addTextToHTMLElement(divClientInfos,this.clientData.phoneNumber);
      }

      const divTravelInfos: HTMLElement | null = this.content.querySelector("div#travelInfos");
      if(divTravelInfos){
        this.addTextToHTMLElement(divTravelInfos,`Location: ${this.travelData.originCity} - ${this.travelData.destinationCity}`);
        this.addTextToHTMLElement(divTravelInfos,`Date: ${this.travelData.date.toDateString()}`);
        this.addTextToHTMLElement(divTravelInfos,`Class: ${this.travelData.standing} class`);
      }

      const divPrice: HTMLElement | null = this.content.querySelector("div#price");
      if(divPrice){
        this.addTextToHTMLElement(divPrice,`Price: ${this.travelData.price.toString()} €`);
      }
    }
  }

  private addTextToHTMLElement(htmlElement: HTMLElement, text: string){
    const p: HTMLParagraphElement = document.createElement("p");
    p.innerText = text;
    htmlElement.appendChild(p);
  }