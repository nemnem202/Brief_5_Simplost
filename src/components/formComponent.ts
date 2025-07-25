import { Component } from "../lib/component";
import template from "../componentsTemplates/formComponent.html?raw";
import "../componentsStyleSheets/formComponent.css";
import { destinations } from "../data/data";
import { AppManager } from "../appManager";
import { Validator } from "../utils/validator";
import { TravelClass } from "../utils/travelClass";
import type { StandingValue, CityValue } from "../data/Types";

export class FormComponent extends Component {
  private selectedClass: StandingValue | null = null;
  private debounceTimers: Map<string, number> = new Map();
  private useState: boolean = false;
  private form: HTMLFormElement;
  private finalPriceElem: HTMLElement;
  private destinationSelect: HTMLSelectElement;
  private listeners: Array<() => void> = [];

  constructor() {
    super(template);
    if (!this.content) return;

    const today = new Date().toISOString().split("T")[0];
    (this.content!.querySelector("#start") as HTMLInputElement).min = today;

    this.form = this.content.querySelector("#reservation-form") as HTMLFormElement;
    this.finalPriceElem = this.content.querySelector("#finalPrice")!;
    this.destinationSelect = this.content.querySelector("#to") as HTMLSelectElement;

    this.populateDestinations();
    this.attachListeners();
  }

  private populateDestinations() {
    destinations.forEach(dest => {
      if (dest.value !== "paris") {
        const option = document.createElement("option");
        option.value = dest.value;
        option.textContent = dest.label;
        this.destinationSelect.appendChild(option);
      }
    });
  }

  private attachListeners() {
    const classButtons = this.content!.querySelectorAll(".class-btn");
    classButtons.forEach(btn => {
      const handler = () => {
        const className = btn.textContent?.trim().toLowerCase();
        const value = className === "economy" ? "economy"
                     : className === "business" ? "buisness"
                     : className === "first class" ? "first"
                     : null;
        if (value) {
          this.selectedClass = value;
          this.updatePrice();
        }
      };
      btn.addEventListener("click", handler);
      this.listeners.push(() => btn.removeEventListener("click", handler));
    });

    const inputs = this.content!.querySelectorAll("input, select");
    inputs.forEach(input => {
      const handler = () => this.debounced("input", () => this.updatePrice(), 300);
      input.addEventListener("input", handler);
      this.listeners.push(() => input.removeEventListener("input", handler));
    });

    const submitHandler = (e: Event) => {
      e.preventDefault();
      this.handleSubmit();
    };

    this.form.addEventListener("submit", submitHandler);
    this.listeners.push(() => this.form.removeEventListener("submit", submitHandler));
  }

  private updatePrice() {
    if (!this.selectedClass) return;

    const selectedCity = this.destinationSelect.value as CityValue;
    const destination = destinations.find(d => d.value === selectedCity);
    if (!destination) return;

    const travelClass = TravelClass.createInstance(this.selectedClass);
    const price = travelClass.getPrice(destination.distanceFromParis);
    this.finalPriceElem.textContent = `${price.toFixed(2)}€`;
  }

  private handleSubmit() {
    const errorsDiv = this.content?.querySelector("#errors");
    if (errorsDiv) errorsDiv.innerHTML = "";

    const formData = new FormData(this.form);
    const client = {
      name: formData.get("firstName")?.toString().trim() || "",
      lastName: formData.get("lastName")?.toString().trim() || "",
      email: formData.get("email")?.toString().trim() || "",
      phoneNumber: formData.get("contact")?.toString().trim() || "",
    };

    const from = "paris";
    // const to = formData.get("to")?.toString() as CityValue;
    const to = this.destinationSelect.value;
    const startDate = formData.get("startDate")?.toString() || "";
    // const endDate = formData.get("endDate")?.toString() || "";

    const fields: Array<[string, string, (val: string) => boolean]> = [
      ["firstName", client.name, Validator.isValidName],
      ["lastName", client.lastName, Validator.isValidName],
      ["email", client.email, Validator.isValidEmail],
      ["contact", client.phoneNumber, Validator.isValidPhone],
    ];

    let hasError = false;
    this.form.querySelectorAll("input").forEach(i => i.classList.remove("error"));

    for (const [id, value, validator] of fields) {
      const input = this.form.querySelector(`#${id}`) as HTMLInputElement;
      if (!validator(value)) {
        input.classList.add("error");
        hasError = true;
      }
    }

    // if (!Validator.isValidDateRange(startDate, endDate)) {
    //   errorsDiv.innerHTML += `<p>Start date must be today or later, and end date must be after start.</p>`;
    //   hasError = true;
    // }

    if (!this.selectedClass) {
      errorsDiv.innerHTML += `<p>Please select a travel class.</p>`;
      hasError = true;
    }

    if (!to) {
      errorsDiv.innerHTML += `<p>Please select a destination.</p>`;
      hasError = true;
    }

    if (hasError) return;

    const destination = destinations.find(d => d.value === to)!;
    const travelClass = TravelClass.createInstance(this.selectedClass!);

    const flightInformation = {
      originCity: from,
      destinationCity: to,
      date: new Date(startDate),
      standing: travelClass.value,
      price: travelClass.getPrice(destination.distanceFromParis),
    };

    if (this.useState) {
      const app = AppManager.getInstance();
      app.clientInformations = client;
      app.flightInformation = flightInformation;
    }

    setTimeout(() => {
      AppManager.getInstance().changePage("payment");
    }, 100);
  }

  private debounced(key: string, fn: () => void, delay: number) {
    if (this.debounceTimers.has(key)) {
      clearTimeout(this.debounceTimers.get(key));
    }
    const timer = window.setTimeout(fn, delay);
    this.debounceTimers.set(key, timer);
  }

  public destroy() {
    this.listeners.forEach(unlisten => unlisten());
    this.debounceTimers.forEach(timer => clearTimeout(timer));
  }
}

console.log("Submit handler triggered");


//const formulaire = document.getElementById(reservation-form) as HTMLFormElement;
// const form = document.getElementById('myForm') as HTMLFormElement;



// private setUpForm() {
// setTimeout( ()=>{
// const button = document.getElementById('btn')
// button?.addEventListener('click',()=>{
//   console.log('bouton clique')
// })
// const form = document
// },0 )

// AppManager.getInstance().flightInformation
// }

//AppManager.getInstance().changePage("form"); -- new method we're going with henceforth
// }