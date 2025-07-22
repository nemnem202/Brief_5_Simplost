import { Component } from "../lib/component";
import templateHTML from "../componentsTemplates/notFoundComponent.html?raw";

export class NotFoundComponent extends Component {
  constructor() {
    super(templateHTML);
  }
}
