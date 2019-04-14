import BaseView from "./baseView.js";

export default class EventFeedView extends BaseView {
  constructor() {
    super('Events');
  }

  initMainElement() {
    const message = document.createElement("p");
    message.appendChild(document.createTextNode("This is the event feed"));

    this.mainElement.appendChild(message);
  }
}