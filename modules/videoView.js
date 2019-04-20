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

    const imgDiv = document.createElement('div');
    imgDiv.class = "text-center h-25 d-inline-block";

    const img = document.createElement("img");
    img.class = "rounded mx-auto d-block img-responsive";
    img.id = "latestImage";

    imgDiv.appendChild(img);

    this.mainElement.appendChild(imgDiv);

    wait("#latestImage");

    const playButton = document.createElement("button");
    playButton.type = "button";
    playButton.class = "btn btn-danger btn-block";
    playButton.id = "play-btn";

    const symbol = document.createElement("span");
    symbol.class = "glyphicon glyphicon-pause";
    symbol.id = "play-pause";

    playButton.appendChild(symbol);

    this.mainElement.appendChild(playButton);
   
    wait("#play-btn");

    const streaming_script = document.createElement("script");
    streaming_script.type = "text/javascript";
    streaming_script.src = "helper_scripts/client_streaming.js";

    this.mainElement.appendChild(streaming_script);
  }
}