export default class View {
  
  constructor(name) {
    // Set up menu item
    this.menuElement = this.createMenuElement(name);
    this.menuElement.addEventListener(
      'click', 
      _ => {
        const main = document.getElementById('main-view'); 
        document.body.replaceChild(this.mainElement, main);
      }
    );

    // Set up main view element
    this.mainElement = document.createElement('main');
    this.mainElement.setAttribute('id', 'main-view');
    this.initMainElement();
  }

  createMenuElement(name) {
    const menu_item = document.createElement('li');
    menu_item.appendChild(document.createTextNode(name));

    return menu_item;
  }
}