import Table from '../util/table.js';

import BaseView from './baseView.js';

const LOCK_ID = 11,
      HOST = 'https://boiling-reef-89836.herokuapp.com/',
      ENDPOINT = 'lock_owners/api/temp_auth/';

export default class VisitorView extends BaseView {
  constructor() {
    super('Visitors');
  }

  initMainElement() {
    const message = document.createElement('p');
    message.appendChild(document.createTextNode('Welcome to Visitor View!'));

    this.mainElement.appendChild(message);

    const button_div = document.createElement('div'),
          visitor_add = document.createElement('input'),
          visitor_clear = document.createElement('input'),
          visitor_input = document.createElement('div'),
          visitor_name = this.input_name = document.createElement('input');

    visitor_input.setAttribute('id', 'visitor-input');

    visitor_name.setAttribute('id', 'visitor-name');
    visitor_name.setAttribute('type', 'text');

    visitor_input.appendChild(visitor_name);

    visitor_add.setAttribute('id', 'visitor-add');
    visitor_add.setAttribute('type', 'button');
    visitor_add.setAttribute('value', 'Add');

    visitor_add.addEventListener('click', () => {
      const visitor_name_string = visitor_name.value;

      // Don't accept requests if no name is entered
      if (visitor_name_string == '') return;

      if (confirm(`Are you sure you want to add visitor "${visitor_name_string}"?`))
        this.postVisitor(LOCK_ID, visitor_name_string);
    });

    button_div.appendChild(visitor_add);

    visitor_clear.setAttribute('id', 'visitor-clear');
    visitor_clear.setAttribute('type', 'button');
    visitor_clear.setAttribute('value', 'Clear');

    visitor_clear.addEventListener(
      'click',
      () => visitor_name.value = ''
    );

    button_div.appendChild(visitor_clear);

    visitor_input.appendChild(button_div);

    this.mainElement.appendChild(visitor_input);

    this.visitorTable = new Table('Name', 'ID', 'Lock ID', 'Options');

    this.mainElement.appendChild(this.visitorTable.table);
  }

  clear() {
    this.visitorTable.clear();
  }

  update() {
    this.getVisitors();
  }

  /* Add a visitor 'tr' element to the array */
  addVisitorElement(visitor_obj) {
    const button_container = document.createElement('td'),
          button_copy = document.createElement('button'),
          button_delete = document.createElement('button');

    button_copy.appendChild(document.createTextNode('Copy'));

    button_copy.addEventListener(
      'click',
      () => {
        navigator.clipboard.writeText(`${window.location.host}/visitor.html?door=${visitor_obj['lock']}&visitor=${visitor_obj.id}`)
          .then(
            () => { window.alert('Visitor URL copied to clipboard'); },
            () => { window.alert('Failed copying URL to clipboard'); });
      }
    );

    button_container.appendChild(button_copy);

    button_delete.appendChild(document.createTextNode('Delete'));

    const row = this.visitorTable.add(
      visitor_obj['visitor'],
      visitor_obj['id'],
      visitor_obj['lock'],
      button_container
    );

    button_delete.addEventListener(
      'click',
      () => {
        if (confirm(`Are you sure you want to delete ${visitor_obj['visitor']} (${visitor_obj['id']})?`)) {
          this.deleteVisitor(visitor_obj['id']);
          this.visitorTable.remove(row);
        }
      }
    );

    button_container.appendChild(button_delete);
  }

  /* Get the list of visitors from the server */
  getVisitors() {
    fetch(`${HOST}${ENDPOINT}`)
      .then(response => response.json())
      .then(data => {
        console.log(data);
        for (let visitor of data) 
          this.addVisitorElement(visitor);
    });
  }

  /* Create a new visitor on the server */
  postVisitor(lock_id, visitor_name) {
    fetch(`${HOST}${ENDPOINT}`, {
      method: 'post',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ visitor: visitor_name, lock: lock_id })
    })
      .then(response => response.json())
      .then(data => {
        console.log(data);
        this.addVisitorElement(data);
      });
  }

  /* Remove an exisiting visitor from the server */
  deleteVisitor(visitor_id) {
    fetch(`${HOST}${ENDPOINT}${visitor_id}/`, {
      method: 'delete',
      headers: {
        'Accept': 'application/json, text/plain, */*',
        'Content-Type': 'application/json'
      }
    })
      .then(response => console.log(response));  // Doesn't return anything
  }
}
