// Totally unnecessary, but totally awesome!

if (!window.performance || !window.performance.now) {
  Date.now || (Date.now = function () {
      return new this().getTime();
  });

  (window.performance || (window.performance = {})).now = function () {
      return Date.now() - offset;
  };

  var offset = (window.performance.timing || (window.performance.timing = {})).navigatorStart || (window.performance.timing.navigatorStart = Date.now());
}

function loop() {
  var i, n, s = '';
  for (i = 0; i < 10; i++) {
      n = Math.floor(Math.sin((performance.now()/200) + (i/2)) * 4) + 4;

      s += String.fromCharCode(0x2581 + n);
  }
  document.title = "Smart Lock  |" + s;
  setTimeout(loop, 50);
}

window.addEventListener('load', loop);