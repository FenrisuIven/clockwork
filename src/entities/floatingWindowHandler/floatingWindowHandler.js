import { clockNode } from "../clock/clock.js";
import { createNode } from "../../helpers/createNode.js";

export let floatingWindowEnabled = false;
export let floatingWindowObject = null;

const floatingWindowConfig = {
    width: 720,
    height: 360,
    preferInitialWindowPlacement: true
};

export async function initFloatingWindow() {
    floatingWindowEnabled = true;
    let floatingWin = await documentPictureInPicture.requestWindow(floatingWindowConfig);

    let style = createNode("link");
    style.rel = "stylesheet";
    style.href = document.styleSheets[0].href;

    const clockContainer = createNode('div', { 
        id: 'app', 
        children: [ clockNode ] 
    });
    
    floatingWin.document.head.append(style);
    floatingWin.document.body.append(clockContainer);
    floatingWin.addEventListener("pagehide", disableFloatingWindow);
    
    floatingWindowObject = floatingWin;
}

function disableFloatingWindow() {
    floatingWindowEnabled = false;
    floatingWindowObject = null;
    document.getElementById('app').appendChild(clockNode);
    document.getElementById('floating-window-button').disabled = false;
}