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

    const img = document.createElement("img");
    img.id = "latestImage";

    imgDiv.appendChild(img);

    this.mainElement.appendChild(imgDiv);

    wait("#latestImage");

    const playButton = document.createElement("button");
    playButton.type = "button";
    playButton.id = "play-btn";
    playButton.value = "Pause"
    playButton.textContent = "Pause";

    playButton.style.width = '50em'; // setting the width 
    playButton.style.height = '5em'; // setting the height 
    this.mainElement.appendChild(playButton);
   
    wait("#play-btn");

    const streaming_script = document.createElement("script");
    streaming_script.type = "text/javascript";
    streaming_script.src = "helper_scripts/client_streaming.js";

    this.mainElement.appendChild(streaming_script);
  }
}