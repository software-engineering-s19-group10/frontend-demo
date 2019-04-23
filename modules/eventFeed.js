import Table from '../util/table.js';

import BaseView from './baseView.js';

const HOST = 'https://boiling-reef-89836.herokuapp.com/',
      ENDPOINT = 'lock_owners/api/events/';

export default class EventFeedView extends BaseView {
  constructor() {
    super('Events');
    this.interval = null;
    this.events = null;
  }

  initMainElement() {
    const message = document.createElement('p');
    message.appendChild(document.createTextNode('Live Event Feed'));

    this.mainElement.appendChild(message);

    this.eventTable = new Table('Lock ID', 'Event ID', 'Type', 'Time', 'Duration', 'Options');

    this.mainElement.appendChild(this.eventTable.table);
  }

  update() {
    this.getEvents();
    this.interval = setInterval(
      () => { 
        console.log('Updated');
        this.getEvents(); 
      },
      3000
    );
  }

  clear() {
    clearInterval(this.interval);
    this.interval = null;
  }

  getEvents() {
    const userId = sessionStorage.getItem('userId');

    fetch(`${HOST}${ENDPOINT}user/?owner=${userId}`)
      .then(response => response.json())
      .then(response => {
        if (response.status == 200) {
          this.events = response.data;
          this.updateTable();
        }
      }
    );
  }

  dismissEvent(event_id) {
    fetch(`${HOST}${ENDPOINT}${event_id}/`, { method: 'DELETE' });
  }

  addEventElement(event) {
    const dismissButton = document.createElement('button');
    dismissButton.appendChild(document.createTextNode('Dismiss'));

    const row = this.eventTable.add(
      event['lock'],
      event['id'],
      event['event_type'],
      event['timestamp'],
      event['duration'],
      dismissButton
    );

    dismissButton.addEventListener(
      'click',
      () => {
        console.log(`Clicked on button ${event['id']}`);
        this.eventTable.remove(row);
        this.dismissEvent(event['id']);
      }
    );
  }

  updateTable() {
    this.eventTable.clear();

    for (let event of this.events) {
      this.addEventElement(event);
    }
  }
}