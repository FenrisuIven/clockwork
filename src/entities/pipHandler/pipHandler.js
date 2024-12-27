import { clockNode } from "../clock/clock.js";
import { createNode } from "../../helpers/createNode.js";

export let pipEnabled = false;

export let pipWindow = null;

export async function initPiP() {
    pipEnabled = true;
    let options = {
        width: 720,
        height: 360,
        preferInitialWindowPlacement: true
    };
    let pipWin = await documentPictureInPicture.requestWindow(options);

    let style = document.createElement("link");
    style.rel = "stylesheet";
    style.href = document.styleSheets[0].href;

    const container = createNode('div', {id: 'app'});
    container.appendChild(clockNode);
    
    pipWin.document.head.append(style);
    pipWin.document.body.append(container);
    
    pipWin.addEventListener("pagehide", function () {
        pipEnabled = false;
        pipWindow = null;
        document.getElementById('app').appendChild(clockNode);
        document.getElementById('pip-button').disabled = false;
    });
    
    pipWindow = pipWin;
}