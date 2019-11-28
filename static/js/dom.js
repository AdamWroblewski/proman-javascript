// It uses data_handler.js to visualize elements
import { dataHandler } from "./data_handler.js";

export let dom = {
    init: function () {
        let result, boards;// This function should run once, when the page is loaded.

        boards = document.querySelectorAll(".board");
        return boards;
    },
    loadBoards: function (boards) {
        let cards = [], i, count = boards.length;
        for(i = 0; i < count; i++){
            cards.push({newC: [], inProgress: [], testing: [], done: []});


        }
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
