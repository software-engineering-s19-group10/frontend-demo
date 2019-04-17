import BaseView from './baseView.js'

const IMAGE_COUNT = 9,  // Number of images to ask for
      STOCK_IMAGE = 'img/icons8-xlarge-icons-100.png';  // Path of the stock image

export default class ResidentsView extends BaseView {
  constructor() {
    super('Residents');
    this.imageIndex = 0;
  }

  initMainElement() {
    const message = document.createElement('p');
    message.appendChild(document.createTextNode('Welcome to Residents View!'));

    this.mainElement.appendChild(message);

    const input_upload = document.createElement('input');
    input_upload.setAttribute('type', 'file');

    const image_preview = document.createElement('img');
    image_preview.setAttribute('alt', 'Image preview here');
    image_preview.setAttribute('height', '200px');
    image_preview.setAttribute('src', STOCK_IMAGE);

    const image_selector = document.createElement('div');

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
    };

    this.mainElement.appendChild(image_selector);

    this.mainElement.appendChild(input_upload);

    this.mainElement.appendChild(image_preview);
  }
}