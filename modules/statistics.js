import BaseView from './baseView.js'

export default class StatisticsView extends BaseView {
  constructor() {
    super('Statistics');
  }

  initMainElement() {
    const message = document.createElement('p');
    message.appendChild(document.createTextNode('Statistics'));

    this.mainElement.appendChild(message);
  }
}