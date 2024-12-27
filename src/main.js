import { init, initNode } from './entities/clock/clock.js';
import { initPiP } from "./entities/pipHandler/pipHandler.js";

document.getElementById('pip-button').addEventListener('click', (e) => {
    initPiP().then(() => {
        e.target.disabled = true;
    });
});
document.getElementById('app').appendChild(initNode());

init();