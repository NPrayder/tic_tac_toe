let turn = 'X';
let winner = null;
let isDraw = false;

//Function add on click listener for each cell and initialize the board
window.addEventListener('DOMContentLoaded', () => {
    const squares = document.querySelectorAll('.square');
    squares.forEach(element => {
        element.addEventListener('click', () => nextMove(element));
    });

    const restartButton = document.getElementById('restart');
    restartButton.addEventListener('click', startGame);

    startGame();
});

//Function initialize the board or reset game to play again
function startGame() {
    for (let index = 1; index <= 9; index++) {
        clearBox(index);
    }

    turn = 'X';
    winner = null;
    isDraw = false;

    setMessage(`${turn} start the game`);
}

//Sets the message about state the game
function setMessage(msg) {
    document.getElementById("message").innerText = msg;
}

//Function stop the game if someone already won or change the text color according to the turn
function nextMove(square) {
    if (winner) {
        setMessage(`${winner} already won`)
    } else if (isDraw) {
        setMessage(`You have a draw`);
    } else if (square.innerText === '') {
        if (turn === 'X') {
            square.style.color = "red";
        } else {
            square.style.color = "black";
        }
        square.innerText = turn;
        switchTurn();
    } else {
        setMessage("Choose another cell")
    }
}

//Change player turn
function switchTurn() {
    if (checkForWinner(turn)) {
        setMessage(`${turn} wins!!!`);
        winner = turn;
    } else if (checkForDraw()) {
        isDraw = true;
        setMessage(`You have a draw`);
    } else {
        turn = turn === 'X' ? 'O' : 'X';
        setMessage(`${turn}'s turn`);
    }
}

//Check if someone has won
function checkForWinner(move) {
    let result = false;
    if (checkRow(1, 2, 3, move) ||
        checkRow(4, 5, 6, move) ||
        checkRow(7, 8, 9, move) ||
        checkRow(1, 4, 7, move) ||
        checkRow(2, 5, 8, move) ||
        checkRow(3, 6, 9, move) ||
        checkRow(1, 5, 9, move) ||
        checkRow(3, 5, 7, move)) {
        result = true;
    }

    return result;
}

//If all cells have X or O and we don't have winner then we have a draw
function checkForDraw() {
    for (let index = 1; index <= 9; index++) {
        if (!document.getElementById('s' + index).innerText) {
            return false;
        }
    }

    return true;
}

//Check whether the values in the cells are the same
function checkRow(a, b, c, move) {
    return getBox(a) === move && getBox(b) === move && getBox(c) === move;
}

//Getting value from the cell
function getBox(number) {
    return document.getElementById("s" + number).innerText;
}

//Clearing cell when we start the game over
function clearBox(number) {
    document.getElementById("s" + number).innerText = '';
}
