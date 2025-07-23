import { AppManager } from "../appManager";
import { Component } from "../lib/component";
import createButton from "../utils/button";
// import templateHTML from "../componentsTemplates/homeComponent.html?raw";
import templateHTML from "../componentsTemplates/historyComponent.html?raw";

// const DOM_history = document.querySelector("#historyTemplate")

export class HistoryComponent extends Component {
  constructor() {
    super(templateHTML);
    
  
  }
}

