import BaseView from './baseView.js';

const HOST = 'https://boiling-reef-89836.herokuapp.com/',
  ENDPOINT = 'lock_owners/api/events/';

export default class EventFeedView extends BaseView {
  constructor() {
    super('Events');

    this.events = null;

    this.getEvents = this.getEvents.bind(this);
    //this.update = this.update.bind(this);
    //this.getEvents();
  }

  initMainElement() {
    const message = document.createElement('p');
    message.appendChild(document.createTextNode('Live Event Feed'));

    this.mainElement.appendChild(message);

    const event_table = document.createElement('table'),
      event_table_body = this.table_body = document.createElement('tbody'),
      event_table_head = document.createElement('thead'),
      event_table_head_row = document.createElement('tr');

    for (let column_name of ['Lock ID', 'Type', 'Time', 'Duration', 'Options']) {
      const column_header = document.createElement('td');
      column_header.appendChild(document.createTextNode(column_name));
      event_table_head_row.appendChild(column_header);
    }

    event_table_head.appendChild(event_table_head_row);

    event_table.appendChild(event_table_head);
    event_table.appendChild(event_table_body);

    this.mainElement.appendChild(event_table);

    let me = this;
    setInterval(() => {
      me.update()
    }, 3000);
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
      });
  }

  dismissEvent(event_id) {
    fetch(`${HOST}${ENDPOINT}${event_id}/`, { method: 'DELETE' });
  }

  removeTable() {
    const table_body = this.table_body;
    while (table_body.firstChild) {
      table_body.removeChild(table_body.firstChild);
    }
  }

  updateTable() {
    this.removeTable();
    for (let event of this.events) {
      const event_row = document.createElement('tr');

      for (let key of ['lock', 'event_type', 'timestamp', 'duration']) {
        const event_data = document.createElement('td');
        event_data.appendChild(document.createTextNode(event[key]));

        event_row.appendChild(event_data);
      }

      const event_id = event.id;

      const dismissButton = document.createElement('button');
      dismissButton.appendChild(document.createTextNode('Dismiss'));
      dismissButton.addEventListener('click', () => {
        console.log(`Clicked on button ${event_id}`);
        event_row.remove();
        this.dismissEvent(event_id);
      });

      event_row.appendChild(dismissButton);

      this.table_body.appendChild(event_row);
    }
  }

  update() {
    this.getEvents();
  }
}