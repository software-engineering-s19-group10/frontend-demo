import Table from '../util/table.js'

import BaseView from './baseView.js'


const LOCK_ID = 11,
      HOST = 'https://boiling-reef-89836.herokuapp.com/',
      ENDPOINT = 'lock_owners/api/residents/',
      IMAGE_COUNT = 9,  // Number of images to ask for
      STOCK_IMAGE = 'img/icons8-xlarge-icons-100.png';  // Path of the stock image


export default class ResidentsView extends BaseView {
  constructor() {
    super('Residents');
    this.residents = [];
    this.imageIndex = 0;
    this.imagePaths = new Array(IMAGE_COUNT);
  }

  initMainElement() {
    const message = document.createElement('p');
    message.appendChild(document.createTextNode('Authorized Residents'));

    this.mainElement.appendChild(message);

    const add_container = document.createElement('div'),
          table_container = document.createElement('div'),
          button_add = document.createElement('button');

    this.tableView = table_container; // Used for clearing values

    button_add.appendChild(document.createTextNode('Add Resident'));
    button_add.addEventListener('click', () => this.showAddView());

    table_container.appendChild(button_add);

    this.residentTable = new Table('Name', 'ID', 'Lock ID', 'Options');

    table_container.appendChild(this.residentTable.table);

    this.mainElement.appendChild(table_container);

    this.addView = add_container; // Used for clearing values

    add_container.style.setProperty('display', 'none');

    const input_upload = document.createElement('input');
    input_upload.setAttribute('type', 'file');
    input_upload.setAttribute('multiple', '');
    this.fileInput = input_upload;  // Used for clearing values

    const image_preview = document.createElement('img');
    image_preview.setAttribute('alt', 'Image preview here');
    image_preview.setAttribute('height', '200px');
    image_preview.setAttribute('src', STOCK_IMAGE);
    this.imagePreview = image_preview;  // Used for clearing values

    const image_selector = document.createElement('div');
    this.imagePreviews = image_selector;  // Used for clearing values

    const input_name = document.createElement('input');
    input_name.setAttribute('type', 'text');
    this.nameInput = input_name;  // Used for clearing values

    const submit_button = document.createElement('button');
    submit_button.appendChild(document.createTextNode('Submit'));
    submit_button.disabled = true;

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
      for (let file_path of event.target.files) {
        if (this.imageIndex == IMAGE_COUNT)
          break;

        const current_image = image_selector.children[this.imageIndex];
  
        const reader = new FileReader();
  
        // When we load a file use the file reader...
        reader.addEventListener(
          'load',
          () => {
            image_preview.setAttribute('src', reader.result);
            current_image.setAttribute('src', reader.result);
          }
        );
  
        reader.readAsDataURL(file_path);
        
        this.imagePaths[this.imageIndex] = file_path;
  
        // Enable the button if IMAGE_COUNT images have been chosen
        submit_button.disabled = !this.checkImagesPicked();

        this.imageIndex++;
      }
    };

    submit_button.addEventListener(
      'click',
      () => {
        const resident_name = input_name.value;

        if (confirm(`Are you sure you want to create resident "${resident_name}"?`)) {
          this.postResident(LOCK_ID, resident_name);  // Note: Hardcoded lock ID here
        }
      }
    );

    button_cancel.addEventListener(
      'click',
      () => {
        this.showTableView();
        this.clearAddView();
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

  update() {
    this.getResidents();
  }

  clear() {
    this.residentTable.clear();
    this.showTableView();
    this.clearAddView();
  }

  clearAddView() {
    this.imagePaths = new Array(9);

    for (let i = 0; i < IMAGE_COUNT; i++)
      this.imagePreviews.children[i].setAttribute('src', STOCK_IMAGE);

    this.imagePreview.setAttribute('src', this.imagePreviews.children[0].getAttribute('src'));

    this.fileInput.value = null;

    this.nameInput.value = '';
  }

  /* Check if all IMAGE_COUNT images are picked */
  checkImagesPicked() {
    for (let path of this.imagePaths)
      if (path === undefined)
        return false;

    return true;
  }

  /* Present user with view of add resident dialog */
  showAddView() {
    this.addView.style.setProperty('display', 'block');
    this.tableView.style.setProperty('display', 'none');
  }

  /* Present user with view of residents table */
  showTableView() {
    this.addView.style.setProperty('display', 'none');
    this.tableView.style.setProperty('display', 'block');
  }

  addResidentElement(resident_obj) {
    const delete_button = document.createElement('button');
    delete_button.appendChild(document.createTextNode('Delete'));

    this.residentTable.add(
      resident_obj['full_name'],
      resident_obj['id'],
      resident_obj['lock'],
      delete_button
    );

    const row = this.residentTable.body.lastChild;

    delete_button.addEventListener(
      'click',
      () => {
        if (confirm(`Are you sure you want to delete resident "${resident_obj['full_name']}" (${resident_obj['id']})?`)) {
          this.deleteResident(resident_obj['id']);
          this.residentTable.remove(row);
        }
      }
    );
  }

  getResidents() {
    fetch(`${HOST}${ENDPOINT}`)
      .then(response => response.json())
      .then(data => { 
        for (let resident of data) {
          this.residents.push(resident);
          this.addResidentElement(resident);
        }
      })
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
      .then(data => {
        this.addResidentElement(data);

        for (let image_path of this.imagePaths) {
          if (image_path) {
            const reader = new FileReader();

            reader.addEventListener(
              'load',
              // btoa converts to base-64
              () => this.postResidentImage(data['id'], btoa(reader.result))
            );

            reader.readAsBinaryString(image_path);
          }
        }

        this.showTableView();
        this.clearAddView();
      });
  }

  postResidentImage(resident_id, image_bytes) {
    fetch(`${HOST}lock_owners/api/resident-images/`,
      {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ 'resident': resident_id, 'image_bytes': image_bytes })
      }  
    )
      .then(response => response.json())
      .then(data => console.log(data));
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