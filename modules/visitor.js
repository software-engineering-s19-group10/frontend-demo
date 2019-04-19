import BaseView from './baseView.js'

const HOST = 'https://boiling-reef-89836.herokuapp.com/',
      ENDPOINT = 'lock_owners/api/temp_auth';

export default class VisitorView extends BaseView {
  constructor() {
    super('Visitor');
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

    button_div.appendChild(visitor_add);

    visitor_clear.setAttribute('id', 'visitor-clear');
    visitor_clear.setAttribute('type', 'button');
    visitor_clear.setAttribute('value', 'Clear');

    button_div.appendChild(visitor_clear);

    visitor_input.appendChild(button_div);

    this.mainElement.appendChild(visitor_input);

    const visitor_table = document.createElement('table'),
          visitor_table_body = this.table_body = document.createElement('tbody'),
          visitor_table_head = document.createElement('thead'),
          visitor_table_head_row = document.createElement('tr');

    for (let field_name of ['Name', 'ID', 'Options']) {
      let table_data = document.createElement('td');
      table_data.appendChild(document.createTextNode(field_name));

      visitor_table_head_row.appendChild(table_data);
    }

    visitor_table_head.appendChild(visitor_table_head_row);

    visitor_table.appendChild(visitor_table_head);

    visitor_table.appendChild(visitor_table_body);

    this.mainElement.appendChild(visitor_table);

    this.getVisitors();
  }

  addVisitor(visitor_obj) {
    const visitor_row = document.createElement('tr');

    for (let key of ['visitor', 'id']) {
      const visitor_data = document.createElement('td');
      visitor_data.appendChild(document.createTextNode(visitor_obj[key]));

      visitor_row.appendChild(visitor_data);
    }

    const button_container = document.createElement('td'),
          button_copy = document.createElement('button'),
          button_delete = document.createElement('button');

    button_copy.appendChild(document.createTextNode('Copy'));

    button_copy.addEventListener('click', () => {
      navigator.clipboard.writeText(`${window.location.host}/visitor.html?door=${visitor_obj['lock']}&visitor=${visitor_obj.id}`)
      .then(
        () => { window.alert('Visitor URL copied to clipboard'); },
        () => { window.alert('Failed copying URL to clipboard'); });
    });

    button_delete.appendChild(document.createTextNode('Delete'));

    button_delete.addEventListener('click', () => {
      if (confirm(`Are you sure you want to delete ${visitor_obj['visitor']} (${visitor_obj['id']})?`)) {
        
      }
    });

    button_container.appendChild(button_copy);
    button_container.appendChild(button_delete);

    visitor_row.appendChild(button_container);

    this.table_body.appendChild(visitor_row);
  }

  /* Remove an exisiting visitor from the server */
  deleteVisitor(visitor_id) {
    fetch(`${HOST}${ENDPOINT}`, {
      method: 'delete',
      headers: {
        'Accept': 'application/json, text/plain, */*',
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({visitor_id: visitor_id})
    }).then(res => res.json())
      .then(res => {
        console.log(res);
      });
  }

  /* Create a new visitor on the server */
  postVisitor(lock_id, visitor_name) {
    fetch(`${HOST}${ENDPOINT}`, {
      method: 'post',
      headers: {
        'Accept': 'application/json, text/plain, */*',
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        visitor: visitor_name,
        lock: lock_id
      })
    }).then(res => res.json())
      .then(res => {
        console.log(res);
      });
  }

  /* Get the list of visitors from the server */
  getVisitors() {
    fetch(`${HOST}${ENDPOINT}/`)
      .then(res => res.json())
      .then(res => { for (let visitor of res) { console.log(visitor); this.addVisitor(visitor) } });
  }
}
