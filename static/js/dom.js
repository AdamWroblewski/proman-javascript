// It uses data_handler.js to visualize elements
import { dataHandler } from "./data_handler.js";

var boardMenus = [];

function typeCardTitle(e){
    var event = (e)?e:window.event, input;

    if(event.target) input = event.target;
    else if(event.srcElement) input = event.srcElement;

    if(input.value.length < 1 || event.keyCode !== 13) return;

    let parentDiv = input.parentNode, text = input.value;
    parentDiv.removeChild(input);
    parentDiv.appendChild(document.createTextNode(text) );
}

function createCard(container, text){
    var cardNode = document.createElement("div"), node = document.createElement("div");
    cardNode.className = "card";

    node.className = "card-remove";
    let elem = document.createElement("i");
    elem.className = "fas fa-trash-alt";
    elem.addEventListener("click", function(){
        cardNode.parentNode.removeChild(cardNode);
    }, false);
    node.appendChild(elem);

    cardNode.appendChild(node);

    node = document.createElement("div");
    node.className = "card-title";
    cardNode.appendChild(node);

    if(dom.isString(text) ){
        node.appendChild(document.createTextNode(text) );
    } else {
        elem = document.createElement("input");
        elem.type = "text";
        node.appendChild(elem);
        elem.addEventListener("keyup", typeCardTitle, false);
    }

    container.appendChild(cardNode);
}

function addCard(e){
    var event = (e)?e:window.event, button;

    if(event.target) button = event.target;
    else if(event.srcElement) button = event.srcElement;

    for(var i = boardMenus.length - 1; i >= 0; i--){
        if(boardMenus[i].addC == button){
            createCard(dom.cards[i].newC, false);
        }
    }
}

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
    nodeTitle, nodeContent, header;
    for(var i = columns.length - 1; i >= 0; i--){
        nodeTitle = columns[i].querySelectorAll(".board-column-title");
        nodeContent = columns[i].querySelectorAll(".board-column-content");

        if(nodeTitle.length < 1 || nodeContent.length < 1) continue;

        nodeTitle = nodeTitle[0];
        nodeContent = nodeContent[0];

        header = nodeTitle.innerHTML.toLowerCase();
        if(header == "new") result.newC = nodeContent;
        else if(header == "in progress") result.inProgress = nodeContent;
        else if(header == "testing") result.testing = nodeContent;
        else if(header == "done") result.done = nodeContent;
    }

    return result;
}

function binsAddEvent(container){
    let bins = container.querySelectorAll(".card-remove");
    for(var i = bins.length - 1; i >= 0; i--){
        bins[i].addEventListener("click", function(){
            let that = this, cardNode = that.parentNode;
            cardNode.parentNode.removeChild(cardNode);
        }, false);
    }
}

// - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -

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
            boardMenus.push({addC: null, toggle: null, container: null, visible: true});


            board = boards[i];
            let elems = board.getElementsByTagName("button"), j;
            for(j = elems.length - 1; j >= 0; j--){
                if(elems[j].className == "board-add"){
                    boardMenus[i].addC = elems[j];
                    boardMenus[i].addC.addEventListener("click", addCard, false);
                } else if(elems[j].className == "board-toggle") boardMenus[i].toggle = elems[j];
            }
            elems = board.querySelectorAll(".board-columns");
            if(elems.length > 0){
                boardMenus[i].container = elems[0];
                elems = getBoardCollumns(boardMenus[i].container);
                binsAddEvent(boardMenus[i].container);
            } else elems = {newC: null, inProgress: null, testing: null, done: null};

            dom.cards.push(elems);
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
    isString: function(str){
        var result = false;
        if( typeof str == "string" || (typeof st == "object" && st.constructor === String) ) result = true;
        if(result === true && str.length == 0) result = false;
        return result;
    }
};

let createBoard = function () {

};
