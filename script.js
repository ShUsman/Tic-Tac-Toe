const cells = document.querySelectorAll(".cell");
const gameStatus = document.querySelector('#gameStatus');
const restartBtn = document.querySelector('#restartBtn');
const startBtn = document.querySelector('#start-game');

const forWin = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6]
]

let gameBoard = ["", "", "", "", "", "", "", "", ""];


let currentPlayer = "X";
let running = false;

startBtn.addEventListener("click", startGame);

function startGame() {
    document.querySelector('.game-hiden').style.display = 'flex';
    document.querySelector('.header').style.display = 'none';
    document.querySelector('.main').style.display = 'none';
    document.querySelector('.players').style.display = 'none';
    startBtn.style.display = 'none';
    gameStatus.textContent = `${currentPlayer}'s turn`;
    cells.forEach(cell => cell.addEventListener("click", cellClick));
    restartBtn.addEventListener("click", restartGame);
    running = true;
}

function cellClick() {
    const cellIndex = this.getAttribute('cellIndex');

    if(gameBoard[cellIndex] != "" || !running){
        return;
    }

    updateCell(this, cellIndex);
    checkWinner();
}

function updateCell(cell, index) {
    gameBoard[index] = currentPlayer;
    cell.textContent = currentPlayer;

}

function changePlayer() {
    currentPlayer = (currentPlayer == "X") ? "O" : "X";
    gameStatus.textContent = `${currentPlayer}'s turn`;
}

function checkWinner() {
    let roundWon = false;
   

    for(let i = 0; i < forWin.length; i++){
        const condition = forWin[i];
        const cellA = gameBoard[condition[0]];
        const cellB = gameBoard[condition[1]];
        const cellC = gameBoard[condition[2]];

        if(cellA == "" || cellB == "" || cellC == ""){
            continue;
        }
        if(cellA == cellB && cellB == cellC){
            roundWon = true;
            break;
        }
    }

    if (roundWon){
        gameStatus.textContent = `${currentPlayer} win!`;
        running = false;
    }
    else if(!gameBoard.includes("")){
        gameStatus.textContent = `Draw`
        running = false;
    } else {
        changePlayer();
    }

}

function restartGame() {
    currentPlayer = "X";
    gameBoard = ["", "", "", "", "", "", "", "", ""];
    gameStatus.textContent = `${currentPlayer}'s turn`;
    cells.forEach(cell => cell.textContent = "");
    running = true;
}