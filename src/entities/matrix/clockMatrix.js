import { MatrixCell } from "./matrixCell.js";

export const secondsHighlight = 'highlight-sec';
export const mainTimeHighlight = 'highlight-main';

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

export function drawSegment(segmentIdx, value) {
    const amountCellsInSegment = 15;
    const numScheme = numbersSegmentsSchemes[value].split('\n').join(' ').split(' ');
    
    for (let i = 0; i < amountCellsInSegment; i++) {
        MatrixCell.setElemCurrentClass(MatrixCell.getElemIdx(i, segmentIdx, amountCellsInSegment), '');
        MatrixCell.setElemPrevClass(MatrixCell.getElemIdx(i, segmentIdx, amountCellsInSegment), '');
        if (numScheme[i] === '1') {
            MatrixCell.setElemCurrentClass(MatrixCell.getElemIdx(i, segmentIdx, amountCellsInSegment), mainTimeHighlight);
            MatrixCell.setElemPrevClass(MatrixCell.getElemIdx(i, segmentIdx, amountCellsInSegment), mainTimeHighlight);
        }
    }   
}