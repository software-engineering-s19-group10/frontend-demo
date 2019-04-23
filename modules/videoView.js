import BaseView from './baseView.js'

export default class videoView extends BaseView {
  constructor() {
    super('Video Feed');
  }

  initMainElement() {
    
    async function wait(selector) {
      while(!document.querySelector(selector)) {
        await new Promise(r => setTimeout(r, 500));
      }
    };

    const cssLink = document.createElement('link');

    cssLink.rel = "stylesheet";
    cssLink.type = "text/css";
    cssLink.href = "css/videoView.css";

    this.mainElement.appendChild(cssLink);



    const imgDiv = document.createElement('div');

    const img = document.createElement("img");
    img.id = "latestImage";
    img.classList.add("container");
    imgDiv.appendChild(img);

    this.mainElement.appendChild(imgDiv);

    wait("#latestImage");

    const playButton = document.createElement("button");
    playButton.type = "button";
    playButton.id = "play-btn";
    playButton.textContent = "Pause";
    playButton.classList.add("bottom-left");

    playButton.style.width = '10em'; // setting the width 
    playButton.style.height = '5em'; // setting the height 
    this.mainElement.appendChild(playButton);
   
    wait("#play-btn");

    const rewind = document.createElement("button");
    rewind.type = "button";
    rewind.id = "rewind";
    rewind.textContent = "Rewind 10 sec.";
    rewind.classList.add("bottom-right");

    rewind.style.width = '10em'; // setting the width 
    rewind.style.height = '5em'; // setting the height 
    this.mainElement.appendChild(rewind);
   
    wait("#rewind");

  }

  /* Fill out view with fresh information */
  update() { 

    function sleep(ms) {
      return new Promise(resolve => setTimeout(resolve, ms));
    }

    // Set port and URL
    let PORT = 8080;

    var frames = [];

    let authToken = sessionStorage.getItem("token");

    fetch('https://boiling-reef-89836.herokuapp.com/lock_owners/api/locks/?Authorization=' + authToken, {
        method: 'GET',
        params: JSON.stringify({"Authorization": authToken}),
        headers: {
          'Content-Type': 'application/json'
        }
    })
    .then(response => response.json())
    .then(responseJson => {
        console.log(responseJson);
        var URL = responseJson[0]["ip_address"];
        console.log(URL);
        // testing purposes
        // URL = "127.0.0.1:8080";
        
        let isRewind = false;

        // Create the socket
        console.log("Creating Socket.");
        this.socket = new WebSocket('ws://' + URL + ":" + PORT);
        console.log("Socket Created.");


        // Event Handler for opening the connection
        this.socket.onopen = function(event) {
            console.log("Connected.");
        }

        

        // Boolean to check if we should render the image or not. I.E. is it paused?
        var isPlaying = true;

        // Get play button from DOM.
        let play_btn = document.getElementById("play-btn");

        // Toggle play on click of button
        play_btn.addEventListener("click", function() {
            console.log("Changing from isPlaying:" + isPlaying + "to " + !isPlaying + ".");
            // Change the icon
            if(isPlaying) {
                play_btn.textContent = "Play";
            } else {
                play_btn.textContent = "Pause";
            }

            // Toggle between play and pause
            isPlaying = !isPlaying;
        });


        // Get play button from DOM.
        let rewind = document.getElementById("rewind");

       

        // Get the image element from the DOM
        let imgelement = document.getElementById("latestImage");
        //console.log(imgelement);

        // Toggle play on click of button
        rewind.addEventListener("click", function() {
          isRewind = true;
          
          async function rewindVideo() {
            console.log("Rewinding");
            console.log(frames.length);
            let counter = 0;
            let maxFrames = frames.length;

            while(counter < maxFrames) {
              console.log("Frame " + counter);

              imgelement.src = frames[counter];
              await sleep(500);
              counter++;
            }

            isRewind = false;
          }

          rewindVideo();
          
        });

        // Event handler for receiving a message.
        this.socket.onmessage = function(event) {

            //console.log("Frame received.");

            // Get the frame which is an encoded JPEG image.
            let frameSTR = event.data;        

            // Add headers for the JPEG
            //console.log("Adding JPEG headers");
            var datajpg = "data:image/jpg;base64," + frameSTR;
            //console.log(datajpg);
            //console.log("JPEG Headers Added.");
            
            if(!isRewind) {
              // append the frame to the array 
              frames.push(datajpg);
            }


            if(frames.length > 10) {
              frames.shift();
            }

            if(isPlaying && !isRewind) {
                //console.log("Rendering Image.");
                // Display on screen.
                imgelement.src = datajpg;
            }
        }
        
    });
  }

  /* Return main to it's starting state */
  clear() { 
     console.log("Closing connection.");
     this.socket.close();
  }



}
