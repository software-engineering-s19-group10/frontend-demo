import BaseView from "./baseView.js";

export default class EventFeedView extends BaseView {
  constructor() {
    super('Events');
    this.initializeFeed = this.initializeFeed.bind(this);
  }

  initMainElement() {
    const message = document.createElement("p");
    message.appendChild(document.createTextNode("This is the event feed"));

    this.initializeFeed();

    this.mainElement.appendChild(message);
  }

  initializeFeed() {
    const mainElement = this.mainElement;
  }


}