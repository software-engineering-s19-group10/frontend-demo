// Mobile Side Bar Swipe Functionality
// IMPORTANT NOTE: When using the inspector view, will not update between mobile/desktop unless REFRESH!

window.onload = function() {

  function isMobileDevice() { // Checks if 'window.orientation' exists
    return (typeof window.orientation !== "undefined") || (navigator.userAgent.indexOf('IEMobile') !== -1);
  }; console.log("Mobile:", isMobileDevice()); 

  if (isMobileDevice()){ // Only works for mobile devices

    var main = document.getElementById('main-view');
    var sideMenu = document.getElementById('side-menu');
    var touchStart, touchEnd;

    // Main view default position when loaded in mobile view (NEED FIX : ONLY CHANGES 1 OF THE MODULES)
    main.style.left = '-180px';
    main.style.position = 'relative';
    main.style.zIndex = '-1'; // Behind the side menu
    main.style.width = '300px'; // Set width. (NEED FIX: SHOULD FILL ENTIRE WIDTH)

    // Side menu default position when loaded in mobile view
    sideMenu.style.left = '-180px'; 

    sideMenu.addEventListener('touchend', function(ev) {

      if ( touchStart.pageX - touchEnd.pageX < 1) { // Menu Open
        
        let pos = parseInt(sideMenu.style.left); // Current position
        let id = setInterval(frame, 1);

        function frame() { // Animation Open
          if (pos == 0) {
            clearInterval(id);
          } else {
            pos++;
            sideMenu.style.left = pos + "px";
          }
        }
      }

      if ( touchStart.pageX - touchEnd.pageX > 1) { // Menu Close

        let pos = parseInt(sideMenu.style.left); // Current position
        let id = setInterval(frame, 1);

        function frame() { // Animation Close
          if (pos == -180) {
            clearInterval(id);
          } else {
            pos--; 
            sideMenu.style.left = pos + "px";
          }
        }
      }
    })

    sideMenu.addEventListener('touchstart', function(ev) { // Get start touch position
      touchStart = ev.targetTouches[0];
    })

    sideMenu.addEventListener('touchmove', function(ev) { // Get current touch position
      touchEnd = ev.targetTouches[0]; // Updates touchEnd with current touch position until let go

      // Moves the side menu with the finger.
      if (parseInt(sideMenu.style.left) >= -180 && parseInt(sideMenu.style.left) <= 0)
        sideMenu.style.left = (touchEnd.clientX - sideMenu.offsetWidth) + 'px';

      if (parseInt(sideMenu.style.left) < -180) // Detects over shoot and corrects it
        sideMenu.style.left = '180px';

      if (parseInt(sideMenu.style.left) > 0) // Detects over shoot and corrects it
        sideMenu.style.left = '0px';
    })
  }
}