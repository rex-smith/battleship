import "./reset.css";
import "./styles.css";
import gameFactory from "./game";
import playerFactory from "./player";

const player1 = playerFactory("Player 1", "computer");
const player2 = playerFactory("Player 2", "computer");
const game = gameFactory(player1, player2);

game.setupGame().then(() => {
  console.log("Game set up!");
  game.playGame();
});
