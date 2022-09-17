import * as displayController from "./displayController";

export default function gameFactory(playerOne, playerTwo) {
  async function setupGame() {
    await playerOne.setBoard();
    await playerTwo.setBoard();
  }

  function displayRecords() {
    const playerOneWins = document.getElementById("player-one-wins");
    const playerOneLosses = document.getElementById("player-one-losses");
    const playerTwoWins = document.getElementById("player-two-wins");
    const playerTwoLosses = document.getElementById("player-two-losses");
    playerOneWins.innerText = `${playerOne.wins}`;
    playerOneLosses.innerText = `${playerOne.losses}`;
    playerTwoWins.innerText = `${playerTwo.wins}`;
    playerTwoLosses.innerText = `${playerTwo.losses}`;
  }

  function gameOver() {
    return playerOne.board.allSunk() || playerTwo.board.allSunk();
  }

  function endGame(player, enemy) {
    // Record win / loss data
    player.win();
    enemy.lose();
    // Announce game end
    displayController.displayMessage(`Game over! ${player.name} won the game!`);
    // Show record
    displayRecords();
  }

  async function playTurn(player, enemy) {
    displayController.showBoard(enemy.board);

    // Get shot coordinates from player
    let shotCoordinates = await player.getShotCoordinates();

    // Process shot
    console.log(`${player.name} shoots at cell ${shotCoordinates}`);
    enemy.board.receiveAttack(shotCoordinates);
    player.shotHistory.push(shotCoordinates);

    if (gameOver()) {
      endGame();
    } else {
      playTurn(enemy, player);
    }
  }

  function playGame() {
    playTurn(playerOne, playerTwo);
  }

  return {
    playerOne,
    playerTwo,
    gameOver,
    setupGame,
    playGame,
  };
}
