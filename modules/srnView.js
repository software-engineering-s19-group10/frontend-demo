import BaseView from './baseView.js'

export default class SRNView extends BaseView {
  constructor() {
    super('Stranger Report Map');
  }

  initMainElement() {

    // Booleans to let us know if jQuery and GMaps has loaded
    let hasJQuery = false;
    let hasGmaps = false;

    // Create the div 
    const map = document.createElement('div');
    map.id = "map";
    map.style= "width: 500px; height: 500px;";
    this.mainElement.appendChild(map);

    async function wait() {
      while(!document.querySelector("#map")) {
        await new Promise(r => setTimeout(r, 500));
      }
    };
   
    wait();

    // Add the map_renderer script
    const map_renderer = document.createElement('script');
    map_renderer.type = "text/javascript";
    map_renderer.src = "helper_scripts/map_renderer.js";

    this.mainElement.appendChild(map_renderer);

  }
}