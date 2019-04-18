// Mobile Side Menu Functionality
// Smaller window resizing will have similar functionality as mobile.

window.onload = function() {
  var media = window.matchMedia("(max-width: 768px)"); // Media Query for JS.
  mobileSideBar(media); // Call listener function at run time.
  media.addListener(mobileSideBar); // Attach listener function on state changes.

  function mobileSideBar(media) {
    var sideMenu = document.getElementById('side-menu');

    if (media.matches) { // If media query matches.
      var items = document.getElementById('view-items');
      var current, cancelOpen = false, cancelClose = false;

      sideMenu.style.left = '-180px';

      sideMenu.addEventListener('touchend', function() { // End Touch event listener.
        cancelOpen = false, cancelClose = false;

        if (parseInt(sideMenu.style.left) > -90) // Over 50%.
          animateOpen();

        if (parseInt(sideMenu.style.left) <= -90) // Under 50%.
          animateClose();
      })

      sideMenu.addEventListener('touchmove', function(ev) { // Active Touch event listener.
        current = ev.targetTouches[0]; // Current Touch position.
        
        window.requestAnimationFrame(moveWith);
        cancelOpen = true, cancelClose = true;
      })

      items.addEventListener('click', function() { // Close Menu on item click.
        if (window.innerWidth < 768)
          animateClose();
      })

      /*
      For when window is resized below threshold.
      Sidebar will collapse like in mobile.
      */
      sideMenu.addEventListener('mouseenter', function() { // Mouse enter event listener.
        if (window.innerWidth < 768){
          cancelClose = true;
          animateOpen();
        }
      })

      sideMenu.addEventListener('mouseleave', function() { // Mouse leave event listener.
        if (window.innerWidth < 768){
          cancelOpen = true;
          animateClose();
        }
          
      })

      /*
      JS animation functions.
      animateOpen(), animateClose(), moveWith()
      */
      function animateOpen() { // Menu opening animation.
        let pos = parseInt(sideMenu.style.left);
        let id = setInterval(frame, 1);

        function frame() { // Animate.
          if (pos == 0) {
            clearInterval(id);
            cancelOpen = false, cancelClose = false;
          } else {
            if (cancelOpen) {
              clearInterval(id);
              cancelOpen = false, cancelClose = false;
            }
            pos++;
            sideMenu.style.left = pos + "px";
          }
        }
      }

      function animateClose() { // Menu closing animation.
        let pos = parseInt(sideMenu.style.left);
        let id = setInterval(frame, 1);

        function frame() { // Animate.
          if (pos == -180) {
            clearInterval(id);
            cancelOpen = false, cancelClose = false;
          } else {
            if (cancelClose) {
              clearInterval(id);
              cancelOpen = false, cancelClose = false;
            }
            pos--; 
            sideMenu.style.left = pos + "px";
          }
        }
      }

      function moveWith() { // Moves the side menu with the finger.
        if (parseInt(sideMenu.style.left) >= -180 && parseInt(sideMenu.style.left) <= 0)
          sideMenu.style.left = (current.clientX - sideMenu.offsetWidth) + 'px';

        if (parseInt(sideMenu.style.left) < -180) // Prevents over shoot.
          sideMenu.style.left = '-180px';

        if (parseInt(sideMenu.style.left) > 0) // Prevents over shoot.
          sideMenu.style.left = '0px';
      }
    } else {
      sideMenu.style.left = '0px';
    }
  }
}
