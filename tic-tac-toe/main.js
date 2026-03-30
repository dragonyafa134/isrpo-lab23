const cell = document.querySelectorAll(".cell");
const statusText = document.getElementById("status");
const restartBtn = document.getElementById("restart");

let currentPlayer = "X";
let board = ["", "", "", "", "", "", "", "", ""];
let gameActive = true;

const winConditions = [
    [0,1,2],
    [3,4,5],
    [6,7,8],
    [0,3,6],
    [1,4,7],
    [2,5,8],
    [0,4,8],
    [2,4,6],
];

cell.forEach((cell) => {
    cell.addEventListener("click", handleCellClick);
});

restartBtn.addEventListener("click", restartGame);

function handleCellClick(event){
    const cell = event.target;
    const index  = cell.getAttribute("data-index");
    if (board[index] !== "" || !gameActive) {
        return;
    }

    board[index] = currentPlayer;
    cell.textContent = currentPlayer;

    checkResult();
}

function checkResult() {
    let roundWon = false;

    for (let i = 0; i < winConditions.length; i++){
        const [a, b, c] = winConditions[i];

        if (board[a] && board[a] === board[b] && board[a] === board[c]){
            roundWon = true;
            break;
        }

        if (roundWon) {
            statusText.textContent = `Игрок ${currentPlayer} победил!`;
            gameActive = false;
            return;
        }

        if (!board.includes("")){
            statusText.textContent = "Ничья!";
            gameActive = false;
            return;
        }
    }
    currentPlayer = currentPlayer === "X" ? "0" : "X";
    statusText.textContent = `Ход игрока ${currentPlayer}`;
}

function restartGame() {
    currentPlayer = "X";
    board = ["", "", "", "", "", "", "", "", ""];
    gameActive = true;
    statusText.textContent = "Ход игрока Х";

    cell.forEach((cell) => {
        cell.textContent = "";
    });
}