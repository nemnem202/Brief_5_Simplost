import { Component } from "../lib/component";
import templateHTML from "../componentsTemplates/paymentComponent.html?raw";

export class PaymentComponent extends Component {
  constructor() {
    super();
    this.addTemplate();
  }

  private addTemplate(){
    const wrapper = document.createElement("template");
    wrapper.innerHTML = templateHTML;
    const realTemplate = wrapper.content.querySelector("template");
    if (realTemplate){
      this.content = realTemplate.content.cloneNode(true) as HTMLElement;
    }
  }
}
