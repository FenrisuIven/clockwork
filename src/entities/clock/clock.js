import { createNode } from "../../helpers/createNode.js";
import { getCurrentTime } from "../../helpers/currentTime.js";
import { MatrixCell } from "../matrix/matrixCell.js";
import { 
    drawSegment, hoursToSegmentIdx 
} from "../matrix/clockMatrix.js";
import ClockWorker from './clockWorker?worker';

export function init() {
    updateLocalTimer();
    setTimeout(initWorker, 1000 - new Date().getMilliseconds());
}

function initWorker() {
    const worker = new ClockWorker();
    worker.onmessage = (e) => workerMessageHandler(e.data);
}

function workerMessageHandler(data) {
    if (data.msg) {
        switch (data.msg) {
            case 'highlightELem':
                MatrixCell.highlightElem(data.elemIdx, data.type);
                break;
            case 'updateLocalTimer':
                updateLocalTimer();
                break;
        }
    }
}

export function updateLocalTimer() {
    const { hours, minutes } = getCurrentTime();
    const vals = [...hours.split(''), ...minutes.split('')];
    Object.keys(timeProxy).forEach((propName, idx) => timeProxy[propName] = vals[idx]);
}

export function initNode() {
    const div = createNode('div', { className: 'clock' });
    const secondsStep = 15;
    for (let section = 0; section < 4; section++){
        const sectionDiv = createNode('div', {className: 'section'});
        Array.from({length: secondsStep})
            .map((elem,idx) => idx + secondsStep * section)
            .forEach(elem => {
                const innerText = elem < 10 ? `0${elem}` : elem;
                const secondsDiv = createNode('span',{ id: `seconds-${elem}`, innerText});
                sectionDiv.appendChild(secondsDiv);
            })
        div.appendChild(sectionDiv);
    }
    return div;
}

export const timeProxy = new Proxy({ H1: null, H2: null, M1: null, M2: null }, {
    set (obj, prop, val) {
        if (obj[prop] !== val) {
            console.log(prop, obj[prop], val);
            obj[prop] = val;
            drawSegment(hoursToSegmentIdx[prop], val, true);
        }
        return true;
    }
});