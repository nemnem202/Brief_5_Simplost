import { Component } from "../lib/component";

export class FormComponent extends Component {
  constructor() {
    super();
    this.content = document.createElement("div");
    this.content.innerText = "Form component";
  }
}
