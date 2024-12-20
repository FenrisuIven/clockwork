import { highlightElem } from './clock.js';

const hoursToSegmentIdx = { H1: 0, H2: 1, M1: 2, M2: 3 };
const matrixDrawnNumbers = {
    0: `1 1 1 1 1\n1 0 0 0 1\n1 1 1 1 1`,
    1: `1 0 0 0 1\n1 1 1 1 1\n0 0 0 0 1`,
    2: `1 0 1 1 1\n1 0 1 0 1\n1 1 1 0 1`,
    3: `1 0 1 0 1\n1 0 1 0 1\n1 1 1 1 1`,
    4: `1 1 1 0 0\n0 0 1 0 0\n1 1 1 1 1`,
    5: `1 1 1 0 1\n1 0 1 0 1\n1 0 1 1 1`,
    6: `1 1 1 1 1\n1 0 1 0 1\n1 0 1 1 1`,
    7: `1 0 0 0 0\n1 0 1 1 1\n1 1 0 0 0`,
    8: `1 1 1 1 1\n1 0 1 0 1\n1 1 1 1 1`,
    9: `1 1 1 0 0\n1 0 1 0 0\n1 1 1 1 1`
};
const timeProxy = new Proxy({ H1: null, H2: null, M1: null, M2: null }, {
    set (obj, prop, val) {
        if (obj[prop] !== val) {
            console.log(prop, obj[prop], val);
            obj[prop] = val;
            drawSegment(hoursToSegmentIdx[prop], val, true);
        }
        return true;
    }
});

function updateLocalTimer() {
    const [ hours, minutes ] = new Date().toLocaleTimeString('uk-GB').split(':');
    const vals = [...hours.split(''), ...minutes.split('')];
    Object.keys(timeProxy).forEach((propName, idx) => timeProxy[propName] = vals[idx]);
}

export function updateMatrix() {
    updateLocalTimer();
}

function drawSegment(segmentIdx, value, main) {
    const numScheme = matrixDrawnNumbers[value].split('\n').join(' ').split(' ');
    const prevNumScheme = matrixDrawnNumbers[value - 1 === -1 ? 9 : value - 1].split('\n').join(' ').split(' ');
    for (let i = 0; i < 15; i++) {
        if (prevNumScheme[i] === '1') {
            highlightElem(i + segmentIdx * 15, 'res');
        }
        if (numScheme[i] === '1') {
            highlightElem(i + segmentIdx * 15, main ? 'main' : '');
        }
    }
}