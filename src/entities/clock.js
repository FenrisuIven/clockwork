import { createNode } from "./createNode.js";
import { updateMatrix } from "./clockMatrix.js";

const secHighlightClass = 'highlight-sec';
const mainHighlightClass = 'highlight-main';

export function init() {
    updateMatrix();
    setTimeout(runTickHandler, 1000 - new Date().getMilliseconds());
}

export function initNode() {
    const div = createNode('div', { className: 'clock' });
    const secondsStep = 15;
    for (let section = 0; section < 4; section++){
        const sectionDiv = createNode('div', {className: 'section'});
        Array.from({length: secondsStep})
            .map((elem,idx) => elem = idx + secondsStep * section)
            .forEach(elem => {
                const innerText = elem < 10 ? `0${elem}` : elem;
                const secondsDiv = createNode('span',{ id: `seconds-${elem}`, innerText});
                sectionDiv.appendChild(secondsDiv);
            })
        div.appendChild(sectionDiv);
    }
    return div;
}

function runTickHandler() {
    setInterval(() => {
        const seconds = new Date().toLocaleTimeString('uk-GB').split(':')[2];
        highlightElem(seconds - 1 === -1 ? 59 : seconds - 1, 'res');
        highlightElem(seconds - 0, 'sec');
        if (seconds - 0 === 0) updateMatrix();
        
    },1000);
}

export function highlightElem(elemIdx, type){
    const elemNode = document.getElementById(`seconds-${elemIdx}`);
    let className = mainHighlightClass;
    switch (type) {
        case 'main': elemNode.dataset.prevClass = mainHighlightClass; break;
        case 'sec': className = secHighlightClass; break;
        case 'def': className = ''; break;
        case 'res':
            if (elemNode.dataset.prevClass) {
                elemNode.className = elemNode.dataset.prevClass;
                delete elemNode.dataset.prevClass;
            }
            else elemNode.className = '';
            return;
    }
    
    if (elemNode.className === '') elemNode.className = className;
    else {
        elemNode.dataset.prevClass = elemNode.className;
        elemNode.className = className;
    }
}