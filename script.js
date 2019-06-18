let turn = 'X';
let winner = null;

//Function add on click listener for each cell and initialize the board
window.onload = function () {
    const squares = document.getElementsByClassName('square');
    for (let element of squares) {
        element.addEventListener('click', function () {
            nextMove(element);
        });
    }

    const restartButton = document.getElementById('restart');
    restartButton.addEventListener('click', startGame);

    startGame();
};

//Function initialize the board or reset game to play again
function startGame() {
    for (let index = 1; index <= 9; index++) {
        clearBox(index);
    }

    turn = 'X';
    winner = null;

    setMessage(`${turn} start the game`);
}

//Sets the message about state the game
function setMessage(msg) {
    document.getElementById("message").innerText = msg;
}

//Function stop the game if someone already won or change the text color according to the turn
function nextMove(square) {
    if (winner !== null) {
        setMessage(`${winner} already won`)
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
