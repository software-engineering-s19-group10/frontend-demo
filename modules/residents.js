import Table from '../util/table.js'

import BaseView from './baseView.js'


const HOST = 'https://boiling-reef-89836.herokuapp.com/',
      ENDPOINT = 'lock_owners/api/residents/',
      IMAGE_COUNT = 9,  // Number of images to ask for
      STOCK_IMAGE = 'img/icons8-xlarge-icons-100.png';  // Path of the stock image


export default class ResidentsView extends BaseView {
  constructor() {
    super('Residents');
    this.imageIndex = 0;
    this.imagePaths = new Array(IMAGE_COUNT);
    this.getResidents();
  }

  /* Check if all IMAGE_COUNT images are picked */
  checkImagesPicked() {
    for (let path of this.imagePaths)
      if (path === undefined)
        return false;

    return true;
  }

  initMainElement() {
    const message = document.createElement('p');
    message.appendChild(document.createTextNode('Welcome to Residents View!'));

    this.mainElement.appendChild(message);

    const add_container = document.createElement('div'),
          table_container = document.createElement('div'),
          button_add = document.createElement('button');

    this.residents = new Table('Name', 'ID', 'Lock ID', 'Options');

    table_container.appendChild(this.residents.table);

    button_add.appendChild(document.createTextNode('Add Resident'));

    button_add.addEventListener(
      'click',
      () => {
        // table_container.style.display = 'block';  
        table_container.style.setProperty('display', 'none');  // Hide the table view
        // add_container.style.display = 'none';  
        add_container.style.setProperty('display', 'block');  // Show the add view
      }
    );

    table_container.appendChild(button_add);

    this.mainElement.appendChild(table_container);

    add_container.style.setProperty('display', 'none');

    const input_upload = document.createElement('input');
    input_upload.setAttribute('type', 'file');

    const image_preview = document.createElement('img');
    image_preview.setAttribute('alt', 'Image preview here');
    image_preview.setAttribute('height', '200px');
    image_preview.setAttribute('src', STOCK_IMAGE);

    const image_selector = document.createElement('div');

    const input_name = document.createElement('input');
    input_name.setAttribute('type', 'text');

    const submit_button = document.createElement('button');
    submit_button.appendChild(document.createTextNode('Submit'));
    // submit_button.disabled = true;

    const button_cancel = document.createElement('button');
    button_cancel.appendChild(document.createTextNode('Cancel'));

    for (let i = 0; i < IMAGE_COUNT; i++) {
      const image = document.createElement('img');
      image.setAttribute('alt', `image ${i}`);
      image.setAttribute('width', '100px');
      image.setAttribute('height', '100px');
      image.setAttribute('src', STOCK_IMAGE);

      image.addEventListener('click', () => {
        this.imageIndex = i;
        image_preview.setAttribute('src', image.getAttribute('src'));
      })

      image_selector.appendChild(image);
    }

    input_upload.onchange = (event) => {
      const current_image = image_selector.children[this.imageIndex];

      const file_path = event.target.files[0];

      const reader = new FileReader();

      // When we load a file use the file reader...
      reader.addEventListener('load', () => {
        image_preview.setAttribute('src', reader.result);
        current_image.setAttribute('src', reader.result);
      });

      reader.readAsDataURL(file_path);

      this.imagePaths[this.imageIndex] = file_path;

      // Enable the button if IMAGE_COUNT images have been chosen
      // submit_button.disabled = !this.checkImagesPicked();

      console.log(this.imagePaths, submit_button.disabled);
    };

    submit_button.addEventListener(
      'click',
      () => {
        const resident_name = input_name.value;

        if (confirm(`Are you sure you want to create resident "${resident_name}"?`)) {
          this.postResident(1, resident_name);  // Note: Hardcoded lock ID here
          // add_container.style.display = 'none';  // Hide the add view
          add_container.style.setProperty('display', 'none');
          // table_container.style.display = 'block';  //Present the table view
          table_container.style.setProperty('display', 'block');
        }
      }
    );

    button_cancel.addEventListener(
      'click',
      () => {
        add_container.style.setProperty('display', 'none');
        table_container.style.setProperty('display', 'block');
      }
    )

    add_container.appendChild(image_selector);

    add_container.appendChild(input_upload);

    add_container.appendChild(image_preview);

    add_container.appendChild(input_name);

    add_container.appendChild(submit_button);

    add_container.appendChild(button_cancel);

    this.mainElement.appendChild(add_container);
  }

  addResidentElement(resident_obj) {
    const delete_button = document.createElement('button');
    delete_button.appendChild(document.createTextNode('Delete'));

    this.residents.add(
      resident_obj['full_name'],
      resident_obj['id'],
      resident_obj['lock'],
      delete_button
    );

    const row = this.residents.body.lastChild;

    delete_button.addEventListener(
      'click',
      () => {
        if (confirm(`Are you sure you want to create resident "${resident_obj['full_name']}" (${resident_obj['id']})?`)) {
          this.deleteResident(resident_obj['id']);
          this.residents.remove(row);
        }
      }
    );
  }

  getResidents() {
    fetch(`${HOST}${ENDPOINT}`)
      .then(response => response.json())
      .then(data => { for (let resident of data) this.addResidentElement(resident); })
  }

  postResident(lock_id, name) {
    fetch(`${HOST}${ENDPOINT}`,
      {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ 'full_name': name, 'lock': lock_id })
      }
    )
      .then(response => response.json())
      .then(data => this.addResidentElement(data));
  }

  deleteResident(lock_id) {
    fetch(`${HOST}${ENDPOINT}${lock_id}`,
      {
        method: 'DELETE'
      }
    )
      .then(response => console.log(response));
  }
}