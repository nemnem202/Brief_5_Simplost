import { pagesItems } from "./data/data";
import type {
  ClientInformations,
  FlightInformation,
  PageItem,
  PageLabel,
  PaymentInformations,
} from "./data/Types";

export class AppManager {
  private static _instance: AppManager;

  public clientInformations: ClientInformations | undefined;
  public paymentInformations: PaymentInformations | undefined;
  public flightInformation: FlightInformation | undefined;

  private currentPage: PageItem | undefined;

  private constructor() {
    console.log("app init");

    this.openPageOnInit();

    window.addEventListener("popstate", () => {
      const path = window.location.pathname.replace("/", "") as PageLabel;
      AppManager.getInstance().navigate(path);
    });

    this.addHeaderListeners();
  }

  private addHeaderListeners() {
    document.getElementById("header-logo")?.addEventListener("click", () => {
      AppManager.getInstance().changePage("home");
    });

    document.getElementById("book-button-header")?.addEventListener("click", () => {
      AppManager.getInstance().changePage("form");
    });

    document.getElementById("history-button-header")?.addEventListener("click", () => {
      AppManager.getInstance().changePage("history");
    });
  }

  public static getInstance(): AppManager {
    if (!this._instance) {
      this._instance = new AppManager();
    }
    return this._instance;
  }

  openPageOnInit = () => {
    const currentPath = window.location.pathname.split("/")[1];
    const pageItem = pagesItems.find((e) => e.label === currentPath);
    if (pageItem) {
      this.changePage(currentPath as PageLabel);
    } else if (currentPath === "") {
      this.changePage("home");
    } else {
      this.changePage("not-found");
    }
  };

  public changePage(label: PageLabel) {
    let page = pagesItems.find((i) => i.label === label);
    if (!page) {
      page = pagesItems.find((i) => i.label === "not-found");
    }
    this.currentPage = page;

    history.pushState({}, "", `/${this.currentPage?.label}`);
    this.displayPage();
  }

  private navigate(label: PageLabel) {
    let page = pagesItems.find((i) => i.label === label);
    if (!page) {
      page = pagesItems.find((i) => i.label === "not-found");
    }
    this.currentPage = page;

    this.displayPage();
  }

  private displayPage() {
    if (this.currentPage) {
      const component = this.currentPage.pageConstructor();
      if (!component || !component.content) return;
      const app = document.getElementById("app");
      if (!app) return;
      app.innerHTML = "";
      app.appendChild(component.content);
    } else {
      console.log("Erreur du chargement de la page, contenu supposé etre chargé:");
    }
  }
}
