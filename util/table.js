export default class Table {
  constructor(...headers) {
    this.table = document.createElement('table');
    this.body = document.createElement('tbody');
    this.head = document.createElement('thead');
    this.header = document.createElement('tr');

    for (let h of headers) {
      const header_element = document.createElement('td');
      header_element.appendChild(document.createTextNode(h));

      this.header.appendChild(header_element);
    }

    this.head.appendChild(this.header);

    this.table.appendChild(this.head);
    this.table.appendChild(this.body);
  }

  /* Add a row to the table body */
  add(...data) {
    const row = document.createElement('tr');

    for (let d of data) {
      const data_element = document.createElement('td');

      if (typeof d == 'string' || typeof d == 'number')
        data_element.appendChild(document.createTextNode(d));
      else
        data_element.appendChild(d);

      row.appendChild(data_element);
    }

    this.body.appendChild(row);
  }

  /* Remove a row from the table body */
  remove(row) {
    this.body.removeChild(row);
  }

  /* Clear children from the table body */
  clear() {
    while (!this.body.firstChild)
      this.body.removeChild(this.body.firstChild);
  }
}