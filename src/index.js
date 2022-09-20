import "./reset.css";
import "./styles.css";
import gameFactory from "./game";
import playerFactory from "./player";

let player1;
let player2;
let game;

let boardContainer = document.querySelector(".board-container");
let boardOutput = document.getElementById("board");
for (let i = 1; i <= 10; i++) {
  for (let j = 1; j <= 10; j++) {
    let newCell = document.createElement("div");
    newCell.classList.add("cell");
    newCell.id = `${j}x${i}`;
    boardOutput.appendChild(newCell);
  }
}

const playerOneName = document.getElementById("player-one-name");
const playerTwoName = document.getElementById("player-two-name");
playerOneName.addEventListener("input", (e) => {
  validateName(playerOneName);
});
playerTwoName.addEventListener("input", (e) => {
  validateName(playerTwoName);
});

const nameRegExp = /^[a-zA-Z\s]*$/;

function isValidName(nameInput) {
  if (
    nameInput.value.length === 0 ||
    nameRegExp.test(nameInput.value) === false
  ) {
    return false;
  } else {
    return true;
  }
}

function showNameValid(nameInput) {
  nameInput.className = "valid";
}

function showNameError(nameInput) {
  nameInput.className = "invalid";
}

function validateName(nameInput) {
  if (isValidName(nameInput) === false) {
    showNameError(nameInput);
  } else {
    showNameValid(nameInput);
  }
}

const form = document.getElementById("new-game-form");
const formContainer = document.querySelector(".form-container");
const playerInfoContainer = document.querySelector(".player-info-container");

function isValidForm() {
  return isValidName(playerOneName) && isValidName(playerTwoName);
}

function validateForm() {
  validateName(playerOneName);
  validateName(playerTwoName);
}

form.addEventListener("submit", (event) => {
  event.preventDefault();
  validateForm();
  if (isValidForm() === false) {
    alert("There is something wrong with your form! Check the names");
  } else {
    let playerOneName = form.elements["player-one-name"].value;
    let playerOneType;
    for (let i = 0; i < form.elements["player-one-type"].length; i++) {
      if (form.elements["player-one-type"][i].checked) {
        playerOneType = form.elements["player-one-type"][i].value;
      }
    }
    let playerTwoName = form.elements["player-two-name"].value;
    let playerTwoType;
    for (let i = 0; i < form.elements["player-two-type"].length; i++) {
      if (form.elements["player-two-type"][i].checked) {
        playerTwoType = form.elements["player-two-type"][i].value;
      }
    }
    player1 = playerFactory(playerOneName, playerOneType);
    player2 = playerFactory(playerTwoName, playerTwoType);
    game = gameFactory(player1, player2);
    // Show board
    boardContainer.classList.toggle("hidden");
    playerInfoContainer.classList.toggle("hidden");
    // Hide form
    formContainer.classList.toggle("hidden");
    // Reset form
    form.reset();

    game.setupGame().then(() => {
      game.playGame();
    });
  }
});

const newGameButton = document.getElementById("new-game");
newGameButton.addEventListener("click", () => {
  player1 = playerFactory(
    game.playerOne.name,
    game.playerOne.playerType,
    game.playerOne.wins,
    game.playerOne.losses
  );
  player2 = playerFactory(
    game.playerTwo.name,
    game.playerTwo.playerType,
    game.playerTwo.wins,
    game.playerTwo.losses
  );
  game = gameFactory(player1, player2);
  game.setupGame().then(() => {
    game.playGame();
  });
});
