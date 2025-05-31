/* script.js - Browser Based Interactions */


const board = document.getElementById('board');
const status = document.getElementById('status');
const resetBtn = document.getElementById('resetBtn');

let cells = []; // Store cell DOM elements
let currentPlayer = 'X'; // Track current player
let gameActive = true; // Game activity flag
let boardState = Array(9).fill(null); // Track X and O in each cell
let rotation = 0; // Track board rotation angle

// All possible winning combinations
const winCombos = [
  [0,1,2], [3,4,5], [6,7,8], // Rows
  [0,3,6], [1,4,7], [2,5,8], // Columns
  [0,4,8], [2,4,6]           // Diagonals
];

// Initialize and render the game board 
function createBoard() {
  board.innerHTML = '';
  cells = [];
  for (let i = 0; i < 9; i++) {
    const cell = document.createElement('div');
    cell.classList.add('cell');
    cell.dataset.index = i; // Store cell index
    cell.addEventListener('click', onCellClick); // Handle cell clicks
    board.appendChild(cell);
    cells.push(cell);
  }
}

// Handle cell click events 
function onCellClick(e) {
  if (!gameActive) return; // Ignore if game over
  const idx = e.target.dataset.index;
  if (boardState[idx]) return; // Ignore if cell already filled

  boardState[idx] = currentPlayer;
  cells[idx].textContent = currentPlayer;

  // Check if current player wins
  if (checkWin(currentPlayer)) {
    status.textContent = `Player ${currentPlayer} wins! 🎉`;
    gameActive = false;
    return;
  }

  // Check for a tie
  if (boardState.every(cell => cell !== null)) {
    status.textContent = "It's a tie! 🤝";
    gameActive = false;
    return;
  }

  // Rotate board 90 degrees (A short yt tutorial helped figure this part)
  rotation += 90;
  board.style.transform = `rotate(${rotation}deg)`;


  // Switch player (Help with a short yt tutorial)
  currentPlayer = currentPlayer === 'X' ? 'O' : 'X';
  status.textContent = `Player ${currentPlayer}'s turn`;
}

// Check if player has a winning combination
function checkWin(player) {
  return winCombos.some(combo => 
    combo.every(idx => boardState[idx] === player)
  );
}

// Reset the game (Yt tutorials helped with with the reset button)
resetBtn.addEventListener('click', () => {
  boardState.fill(null); // Clear board state
  cells.forEach(cell => cell.textContent = ''); // Clear cell content
  currentPlayer = 'X';
  gameActive = true;
  status.textContent = `Player ${currentPlayer}'s turn`;
  rotation = 0;
  board.style.transform = `rotate(0deg)`; // Reset rotation
});

// Create board on page load
createBoard();

/* Throughout the whole process of creating the game several youtube tutuorials were used to help figure out difficult componenets of javascript portion as well as to help identify any errors */


