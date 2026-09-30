// Tic-Tac-Toe - two players on the same screen

const cells = document.querySelectorAll(".cell");
const statusText = document.getElementById("status");
const restartBtn = document.getElementById("restart");
const resetScoreBtn = document.getElementById("resetScore");

const scoreXText = document.getElementById("scoreX");
const scoreOText = document.getElementById("scoreO");
const scoreDrawText = document.getElementById("scoreDraw");

// all the possible ways to win (indexes of the cells)
const winPatterns = [
  [0, 1, 2],
  [3, 4, 5],
  [6, 7, 8],
  [0, 3, 6],
  [1, 4, 7],
  [2, 5, 8],
  [0, 4, 8],
  [2, 4, 6]
];

let board = ["", "", "", "", "", "", "", "", ""];
let currentPlayer = randomPlayer();
let gameOver = false;

let scoreX = 0;
let scoreO = 0;
let scoreDraw = 0;

// randomly decide who goes first
function randomPlayer() {
  if (Math.random() < 0.5) {
    return "X";
  }
  return "O";
}

function handleClick(event) {
  const index = event.target.dataset.index;

  // ignore the click if the cell is taken or the game already ended
  if (board[index] !== "" || gameOver) {
    return;
  }

  board[index] = currentPlayer;
  event.target.textContent = currentPlayer;
  event.target.classList.add(currentPlayer.toLowerCase());

  checkResult();
}

function checkResult() {
  for (let i = 0; i < winPatterns.length; i++) {
    const [a, b, c] = winPatterns[i];

    if (board[a] !== "" && board[a] === board[b] && board[a] === board[c]) {
      cells[a].classList.add("win");
      cells[b].classList.add("win");
      cells[c].classList.add("win");

      statusText.textContent = "Player " + currentPlayer + " wins!";
      gameOver = true;

      if (currentPlayer === "X") {
        scoreX++;
      } else {
        scoreO++;
      }
      updateScore();
      return;
    }
  }

  // no empty cells left and nobody won
  if (!board.includes("")) {
    statusText.textContent = "It's a draw!";
    gameOver = true;
    scoreDraw++;
    updateScore();
    return;
  }

  // switch turns
  currentPlayer = currentPlayer === "X" ? "O" : "X";
  statusText.textContent = "Player " + currentPlayer + "'s turn";
}

function updateScore() {
  scoreXText.textContent = scoreX;
  scoreOText.textContent = scoreO;
  scoreDrawText.textContent = scoreDraw;
}

function restartGame() {
  board = ["", "", "", "", "", "", "", "", ""];
  currentPlayer = randomPlayer();
  gameOver = false;
  statusText.textContent = "Player " + currentPlayer + "'s turn";

  cells.forEach(function (cell) {
    cell.textContent = "";
    cell.classList.remove("x", "o", "win");
  });
}

function resetScore() {
  scoreX = 0;
  scoreO = 0;
  scoreDraw = 0;
  updateScore();
  restartGame();
}

cells.forEach(function (cell) {
  cell.addEventListener("click", handleClick);
});

restartBtn.addEventListener("click", restartGame);
resetScoreBtn.addEventListener("click", resetScore);

// show who starts when the page first loads
statusText.textContent = "Player " + currentPlayer + "'s turn";
