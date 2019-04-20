
// Set port and URL
PORT = 8080;

authToken = sessionStorage.getItem("token");

fetch('https://boiling-reef-89836.herokuapp.com/lock_owners/api/locks/', {
    method: 'POST',
    body: JSON.stringify({"Authorization": authToken}),
    headers: {
      'Content-Type': 'application/json'
    }
})
.then(response => response.json())
.then(responseJson => {
    URL = responseJson["ip_address"];

    // Create the socket
    console.log("Creating Socket.");
    const socket = new WebSocket('ws://' + URL);
    console.log("Socket Created.");


    // Event Handler for opening the connection
    socket.onopen = function(event) {
        console.log("Connected.");
    }

    window.onload = function(event) {
        console.log("Window loaded");

        // Boolean to check if we should render the image or not. I.E. is it paused?
        var isPlaying = true;

        // Get glyph span from play button from DOM
        let play_glyph = document.getElementById("play-pause");

        // Get play button from DOM.
        let play_btn = document.getElementById("play-btn");

        // Toggle play on click of button
        play_btn.addEventListener("click", function() {
            console.log("Changing from isPlaying:" + isPlaying + "to " + !isPlaying + ".");
            // Change the icon
            if(isPlaying) {
                play_glyph.className = "glyphicon glyphicon-play";
            } else {
                play_glyph.className = "glyphicon glyphicon-pause";
            }

            // Toggle between play and pause
            isPlaying = !isPlaying;
        });


        // Get the image element from the DOM
        let imgelement = document.getElementById("latestImage");
        
        // Event handler for receiving a message.
        socket.onmessage = function(event) {

            console.log("Frame received.");

            // Get the frame which is an encoded JPEG image.
            let frameSTR = event.data;        

            // Add headers for the JPEG
            console.log("Adding JPEG headers");
            var datajpg = "data:image/jpg;base64," + frameSTR;
            console.log(datajpg);
            console.log("JPEG Headers Added.");
            
            if(isPlaying) {
                console.log("Rendering Image.");
                // Display on screen.
                imgelement.src = datajpg;
            }

            isPlaying = false;

        }
    }

    // Close the socket when the window is closed.
    window.onbeforeunload = function(event) {
        console.log("Closing connection.");
        socket.close();
    }
});