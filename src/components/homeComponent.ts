import { Component } from "../lib/component";
import templateHTML from "../componentsTemplates/homeComponent.html?raw";
import "../componentsStyleSheets/homeComponent.css";
import { AppManager } from "../appManager";

export class HomeComponent extends Component {
  constructor() {
    super(templateHTML);

    this.loadEventsListeners();
  }

  loadEventsListeners() {
    setTimeout(() => {
      document.getElementById("emptyFormButton")?.addEventListener("click", () => {
        AppManager.getInstance().flightInformation = undefined;
        AppManager.getInstance().changePage("form");
      });

      document.getElementById("parisLisbon")?.addEventListener("click", () => {
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
        AppManager.getInstance().changePage("form");
      });

      document.getElementById("parisRome")?.addEventListener("click", () => {
        const date = new Date();
        date.setMonth(7);
        date.setDate(26);

        AppManager.getInstance().flightInformation = {
          originCity: "paris",
          destinationCity: "rome",
          price: 45,
          standing: "economy",
          date: date,
        };
        AppManager.getInstance().changePage("form");
      });

      document.getElementById("parisAmsterdam")?.addEventListener("click", () => {
        const date = new Date();
        date.setMonth(9);
        date.setDate(22);

        AppManager.getInstance().flightInformation = {
          originCity: "paris",
          destinationCity: "amsterdam",
          price: 28,
          standing: "economy",
          date: date,
        };
        AppManager.getInstance().changePage("form");
      });
    }, 0);
  }
}
