const board = Array(9).fill(null);
const cells = document.querySelectorAll(".cell");
const statusDisplay = document.getElementById("status");
const restartBtn = document.getElementById("restart-btn");
const toggleModeBtn = document.getElementById("toggle-mode-btn");

let currentPlayer = "X";
let isGameActive = true;
let isAIMode = false;

const winningCombinations = [
    [0, 1, 2], [3, 4, 5], [6, 7, 8],
    [0, 3, 6], [1, 4, 7], [2, 5, 8],
    [0, 4, 8], [2, 4, 6]
];

function checkWin() {
    for (const combo of winningCombinations) {
        const [a, b, c] = combo;
        if (board[a] && board[a] === board[b] && board[a] === board[c]) {
            return board[a];
        }
    }
    return board.includes(null) ? null : "Draw";
}

function updateStatus() {
    const winner = checkWin();
    if (winner) {
        isGameActive = false;
        statusDisplay.textContent = winner === "Draw" ? "It's a draw!" : `${winner} wins!`;
    } else {
        statusDisplay.textContent = `${currentPlayer}'s turn`;
    }
}

function aiMove() {
    if (!isGameActive) return;
    const emptyIndices = board.map((cell, index) => (cell === null ? index : null)).filter(i => i !== null);
    const randomIndex = emptyIndices[Math.floor(Math.random() * emptyIndices.length)];
    makeMove(randomIndex);
}

function makeMove(index) {
    if (!isGameActive || board[index]) return;

    board[index] = currentPlayer;
    cells[index].textContent = currentPlayer;
    cells[index].classList.add("taken");

    if (checkWin()) {
        updateStatus();
        return;
    }

    currentPlayer = currentPlayer === "X" ? "O" : "X";
    updateStatus();

    if (isAIMode && currentPlayer === "O") {
        setTimeout(aiMove, 500);
    }
}

function resetGame() {
    board.fill(null);
    cells.forEach(cell => {
        cell.textContent = "";
        cell.classList.remove("taken");
    });
    currentPlayer = "X";
    isGameActive = true;
    updateStatus();
}

function toggleMode() {
    isAIMode = !isAIMode;
    toggleModeBtn.textContent = isAIMode ? "Switch to 2-Player Mode" : "Switch to AI Mode";
    resetGame();
}

cells.forEach((cell, index) => cell.addEventListener("click", () => makeMove(index)));
restartBtn.addEventListener("click", resetGame);
toggleModeBtn.addEventListener("click", toggleMode);

// Initialize game
updateStatus();
