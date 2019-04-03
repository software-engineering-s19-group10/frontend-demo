import BaseView from './baseView.js'

export default class HomeView extends BaseView {
  constructor() {
    super('Home');
  }

  initMainElement() {
    const message = document.createElement('p');
    message.appendChild(document.createTextNode('Welcome to Smart Lock!'));

    this.mainElement.appendChild(message);
  }
}