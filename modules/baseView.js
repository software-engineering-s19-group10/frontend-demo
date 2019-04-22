export default class View {
  
  constructor(name) {
    this.name = name;

    // Set up menu item
    this.menuElement = this.createMenuElement(name);

    // Set up main view element
    this.mainElement = document.createElement('main');
    this.mainElement.setAttribute('id', 'main-view');
    this.initMainElement();
    this.mainElement.setAttribute('data-view', name);
  }

  /* Fill out view with fresh information */
  update() { console.log(`View ${this.name} has not implimented update()`); }

  /* Return main to it's starting state */
  clear() { console.log(`View ${this.name} has not implimented clear()`); }

  createMenuElement(name) {
    const menu_item = document.createElement('li');
    menu_item.appendChild(document.createTextNode(name));

    return menu_item;
  }
}