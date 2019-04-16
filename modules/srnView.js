import BaseView from './baseView.js'

export default class SRNView extends BaseView {
  constructor() {
    super('SRN');
  }

  initMainElement() {
    const map = document.createElement('div');
    map.id = "id";

    <script type="text/javascript" src="map_renderer.js"></script>

    const jquery = document.createElement('script');
    jquery.src = "https://ajax.googleapis.com/ajax/libs/jquery/3.3.1/jquery.min.js";
    
    const gmaps = document.createElement('script');
    gmaps.src = "https://maps.googleapis.com/maps/api/js?key=AIzaSyCJ-Cp4XenVRBBFGG0tjGpxO7acJOssols&libraries=visualization";
    
    const map_renderer = document.createElement('script');
    map_renderer.type = "text/javascript";
    map_renderer.src = "helper_scripts/map_renderer.js";

    this.mainElement.appendChild(message);
  }
}