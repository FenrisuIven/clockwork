import { init, initNode } from './entities/clock/clock.js';
import { initFloatingWindow } from "./entities/floatingWindowHandler/floatingWindowHandler.js";

const pipButton = document.getElementById('floating-window-button');

if ("documentPictureInPicture" in window) {
    pipButton.addEventListener('click', (e) => {
        initFloatingWindow().then(() => {
            e.target.disabled = true;
        });
    });
} else {
    pipButton.disabled = true;
    pipButton.style.display = "none";
}

document.getElementById('app').appendChild(initNode());

init();