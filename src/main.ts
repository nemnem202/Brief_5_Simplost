import { AppManager } from "./appManager";
import { historyComponent } from "./components/historyComponent";

import  historyHTML  from "./componentsTemplates/historyComponent.html?raw"


console.log (historyHTML)
// AppManager.getInstance()

console.log ("heu")

AppManager.getInstance().changePage(new historyComponent)
// new historyComponent ()



