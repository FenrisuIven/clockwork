import { getCurrentTime } from "../../helpers/currentTime.js";

setInterval(() => {
    const seconds = getCurrentTime().seconds;
    postMessage({
        msg: 'highlightELem',
        elemIdx: seconds - 1 === -1 ? 59 : seconds - 1,
        type: 'res'
    });
    postMessage({
        msg: 'highlightELem',
        elemIdx: seconds - 0,
        type: 'sec'
    });
    if (seconds - 0 === 0) {
        postMessage({
            msg: 'updateLocalTimer'
        });
    }
},1000);