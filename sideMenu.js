// Mobile Side Bar Swipe Functionality
// IMPORTANT NOTE: When using the inspector view, will not update between mobile/desktop unless REFRESH!

window.onload = function() {

  function isMobileDevice() { // Checks if 'window.orientation' exists
    return (typeof window.orientation !== "undefined") || (navigator.userAgent.indexOf('IEMobile') !== -1);
  }; console.log("Mobile:", isMobileDevice()); 

  if (isMobileDevice()){ // Mobile only!
    var sideMenu = document.getElementById('side-menu');
    var items = document.getElementById('view-items');
    var current, cancelAnimation;

    // Side menu default position when loaded in mobile view
    sideMenu.style.left = '-180px';

    sideMenu.addEventListener('touchend', function(ev) { // End touch event listener
      cancelAnimation = false;

      if (parseInt(sideMenu.style.left) > -90) // Opens menu when moved to over 50%
        animateOpen();

      if (parseInt(sideMenu.style.left) <= -90) // Closes menu when moved to under 50%
        animateClose();
    })

    sideMenu.addEventListener('touchmove', function(ev) { // Active touch event listener
      current = ev.targetTouches[0]; // Updates current touch position
      
      window.requestAnimationFrame(moveWithFinger);
      cancelAnimation = true;
    })

    items.addEventListener('click', function() {
      animateClose();
    })
  }

  function animateOpen() { // Menu opening animation
    let pos = parseInt(sideMenu.style.left);
    let id = setInterval(frame, 1);

    function frame() { // Animate
      if (pos == 0) {
        clearInterval(id);
      } else {
        if (cancelAnimation) {
          clearInterval(id);
        }
        pos++;
        sideMenu.style.left = pos + "px";
      }
    }
  }

  function animateClose() { // Menu closing animation
    let pos = parseInt(sideMenu.style.left);
    let id = setInterval(frame, 1);
  
    function frame() { // Animate
      if (pos == -180) {
        clearInterval(id);
      } else {
        if (cancelAnimation) {
          clearInterval(id);
        }
        pos--; 
        sideMenu.style.left = pos + "px";
      }
    }
  }

  function moveWithFinger() { // Moves the side menu with the finger.
    if (parseInt(sideMenu.style.left) >= -180 && parseInt(sideMenu.style.left) <= 0)
      sideMenu.style.left = (current.clientX - sideMenu.offsetWidth) + 'px';

    if (parseInt(sideMenu.style.left) < -180) // Prevents over shoot
      sideMenu.style.left = '-180px';

    if (parseInt(sideMenu.style.left) > 0) // Prevents over shoot
      sideMenu.style.left = '0px';
  }
}
