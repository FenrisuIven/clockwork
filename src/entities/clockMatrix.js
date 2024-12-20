const secondsHighlight = 'highlight-sec';
const mainTimeHighlight = 'highlight-main';

export const hoursToSegmentIdx = { H1: 0, H2: 1, M1: 2, M2: 3 };
const numbersSegmentsSchemes = {
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
const getElemNode = (elemIdx) => {
    return document.getElementById(`seconds-${elemIdx}`);
}
const setElemCurrentClass = (elemNode, className) => {
    elemNode.className = className;
}
const setElemPrevClass = (elemNode, className) => {
    elemNode.dataset.prevClass = className;
}

export function highlightElem(elemIdx, type){
    const elemNode = getElemNode(elemIdx);
    let className = mainTimeHighlight;
    switch (type) {
        case 'sec': className = secondsHighlight; break;
        case 'def': className = ''; break;
        case 'res':
            const prevClassIsSet = elemNode.dataset.prevClass != null;
            setElemCurrentClass(elemNode, prevClassIsSet ? elemNode.dataset.prevClass : '');
            if (prevClassIsSet) delete elemNode.dataset.prevClass;
            return;
    }

    if (elemNode.className !== '') {
        setElemPrevClass(elemNode, elemNode.className);
    }
    setElemCurrentClass(elemNode, className);
}

export function drawSegment(segmentIdx, value) {
    const amountCellsInSegment = 15;
    const numScheme = numbersSegmentsSchemes[value].split('\n').join(' ').split(' ');
    const getElemIdx = (idxInSegment) => idxInSegment + segmentIdx * amountCellsInSegment;
    
    for (let i = 0; i < amountCellsInSegment; i++) {
        highlightElem(getElemIdx(i), 'def');
        if (numScheme[i] === '1') {
            setElemPrevClass(getElemNode(getElemIdx(i)), mainTimeHighlight);
            highlightElem(getElemIdx(i));
        }
    }
}