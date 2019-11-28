import { dom } from "./dom.js";

// This function is to initialize the application
function init() {
    // init data
    var boards = dom.init();
    // loads the boards to the screen
    dom.loadBoards(boards);

}

init();
