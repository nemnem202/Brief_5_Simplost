export abstract class Component {
  public content: HTMLElement | undefined;

  constructor(templateHTML: string){
    const wrapper = document.createElement("template");
    wrapper.innerHTML = templateHTML;
    const realTemplate = wrapper.content.querySelector("template");
    if (realTemplate){
      this.content = realTemplate.content.cloneNode(true) as HTMLElement;
    }
  }


}
