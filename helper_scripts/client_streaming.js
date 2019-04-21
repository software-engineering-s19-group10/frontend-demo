
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
    // URL = responseJson["ip_address"];
    URL = "127.0.0.1:8080";
    // Create the socket
    console.log("Creating Socket.");
    const socket = new WebSocket('ws://' + URL);
    console.log("Socket Created.");


    // Event Handler for opening the connection
    socket.onopen = function(event) {
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


    // Get the image element from the DOM
    let imgelement = document.getElementById("latestImage");
    console.log(imgelement);

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
    }
    

   
    //console.log("Closing connection.");
    //socket.close();
    
});