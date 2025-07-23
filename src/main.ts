import { AppManager } from "./appManager";

document.getElementById("home-button-header")?.addEventListener("click", () => {

        AppManager.getInstance().changePage("home");
    });

    document.getElementById("home-button-header")?.addEventListener("click", () => {
        AppManager.getInstance().changePage("home");
    });

    document.getElementById("history-button-header")?.addEventListener("click", () => {
        AppManager.getInstance().changePage("history");
    });

AppManager.getInstance().changePage("home")



