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

    /*
    // Add the map_renderer script
    const map_renderer = document.createElement('script');
    map_renderer.type = "text/javascript";
    map_renderer.src = "helper_scripts/map_renderer.js";

    this.mainElement.appendChild(map_renderer);*/

  }


  /* Render the map on load */
  update() { 

    // have to deal with permissions this way.
    let geoipURL = "https://api.ipgeolocation.io/ipgeo?apiKey=a359c0ed992141c78a4d359c5f77aab6";

    // get the corresponding json with geolocation
    fetch(geoipURL, {
        method: 'GET', headers: {
            'Content-Type': 'application/json'
        }
    }).then(response => response.json())
    .then( responseJson => {
        // get the latitude and longitude
        let lat = responseJson["latitude"];
        let long = responseJson["longitude"];

        // function to initialize the map;
        // center it at the current position of user 
        function initMap(latitude, longitude) {
            let map = new google.maps.Map(document.getElementById('map'), {
                zoom: 2,
                center: {lat: lat, lng: long},
                mapTypeId: 'terrain'
            });
    
            // set the circles
            map.data.setStyle(function(feature) {
                var magnitude = feature.getProperty('mag');
                return {
                icon: getCircle(magnitude)
                };
            });
            return map;
        }
        
        // initialize the map
        var map = initMap(lat, long);
    

        function heatmapRenderer(resJson) {

            // create the circles for the heatmap
            function getCircle(magnitude) {
                return {
                    path: google.maps.SymbolPath.CIRCLE,
                    fillColor: 'red',
                    fillOpacity: .2,
                    scale: Math.pow(4, magnitude) / 2,
                    strokeColor: 'white',
                    strokeWeight: .8
                };
            }

            var heatmapDat = [];
            
            /* Data points defined as an array of LatLng objects */
            for(let i = 0; i < resJson.length; i++) {
                heatmapDat.push(new google.maps.LatLng(resJson[i]["latitude"], resJson[i]["longitude"]))
            }           

            var place = new google.maps.LatLng(lat, long);

            map = new google.maps.Map(document.getElementById('map'), {
                center: place,
                zoom: 13,
                mapTypeId: google.maps.MapTypeId.HYBRID
            });

            var heatmap = new google.maps.visualization.HeatmapLayer({
                data: heatmapDat
            });

            heatmap.setMap(map);
        }

        // the api url to get data
        // replace this with whatever we use
        let dataURL = "https://boiling-reef-89836.herokuapp.com/lock_owners/api/srn/";
        

        fetch(dataURL, {
            method: 'GET',headers: {
              'Content-Type': 'application/json'
            }
        })
        .then(response => response.json())
        .then(responseJson => {
            heatmapRenderer(responseJson);
        });

    });


  }

  /* Do nothing */
  clear() { 
    console.log("Exiting the map.");
  }

}