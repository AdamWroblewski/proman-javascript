// It uses data_handler.js to visualize elements
import { dataHandler } from "./data_handler.js";

var boardMenus = [];

function toggle(boardsMenus){
    for(var i = boardsMenus.length - 1; i >= 0; i--){
        if(!boardsMenus[i].toggle || !boardsMenus[i].container) continue;
        boardsMenus[i].toggle.addEventListener("click", function(e){
            var event = (e)?e:window.event, button;

            if(event.target) button = event.target.parentNode;
            else if(event.srcElement) button = event.srcElement.parentNode;

            for(var j = boardMenus.length - 1; j >= 0; j--){
                if(boardMenus[j].toggle == button){
                    if(boardMenus[j].visible){
                        boardsMenus[j].container.style.display = "none";
                        boardsMenus[j].visible = false;
                    } else {
                        boardsMenus[j].container.style.display = "";
                        boardsMenus[j].visible = true;
                    }
                }
            }
        }, false);
    }
}

function getBoardCollumns(boardColumn){
    let columns = boardColumn.querySelectorAll(".board-column"), result = {newC: null, inProgress: null, testing: null, done: null},
    nodeTitle, nodeContent;
    for(var i = columns.length - 1; i >= 0; i--){
        nodeTitle = columns[i].querySelectorAll(".board-column-title");
        nodeContent = columns[i].querySelectorAll(".board-column-content");

        if(nodeTitle.length < 1 || nodeContent.length < 1) continue;

        nodeTitle = nodeTitle[0];
        nodeContent = nodeContent[0];


    }
}

export let dom = {
    cards: [],
    init: function () {
        let result, boards;// This function should run once, when the page is loaded.

        boards = document.querySelectorAll(".board");
        return boards;
    },
    loadBoards: function (boards) {
        let count = boards.length, board, n;
        for(var i = 0; i < count; i++){
            dom.cards.push({newC: null, inProgress: null, testing: null, done: null});
            boardMenus.push({addC: null, toggle: null, container: null, visible: true});


            board = boards[i];
            let elems = board.getElementsByTagName("button"), j;
            for(j = elems.length - 1; j >= 0; j--){
                if(elems[j].className == "board-add") boardMenus[i].addC = elems[j];
                else if(elems[j].className == "board-toggle") boardMenus[i].toggle = elems[j];
            }
            elems = board.querySelectorAll(".board-columns");
            if(elems.length > 0) boardMenus[i].container = elems[0];

        }

        toggle(boardMenus);
        // retrieves boards and makes showBoards called
        dataHandler.getBoards(function(boards){
            dom.showBoards(boards);
        });
    },
    showBoards: function (boards) {
        // shows boards appending them to #boards div
        // it adds necessary event listeners also

        let boardList = '';

        for(let board of boards){
            boardList += `
                <li>${board.title}</li>
            `;
        }

        const outerHtml = `
            <ul class="board-container">
                ${boardList}
            </ul>
        `;

        let boardsContainer = document.querySelectorAll('.board');
        console.log(boardsContainer)
        boardsContainer.insertAdjacentHTML("beforeend", outerHtml);
    },
    loadCards: function (boardId) {
        // retrieves cards and makes showCards called
    },
    showCards: function (cards) {
        // shows the cards of a board
        // it adds necessary event listeners also
    },
    // here comes more features
};

let createBoard = function () {

};
