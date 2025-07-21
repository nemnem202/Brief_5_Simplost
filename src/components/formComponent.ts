import { Component } from "../lib/component";
import template from "../componentsTemplates/formComponent.html?raw"
import "../componentsStyleSheets/formComponent.css"
import { destinations } from "../data/data";


export class FormComponent extends Component {
  constructor() {
    super(template);
    console.log("form init");
    this.content?.querySelector
}
}

const toSelect = document.getElementById("to") as HTMLSelectElement;
destinations.forEach(() => {
  const option = document.getElementById("option");
//todo
  // option.value = destination.value;
  // option.textContent = destination.label;
  // toSelect.appendChild(option);
// }
  
});