import { AppManager } from "../appManager";
import { Component } from "../lib/component";
import createButton from "../utils/button";

export class FormComponent extends Component {
  constructor() {
    super();
    console.log("form init");
    this.content = document.createElement("div");
    this.content.innerText = "Form component";
    this.content.appendChild(
      createButton("nextPage", "boutonCoucou", () =>
        AppManager.getInstance().changePage(new FormComponent())
      )
    );
  }
}
