// Mobile Side Bar Swipe Functionality

window.onload = function() {
  
  var sideMenu = document.getElementById('side-menu');
  var touchStart;
  var touchEnd;
  var lastMove = null;
  
  sideMenu.addEventListener('touchend', function(ev){
    touchEnd = lastMove;

    if ( touchStart.pageX - touchEnd.pageX > 1)
      sideMenu.style.left = '-160px';
  
    if ( touchStart.pageX - touchEnd.pageX < 1)
      sideMenu.style.left = '0px';
  })

  sideMenu.addEventListener('touchstart', function(ev){
    touchStart = ev.targetTouches[0];
  })

  sideMenu.addEventListener('touchmove', function(ev){
    var touchLocation = ev.targetTouches[0];
    lastMove = touchLocation;
  })
}