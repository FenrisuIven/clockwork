const secHighlightClass = 'highlight-sec';
const mainHighlightClass = 'highlight-main';

export const hoursToSegmentIdx = { H1: 0, H2: 1, M1: 2, M2: 3 };
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
            } else {
                elemNode.className = '';
            }
            return;
    }

    if (elemNode.className === '') {
        elemNode.className = className;
    } else {
        elemNode.dataset.prevClass = elemNode.className;
        elemNode.className = className;
    }
}

export function drawSegment(segmentIdx, value, main) {
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