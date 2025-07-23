import { Component } from "../lib/component";
import template from "../componentsTemplates/formComponent.html?raw"
import "../componentsStyleSheets/formComponent.css"
import { destinations } from "../data/data";
import { AppManager } from "../appManager";


export class FormComponent extends Component {

  static message = 'hello'

  constructor() {
    super(template);
    console.log("form init");
    this.setUpForm()
}


// const form = document.getElementById('myForm') as HTMLFormElement;






private setUpForm() {
setTimeout( ()=>{
const button = document.getElementById('btn')
button?.addEventListener('click',()=>{
  console.log('bouton clique')
})
const form = document
},0 )

AppManager.getInstance().flightInformation
}

//AppManager.getInstance().changePage("form"); -- new method we're going with henceforth
}