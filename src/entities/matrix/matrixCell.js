import {
    mainTimeHighlight, secondsHighlight
} from "./clockMatrix.js";
import {
    floatingWindowEnabled, floatingWindowObject
} from "../floatingWindowHandler/floatingWindowHandler.js";

export class MatrixCell {    
    static getElemIdx(idxInSegment, segmentIdx, amountCellsInSegment){
        return idxInSegment + segmentIdx * amountCellsInSegment
    }
    static getElemNode(elemIdx) {
        if (floatingWindowEnabled) {
            return floatingWindowObject.document.getElementById(`seconds-${elemIdx}`) || document.getElementById(`seconds-${elemIdx}`);
        }
        return document.getElementById(`seconds-${elemIdx}`);
    }
    static setElemCurrentClass(elemIdx, className) {
        this.getElemNode(elemIdx).className = className;
        return this.getElemNode(elemIdx);
    }
    static setElemPrevClass(elemIdx, className) {
        this.getElemNode(elemIdx).dataset.prevClass = className;
    }
    static highlightElem(elemIdx, type){
        const elemNode = MatrixCell.getElemNode(elemIdx);
        
        const prevClassIsSet = elemNode.dataset.prevClass !== '';
        const currClassIsMain = elemNode.className === mainTimeHighlight;
        
        let currentClass = null;
        let prevClass = null;
        
        switch (type) {
            case 'res': {
                if (prevClassIsSet) {
                    MatrixCell.setElemCurrentClass(elemIdx, elemNode.dataset.prevClass);
                    delete elemNode.dataset.prevClass;
                    return;
                }
                currentClass = '';
            } break;
            default: {
                prevClass = currClassIsMain ? mainTimeHighlight : '';
                currentClass = type === 'sec' ? secondsHighlight : mainTimeHighlight;
            } break;
        }
        
        if (prevClass != null) {
            MatrixCell.setElemPrevClass(elemIdx, prevClass);
        }
        if (currentClass != null) {
            MatrixCell.setElemCurrentClass(elemIdx, currentClass);
        }
    }
}