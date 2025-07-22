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
    setTimeout(() => this.addInputListeners(), 0);
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

  private addInputListeners(){
    const cardName = document.getElementById("cardName");
    if(cardName){
      cardName.addEventListener("blur", this.cardNameChecker);
    }

    const cardNumber = document.getElementById("cardNumber");
    if(cardNumber){
      cardNumber.addEventListener("blur", this.cardNumberChecker);
      cardNumber.addEventListener("input", this.cardNumberInput);
    }

    const cardCVV = document.getElementById("cardCvv");
    if(cardCVV){
      cardCVV.addEventListener("blur", this.cardCVVChecker);
      cardCVV.addEventListener("input", this.cardCVVInput);
    }

    const cardExpiry = document.getElementById("cardExpiry");
    if(cardExpiry){
      cardExpiry.addEventListener("blur", this.cardExpiryChecker);
      cardExpiry.addEventListener("input", this.cardExpiryInput);
    }
  }

  private cardNumberChecker = (event: FocusEvent) =>{
    const numberRegex: RegExp = /^[0-9]{12,19}$/;
    const errorPar = document.getElementById("cardNumberError");
    if(event.target instanceof HTMLInputElement && errorPar){
      let number = event.target.value;
      number = number.replaceAll("-", "");
      number = number.replaceAll(" ", "");
      if(!numberRegex.test(number) || !this.checkLuhnAlgorithm(number)){
        errorPar.innerText = "The card number is invalid" ;
      }
      else{
        errorPar.innerText = "";
      }
    }
  }

  private checkLuhnAlgorithm(numberToCheck: string): boolean{
    let sum = 0, digit = 0, isEven = false;

    for (let i = numberToCheck.length - 1; i >= 0; i--) {
      digit = parseInt(numberToCheck.charAt(i), 10);
      if (isEven) {
        digit *= 2;
        if (digit > 9){
          digit = (digit%10) + Math.floor(digit/10);
        }
      }

      sum += digit;
      isEven = !isEven;
    }

    return (sum % 10) == 0;
  }

  private cardNumberInput(event: Event){
    if(event.target instanceof HTMLInputElement){
      const lastCharNum: number = event.target.value.length-1;
      const lastInput: string = event.target.value.charAt(lastCharNum);

      if(!/[0-9\- ]/.test(lastInput)){
        event.target.value = event.target.value.slice(0,lastCharNum);
      }
    }
  }

  private cardNameChecker(event: FocusEvent){
    // The regex accept all letters, all accentuated letters, spaces, hyphens and apostrophes
    const nameRegex: RegExp = /^[a-zà-öø-ÿñ'\- ]{1,}( [a-zà-öø-ÿñ'\- ]{1,})+$/;
    const errorPar = document.getElementById("cardNameError");
    if(event.target instanceof HTMLInputElement && errorPar){
      const name = event.target.value;
      if(!nameRegex.test(name.toLowerCase())){
        errorPar.innerText = "The name is invalid." ;
      }
      else{
        errorPar.innerText = "";
      }
    }
  }

  private cardCVVChecker(event: FocusEvent){
    const cvvRegex: RegExp = /^[0-9]{3,4}$/;
    const errorPar = document.getElementById("cardCvvError");
    if(event.target instanceof HTMLInputElement && errorPar){
      if(!cvvRegex.test(event.target.value)){
        errorPar.innerText = "The CVV is invalid" ;
      }
      else{
        errorPar.innerText = "";
      }
    }
  }

  private cardCVVInput(event: Event){
    if(event.target instanceof HTMLInputElement){
      const lastCharNum: number = event.target.value.length-1;
      const lastInput: string = event.target.value.charAt(lastCharNum);

      if(!/[0-9]/.test(lastInput) || event.target.value.length === 5){
        event.target.value = event.target.value.slice(0,lastCharNum);
      }
    }
  }

  private cardExpiryChecker(event: FocusEvent){
    const curDate: Date = new Date();
    const curMonth: number = curDate.getMonth();
    const curYear: number = curDate.getFullYear();

    const errorPar = document.getElementById("cardExpiryError");
    if(event.target instanceof HTMLInputElement && errorPar){
      const cardMonth: number = parseInt(event.target.value.slice(0,2));
      let year: string = event.target.value.slice(3);
      if(year.length === 2){
        year = "20" + year;
      }

      const cardYear: number = parseInt(year);
      if(year.length != 4 || cardMonth > 12 || cardMonth < 1){
        errorPar.innerText = "The date format is invalid" ;
        return;
      }
      else if(cardYear < curYear|| (cardYear === curYear && cardMonth+1 < curMonth)){
        errorPar.innerText = "The card is expired" ;
      }
      else{
        errorPar.innerText = "";
      }
    }
  }

  private cardExpiryInput(event: Event){
    if(event.target instanceof HTMLInputElement){
      const lastCharNum: number = event.target.value.length-1;
      const lastInput: string = event.target.value.charAt(lastCharNum);

      if(!/[0-9]/.test(lastInput)){
        event.target.value = event.target.value.slice(0,lastCharNum);
      }
      if(event.target.value.length === 2){
        event.target.value = event.target.value + "/";
      }
      else if(event.target.value.length === 8){
        event.target.value = event.target.value.slice(0,lastCharNum);
      }
    }
  }
}