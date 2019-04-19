import BaseView from "./baseView.js";

export default class EventFeedView extends BaseView {
  constructor() {
    super('Events');

    this.events = null;

    this.getEvents = this.getEvents.bind(this);
    this.render = this.render.bind(this);
  }

  initMainElement() {
    const message = document.createElement("p");
    message.appendChild(document.createTextNode("This is the event feed"));
    this.mainElement.appendChild(message);

    this.getEvents();
  }

  getEvents() {
    const userId = sessionStorage.getItem("userId");
    fetch("https://boiling-reef-89836.herokuapp.com/lock_owners/api/events/user/?owner=" + userId)
      .then(response => response.json())
      .then(response => {
        if (response.status === 200) {
          this.events = response.data;
          console.log(this.events);
          this.render();
        }
      });
  }

  render() {
    if (this.events !== null) {
      let events = this.events;
      this.mainElement.appendChild(document.createElement("hr"));
      for (let i = 0; i < events.length; i++) {
        let div = document.createElement("div");
        div.setAttribute("id", "event-div-" + events[i].id);
        let eventSpan1 = document.createElement("div");
        let lockId = document.createElement("p");
        lockId.setAttribute("style", "display: inline-block; padding-right: 150px");
        lockId.appendChild(document.createTextNode("Lock #" + events[i].lock));
        let eventType = document.createElement("p");
        eventType.appendChild(document.createTextNode("Type: " + events[i].event_type));
        eventType.setAttribute("style", "display: inline-block")

        eventSpan1.appendChild(lockId);
        eventSpan1.appendChild(eventType);
        div.appendChild(eventSpan1);

        let eventSpan2 = document.createElement("div");
        let timestamp = document.createElement("p");
        timestamp.appendChild(document.createTextNode("Time: " + events[i].timestamp));
        timestamp.setAttribute("style", "display: inline-block; padding-right: 150px");

        let duration = document.createElement("p");
        duration.appendChild(document.createTextNode("Duration: " + events[i].duration + " seconds"));
        duration.setAttribute("style", "display: inline-block");

        eventSpan2.appendChild(timestamp);
        eventSpan2.appendChild(duration);
        div.appendChild(eventSpan2);

        let dismissButton = document.createElement("button");
        dismissButton.setAttribute("type", "button");
        dismissButton.setAttribute("id", "dismiss-" + events[i].id);
        dismissButton.addEventListener("click", (event) => {
          const id = parseInt(event.target.id.split("-")[1]);
          console.log("Clicked on button " + id);
          let div = document.getElementById("event-div-" + id);
          div.remove();
          fetch("https://boiling-reef-89836.herokuapp.com/lock_owners/api/events/" + id + "/", {
            method: "DELETE"
          });
        });
        dismissButton.appendChild(document.createTextNode("Dismiss"));
        div.appendChild(dismissButton);

        this.mainElement.appendChild(div);
        this.mainElement.appendChild(document.createElement("hr"));
      }
    }
  }
}