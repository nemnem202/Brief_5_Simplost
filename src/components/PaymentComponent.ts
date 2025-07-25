import { Component } from "../lib/component";
import type { ClientInformations, FlightInformation, PaymentInformations } from "../data/Types";
import { AppManager } from "../appManager";
import templateHTML from "../componentsTemplates/paymentComponent.html?raw";

export class PaymentComponent extends Component {
  private clientData: ClientInformations | undefined;
  private travelData: FlightInformation | undefined;
  private expiryValue: string;

  constructor() {
    super(templateHTML);
    this.expiryValue = "";
    setTimeout(() => this.init(), 0);
  }

  private init(){
    this.clientData = AppManager.getInstance().clientInformations;
    this.travelData = AppManager.getInstance().flightInformation;
    if(!this.travelData || !this.clientData){
      AppManager.getInstance().changePage("not-found");
    }
    this.fillTravelInfos();
    this.addListeners();
  }

  private fillTravelInfos(){
    if(this.content && this.clientData && this.travelData){
      const divClientInfos: HTMLElement | null = document.getElementById("clientInfos");
      if(divClientInfos){
        this.addTextToHTMLElement(divClientInfos,`${this.clientData.name} ${this.clientData.lastName}`);
        this.addTextToHTMLElement(divClientInfos,this.clientData.email);
        this.addTextToHTMLElement(divClientInfos,this.clientData.phoneNumber);
      }

      const divTravelInfos: HTMLElement | null = document.getElementById("travelInfos");
      if(divTravelInfos){
        this.addTextToHTMLElement(divTravelInfos,`Location: ${this.travelData.originCity} - ${this.travelData.destinationCity}`);
        this.addTextToHTMLElement(divTravelInfos,`Date: ${this.travelData.date.toDateString()}`);
        this.addTextToHTMLElement(divTravelInfos,`Class: ${this.travelData.standing} class`);
      }

      const divPrice: HTMLElement | null = document.getElementById("price");
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

  private addListeners(){
    const backToFormBtn: HTMLElement | null = document.getElementById("returnToForm");
    if(backToFormBtn){
      backToFormBtn.addEventListener("click", this.back);
    }

    const cardName: HTMLElement | null = document.getElementById("cardName");
    if(cardName){
      cardName.addEventListener("blur", this.inputedNameChecker);
    }

    const cardNumber: HTMLElement | null = document.getElementById("cardNumber");
    if(cardNumber){
      cardNumber.addEventListener("blur", this.inputedNumberChecker);
      cardNumber.addEventListener("input", this.cardNumberInput);
    }

    const cardCVV: HTMLElement | null = document.getElementById("cardCvv");
    if(cardCVV){
      cardCVV.addEventListener("blur", this.inputedCVVChecker);
      cardCVV.addEventListener("input", this.cardCVVInput);
    }

    const cardExpiry: HTMLElement | null = document.getElementById("cardExpiry");
    if(cardExpiry){
      cardExpiry.addEventListener("blur", this.inputedExpiryChecker);
      cardExpiry.addEventListener("input", this.cardExpiryInput);
    }

    const form: HTMLElement | null = document.getElementById("paymentForm");
    if(form){
      form.addEventListener("submit", (event) => this.pay(event));
    }
  }

  private back(){
    AppManager.getInstance().changePage("form");
  }

  private inputedNumberChecker = (event: FocusEvent) =>{
    if(event.target instanceof HTMLInputElement){
      this.numberChecker(event.target.value);
    }
  }

  private numberChecker(num: string): boolean{
    const numberRegex: RegExp = /^[0-9]{12,19}$/;
    const errorPar: HTMLElement | null = document.getElementById("cardNumberError");
    if(errorPar){
      num = num.replaceAll("-", "");
      num = num.replaceAll(" ", "");
      if(!numberRegex.test(num) || !this.checkLuhnAlgorithm(num)){
        errorPar.innerText = "The card number is invalid" ;
        return false;
      }
      else{
        errorPar.innerText = "";
        return true;
      }
    }
    return false;
  }

  private checkLuhnAlgorithm(numberToCheck: string): boolean{
    let sum: number = 0
    let digit: number = 0
    let isEven: boolean = false;

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

  private inputedNameChecker = (event: FocusEvent) => {
    if(event.target instanceof HTMLInputElement){
      this.nameChecker(event.target.value);
    }
  }

  private nameChecker(name: string): boolean{
    // The regex accept all letters, all accentuated letters, spaces, hyphens and apostrophes
    const nameRegex: RegExp = /^[a-zà-öø-ÿñ'\- ]{1,}( [a-zà-öø-ÿñ'\- ]{1,})+$/;

    const errorPar: HTMLElement | null = document.getElementById("cardNameError");
    if(errorPar){
      if(!nameRegex.test(name.toLowerCase())){
        errorPar.innerText = "The name is invalid." ;
        return false;
      }
      else{
        errorPar.innerText = "";
        return true;
      }
    }
    return false;
  }

  private inputedCVVChecker = (event: FocusEvent) => {
    if(event.target instanceof HTMLInputElement){
      this.cvvChecker(event.target.value)
    }
  }

  private cvvChecker(cvv: string): boolean{
    const cvvRegex: RegExp = /^[0-9]{3,4}$/;
    const errorPar: HTMLElement | null = document.getElementById("cardCvvError");
    if(errorPar){
      if(!cvvRegex.test(cvv)){
        errorPar.innerText = "The CVV is invalid";
        return false;
      }
      else{
        errorPar.innerText = "";
        return true;
      }
    }
    return false;
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

  private inputedExpiryChecker = (event: FocusEvent) => {
    if(event.target instanceof HTMLInputElement){
      this.expiryChecker(event.target.value);
    }
  }

  private expiryChecker(expiry: string): boolean{
    const curDate: Date = new Date();
    const curMonth: number = curDate.getMonth();
    const curYear: number = curDate.getFullYear();

    const errorPar = document.getElementById("cardExpiryError");
    if(errorPar){
      const cardMonth: number = parseInt(expiry.slice(0,2));
      let year: string = expiry.slice(3);
      if(year.length === 2){
        year = "20" + year;
      }

      const cardYear: number = parseInt(year);
      if(year.length != 4 || cardMonth > 12 || cardMonth < 1){
        errorPar.innerText = "The date format is invalid" ;
        return false;
      }
      else if(cardYear < curYear || (cardYear === curYear && cardMonth-1 < curMonth)){
        errorPar.innerText = "The card is expired" ;
        return false;
      }
      else{
        errorPar.innerText = "";
        return true;
      }
    }
    return false;
  }

  private cardExpiryInput(event: Event){
    if(event.target instanceof HTMLInputElement){
      if(!this.expiryValue){
        this.expiryValue = "";
      }
      let currentValue: string = event.target.value;
      const lastCharNum: number = currentValue.length-1;
      const lastInput: string = currentValue.charAt(lastCharNum);

      if(!/[0-9/]/.test(lastInput)){
        currentValue = currentValue.slice(0, lastCharNum);
      }

      const isAdding = currentValue.length > this.expiryValue.length;

      if(currentValue.length === 2){
        if(isAdding){
          currentValue = currentValue + "/";
        }
        else{
          currentValue = currentValue.slice(0,lastCharNum)
        }
      }
      else if(currentValue.length === 8){
        currentValue = currentValue.slice(0,lastCharNum);
      }

      this.expiryValue = currentValue;
      event.target.value = currentValue;
    }
  }

  private isConsentChecked(): boolean{
    const consentCheckbox: HTMLElement | null = document.getElementById("consent");
    const errorPar: HTMLElement | null = document.getElementById("consentError");
    if(consentCheckbox instanceof HTMLInputElement && errorPar){
      if(consentCheckbox.checked){
        errorPar.innerText = "";
        return true;
      }
      else{
        errorPar.innerText = "You must agree to the terms and conditions" ;
        return false;
      }
    }
    return false;
  }

  private pay (event: SubmitEvent) {
    event.preventDefault();
    let isFormValid: boolean = true;

    if(event.target instanceof HTMLFormElement){
      const formData: FormData = new FormData(event.target)
      const paymentData = {
        cardNumber: formData.get("cardNumber"),
        cvv: formData.get("cardCvv"),
        dateOfExpiry: {
          year: formData.get("cardExpiry")?.slice(3),
          month: formData.get("cardExpiry")?.slice(0,2)
        },
        fullName: formData.get("cardName")
      };

      if(typeof paymentData.cardNumber === "string" && !this.numberChecker(paymentData.cardNumber)){
        isFormValid = false;
      }
      if(typeof paymentData.fullName === "string" && !this.nameChecker(paymentData.fullName)){
        isFormValid = false;
      }
      if(typeof paymentData.cvv === "string" && !this.cvvChecker(paymentData.cvv)){
        isFormValid = false;
      }
      if(typeof paymentData.dateOfExpiry.month === "string" && typeof paymentData.dateOfExpiry.year === "string" && !this.expiryChecker(paymentData.dateOfExpiry.month+"/"+paymentData.dateOfExpiry.year)){
        isFormValid = false;
      }
      if(!this.isConsentChecked()){
        isFormValid = false;
      }

      if(isFormValid){
        this.fillLocalStorage();

        if(paymentData.cardNumber && paymentData.cvv && paymentData.fullName && paymentData.dateOfExpiry.month && paymentData.dateOfExpiry.year){
          const payment: PaymentInformations = {
            cardNumber: paymentData.cardNumber.toString(),
            cvv: paymentData.cvv.toString(),
            dateOfExpiry: {
              year: paymentData.dateOfExpiry.year.toString(),
              month: paymentData.dateOfExpiry.month.toString()
            },
            fullName: paymentData.fullName.toString()
          }
          AppManager.getInstance().paymentInformations = payment;
        }

        AppManager.getInstance().changePage("history");
      }
    }
  }

  private fillLocalStorage(){
    const flightData: string | null = localStorage.getItem("flights");
    let flights: FlightInformation[] = [];
    if (flightData) {
      flights = JSON.parse(flightData) as FlightInformation[];
    }
    if(this.travelData){
      flights.push(this.travelData);
    }
    localStorage.setItem("flights", JSON.stringify(flights));

    const clientData: string | null = localStorage.getItem("clients");
    let clients: ClientInformations[] = [];
    if (clientData) {
      clients = JSON.parse(clientData) as ClientInformations[];
    }
    if(this.clientData){
      clients.push(this.clientData);
    }
    localStorage.setItem("clients", JSON.stringify(clients));
  }
}
