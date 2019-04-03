import BaseView from './baseView.js'

export default class VisitorView extends BaseView {
  constructor() {
    super('Visitor');
  }

  initMainElement() {
    const message = document.createElement('p');
    message.appendChild(document.createTextNode('Welcome to Visitor View!'));

    this.mainElement.appendChild(message);
  }
}

