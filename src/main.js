import { init, initNode } from './entities/clock/clock.js';
import { initPiP } from "./entities/pipHandler/pipHandler.js";

document.getElementById('pip-button').addEventListener('click', initPiP);
document.getElementById('app').appendChild(initNode());

init();