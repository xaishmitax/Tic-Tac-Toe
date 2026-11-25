import "./style.css";

//Element store gareko with defing type to typescript
const cells = document.querySelectorAll<HTMLButtonElement>(".cell");
const statusMessage = document.querySelector<HTMLParagraphElement>("#status");
const resetButton = document.querySelector<HTMLButtonElement>("#reset");  

//Show messages like kosko turn ho, kosle jityo..
function updateStatus(message: string): void {
    if (statusMessage) {
        statusMessage.textContent = message;
    }
}


// board ra gameover ko lagi variable define gareko
let board: (string | null)[] = [null, null, null, null, null, null, null, null, null];
let currentPlayer: "X" | "O" = "X";
let gameOver: boolean = false;


//For checking winner
function checkWinner(): string | null {
    const winningCombinations = [
        [0, 1, 2],
        [3, 4, 5],
        [6, 7, 8],
        [0, 3, 6],
        [1, 4, 7],
        [2, 5, 8],
        [0, 4, 8],
        [2, 4, 6]
    ];

    for (const combination of winningCombinations) {
        const [a, b, c] = combination;

        if (board[a] && board[a] === board[b] && board[b] === board[c]) {
            cells[a].classList.add("winner");
            cells[b].classList.add("winner");
            cells[c].classList.add("winner");

return board[a];
        }
    }

    return null;
}

function handleCellClick(index: number): void {
    if (board[index] !== null || gameOver) {
        return;
    }

    board[index] = currentPlayer;
    cells[index].textContent = currentPlayer;
    const winner = checkWinner();

if (winner) {
    gameOver = true;
    updateStatus(`Player ${winner} wins!`);
    return;
    }

if (board.every(cell => cell !== null)) {
    gameOver = true;
    updateStatus("It's a draw!");
    return;
    }

  // to switch player used ternary operator  
currentPlayer = currentPlayer === "X" ? "O" : "X";

updateStatus(`Player ${currentPlayer}'s turn`);

}
cells.forEach((cell, index) => {
    cell.addEventListener("click", () => {
        handleCellClick(index);
    });
});


// to restart the game.
function resetGame(): void {
    board = [null, null, null, null, null, null, null, null, null];
    currentPlayer = "X";
    gameOver = false;

    cells.forEach(cell => {
        cell.textContent = "";
    });

    updateStatus("Player X's turn");
}
// button banako reset ko

if (resetButton) {
    resetButton.addEventListener("click", resetGame);
}
//Start ma kosko turn bhanera define garxa

updateStatus(`Player ${currentPlayer}'s turn`);