import { FormComponent } from "./components/formComponent";
import type { ClientInformations, FlightInformation, PaymentInformations } from "./data/Types";
import type { Component } from "./lib/component";

export class AppManager {
  private static _instance: AppManager;

  public clientInformations: ClientInformations | undefined;
  public paymentInformations: PaymentInformations | undefined;
  public flightInformation: FlightInformation | undefined;

  private currentPage: Component;

  private constructor() {
    this.currentPage = new FormComponent();
    this.displayPage();
  }

  public static getInstance(): AppManager {
    if (!this._instance) {
      this._instance = new AppManager();
    }
    return this._instance;
  }

  public changePage(component: Component) {
    this.currentPage = component;
    this.displayPage();
  }

  private displayPage() {
    if (this.currentPage.content) {
      document.body.innerHTML = "";
      document.body.appendChild(this.currentPage.content);
    } else {
      console.log(
        "Erreur du chargement de la page, contenu supposé etre chargé:",
        this.currentPage.content
      );
    }
  }
}
