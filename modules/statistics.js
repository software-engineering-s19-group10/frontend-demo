import BaseView from './baseView.js'

export default class StatisticsView extends BaseView {
  constructor() {
    super('Statistics');
  }

  initMainElement() {
    const message = document.createElement('p');
    message.appendChild(document.createTextNode('Statistics View'));

    this.mainElement.appendChild(message);
  }
}