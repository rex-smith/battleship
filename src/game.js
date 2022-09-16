import displayController from "./displayController";

export default function gameFactory(playerOne, playerTwo) {
  let activePlayer = playerOne;
  let enemyPlayer = playerTwo;

  function setupGame() {
    this.activePlayer.setBoard();
    this.enemyPlayer.setBoard();
  }

  function switchActivePlayer() {
    if (this.activePlayer === playerOne) {
      this.activePlayer = playerTwo;
      this.enemyPlayer = playerOne;
    } else {
      this.activePlayer = playerOne;
      this.enemyPlayer = playerTwo;
    }
  }

  function gameOver() {
    return (
      this.enemyPlayer.board.allSunk() || this.activePlayer.board.allSunk()
    );
  }

  function endGame() {
    // Record win / loss data
    this.activePlayer.win();
    this.enemyPlayer.lose();
    // Announce game end
    console.log(`Game over! ${this.activePlayer.name} won the game!`);
    // Show record
    playerOne.printRecord();
    playerTwo.printRecord();
    // Ask if want to play a new game [NOT INCLUDED YET]
    alert("Do you want to play a new game? (y/n)");
  }

  function playTurn() {
    displayController.showBoard(this.enemyPlayer.board);
    // Get shot coordinates from player
    let shotCoordinates = this.activePlayer.shoot();

    // Process shot
    this.enemyPlayer.board.receiveAttack(shotCoordinates);
    this.activePlayer.shotHistory.push(shotCoordinates);
  }

  function playGame() {
    while (!gameOver()) {
      playTurn();
      if (!gameOver) {
        switchActivePlayer();
      }
    }
    endGame();
  }

  return {
    activePlayer,
    enemyPlayer,
    switchActivePlayer,
    gameOver,
    setupGame,
    playGame,
  };
}
