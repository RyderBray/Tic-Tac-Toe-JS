const boardData = document.querySelectorAll(".gameButton");
const activePlayerDisplay = document.getElementById("activePlayer")
const winMessageDisplay = document.getElementById("winMessage")
const moveSound = new Audio("sounds/moveSound.mp3");
const winSound = new Audio("sounds/winSound.wav");
const playerOneSymbol = "X";
const playerTwoSymbol = "O";
let activePlayer = "playerTwo";
let usedMoves = [];
let winner = null;

moveSound.volume = 0.25;
winSound.volume = 0.15;

function playerTurn() { //Function for toggling between players
    if (activePlayer === "playerTwo") {
        activePlayer = "playerOne";
    }
    else if (activePlayer === "playerOne") {
        activePlayer = "playerTwo";
    }
}

function updatePlayerDisplay() { //Updates current player display
    if (activePlayer === "playerOne") {
        activePlayerDisplay.textContent = "Current player: Player one";
    }
    else {
        activePlayerDisplay.textContent = "Current player: Player two";
    }
}

function makeMove() {
    if (winner !== null) {
        return;
    }

    const buttonId = event.target.id;
    updatePlayerDisplay();
  
    if (usedMoves.includes(buttonId)) {
      return; //Quits function with invalid move
    }
  
    let selectedSquare = document.getElementById(buttonId);
    usedMoves.push(buttonId);
    validMove = true;
  
    playerTurn(); //Changes active player
  
    if (activePlayer === "playerOne") { //Replaces placeholder dashes
      selectedSquare.innerHTML = playerOneSymbol;
    } else if (activePlayer === "playerTwo") {
      selectedSquare.innerHTML = playerTwoSymbol;
    }

    moveSound.currentTime = 0;
    moveSound.play(); //Plays sound effect during move

    winner = checkWinner(); //Checks if there was a winner on the made move
    if (winner !== null) {
        winSound.play();
        if (winner === "playerOne wins") {
          winMessageDisplay.textContent = "Player one wins!"          
        }
        else if (winner === "playerTwo wins") {
          winMessageDisplay.textContent = "Player two wins!"
        }
    }

}

function checkWinner() { //Checks for winner
    let letters = ["a", "b", "c"];
    let numbers = ["1", "2", "3"];
    let winningPlayer = null;

    letters.forEach((letter) => { //Checks for wins horizontally across the board
        if (
          document.getElementById(`${letter}1`).innerHTML === document.getElementById(`${letter}2`).innerHTML &&
          document.getElementById(`${letter}1`).innerHTML === document.getElementById(`${letter}3`).innerHTML &&
          document.getElementById(`${letter}1`).innerHTML !== '-'
        ) {
          if (document.getElementById(`${letter}1`).innerHTML === playerOneSymbol) {
            winningPlayer = "playerOne wins";
          } 
          else if (document.getElementById(`${letter}1`).innerHTML === playerTwoSymbol) {
            winningPlayer = "playerTwo wins";
          }
        }
    });

    numbers.forEach((number) => { //Checks for wins vertically across the board
        if (
          document.getElementById(`a${number}`).innerHTML === document.getElementById(`b${number}`).innerHTML &&
          document.getElementById(`a${number}`).innerHTML === document.getElementById(`c${number}`).innerHTML &&
          document.getElementById(`a${number}`).innerHTML !== '-'
        ) {
          if (document.getElementById(`a${number}`).innerHTML === playerOneSymbol) {
            winningPlayer = "playerOne wins";
          } 
          else if (document.getElementById(`a${number}`).innerHTML === playerTwoSymbol) {
            winningPlayer = "playerTwo wins";
          }
        }
    });
    
    if (document.getElementById('a1').innerHTML === document.getElementById('b2').innerHTML &&
    document.getElementById('a1').innerHTML === document.getElementById('c3').innerHTML ||
    document.getElementById('a3').innerHTML === document.getElementById('b2').innerHTML &&
    document.getElementById('a3').innerHTML === document.getElementById('c1').innerHTML) {
      if (document.getElementById('b2').innerHTML === playerOneSymbol) {
        winningPlayer = "playerOne wins";
      }
      else if (document.getElementById('b2').innerHTML === playerTwoSymbol) {
        winningPlayer = "playerTwo wins";
      }
    }

    return winningPlayer;
}

function resetBoard() { //Resets game board and used moves
    boardData.forEach((button) => {
        button.innerHTML = "-";
    });
    usedMoves = [];
    winner = null;
    winMessageDisplay.textContent = "";
    moveSound.currentTime = 0;
    moveSound.play();
}