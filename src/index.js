import "./reset.css";
import "./styles.css";
import gameFactory from "./game";
import playerFactory from "./player";

let player1 = playerFactory("Player 1", "computer");
let player2 = playerFactory("Player 2", "computer");
let game = gameFactory(player1, player2);

const newGameButton = document.getElementById("new-game");
newGameButton.addEventListener("click", () => {
  player1 = playerFactory(
    game.playerOne.name,
    game.playerTwo.playerType,
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
    console.log("Game set up!");
    game.playGame();
  });
});

game.setupGame().then(() => {
  console.log("Game set up!");
  game.playGame();
});
