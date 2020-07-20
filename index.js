const cells = document.querySelectorAll('.cell');
const startButton = document.getElementById('startNewGame');
const statusContainer = document.getElementById('gameStatus');
const resultContainer = document.getElementById('resultContainer');
const currentPlayerDisplay = document.getElementById('currentPlayer');

let currentPlayer = 'X';
let cellIsPlayed = ['', '', '', '', '', '', '', '', ''];
let gameIsActive = true;
let gameResult = '';
let winner = '';
const isPlayed = true;
const winCombinations = [
  [0, 1, 2],
  [0, 3, 6],
  [0, 4, 8],
  [1, 4, 7],
  [2, 4, 6],
  [2, 5, 8],
  [3, 4, 5],
  [6, 7, 8],
];


cells.forEach(cell => {
  cell.addEventListener('click', (event) => cellClickHandler(event));
})

startButton.addEventListener('click', () => startNewGame());


function cellClickHandler(event) {
  const cellID = event.target.id;
  const cell = event.target;
  
  if (!cellIsPlayed[cellID] || cellIsPlayed[cellID] === '') {
    cellIsPlayed[cellID] = currentPlayer;
    cell.innerHTML = `<p class='cellFill'>${currentPlayer}</p>`;
    (currentPlayer === 'X') ? currentPlayer = 'O' : currentPlayer = 'X';
    checkResult();
  };
  currentPlayerDisplay.innerText = `Current Player: ${currentPlayer}`;
}

function startNewGame() {
  cellIsPlayed = ['', '', '', '', '', '', '', '', ''];
  cells.forEach(cell => cell.innerHTML = null);
  gameResult = '';
  winner = '';
  statusContainer.classList.remove('displayNone');
  resultContainer.classList.add('displayNone');
}

function checkResult() {
  winCombinations.forEach((combination) => {
    let first = combination[0];
    let second = combination[1];
    let third = combination[2];

    if (cellIsPlayed[first] === cellIsPlayed[second] && cellIsPlayed[second] === cellIsPlayed[third] && cellIsPlayed[first] != '' ) {
      gameResult = 'won';
      winner = cellIsPlayed[first];
      gameIsActive = false;
      displayResult();
    };
  });

  let draw = cellIsPlayed.includes('');

  if (!draw) {
    gameResult = 'draw'
    displayResult();
  }
}

function displayResult() {
  let headline = document.getElementById('resultHeadline');

  headline.innerText = gameResult === 'won' ? `${winner} has won the game!` : `it´s a draw!`;
  resultContainer.appendChild(headline);
  statusContainer.classList.add('displayNone');
  resultContainer.classList.remove('displayNone');
}