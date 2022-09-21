import * as displayController from "./displayController";

export default function gameFactory(playerOne, playerTwo) {
  async function setupGame() {
    displayController.displayInfo(playerOne, playerTwo);
    await playerOne.setBoard();
    await playerTwo.setBoard();
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
    displayController.displayInfo(playerOne, playerTwo);
    displayController.displayBoatHealth(playerOne, playerTwo);
  }

  function gameDelay(delay) {
    return new Promise((resolve) => {
      setTimeout(() => {
        resolve();
      }, delay);
    });
  }

  function getPlayerOne() {
    return playerOne;
  }

  function getPlayerTwo() {
    return playerTwo;
  }

  async function playTurn(player, enemy) {
    displayController.showAttackBoard(enemy.board);
    displayController.displayBoatHealth(getPlayerOne(), getPlayerTwo());
    displayController.displayMessage(`${player.name}'s Turn!`);

    // Get shot coordinates from player
    let shotCoordinates = await player.getShotCoordinates();

    // Process shot
    enemy.board.receiveAttack(player, shotCoordinates);
    player.shotHistory.push(shotCoordinates);
    displayController.showAttackBoard(enemy.board);

    // Delay after shot has been processed

    if (gameOver()) {
      endGame(player, enemy);
    } else {
      await gameDelay(500);
      playTurn(enemy, player);
    }
  }

  function playGame() {
    displayController.displayInfo(playerOne, playerTwo);
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
