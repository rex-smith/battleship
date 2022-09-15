import displayController from "./displayController";

export default function gameFactory(player1, player2) {
  let activePlayer = player1;
  let enemyPlayer = player2;

  function setupGame() {
    player1.setBoard();
    player2.setBoard();
  }

  function switchActivePlayer() {
    if (activePlayer === player1) {
      activePlayer = player2;
      enemyPlayer = player1;
    } else {
      activePlayer = player1;
      enemyPlayer = player2;
    }
  }

  function gameOver() {
    return enemyPlayer.board.allSunk() || activePlayer.board.allSunk();
  }

  // function notOnBoard(number) {
  //   if (number >= 1 && number <= 10) {
  //     return true;
  //   }
  //   return false;
  // }

  // function requestCoordinates() {
  //   const column = window.prompt("Please input the column number (1-10): ");
  //   const x = parseInt(column) - 1;
  //   const row = window.prompt("Please input the row number (1-10):");
  //   const y = parseInt(row) - 1;
  //   return [x, y];
  // }

  // function validShotCoordinates(coordinates) {
  //   if (notOnBoard(coordinates[0]) || notOnBoard(coordinates[1])) {
  //     console.log(
  //       "This space is not on the board. Please select a space on the board."
  //     );
  //     return false;
  //   }

  //   for (let i = 0; i < activePlayer.shotHistory.length; i++) {
  //     if (coordinates === activePlayer.shotHistory[i]) {
  //       console.log(
  //         "You have already tried this space. Please choose a different one."
  //       );
  //       return false;
  //     }
  //   }
  //   return true;
  // }

  // function getShotCoordinates() {
  //   let validShot = false;
  //   let coordinates = [];
  //   while (!validShot) {
  //     coordinates = requestCoordinates();
  //     if (validShotCoordinates(coordinates)) {
  //       validShot = true;
  //     }
  //   }
  //   return coordinates;
  // }

  function endGame() {
    // Record win / loss data
    activePlayer.win();
    enemyPlayer.lose();
    // Announce game end
    console.log(`Game over! ${activePlayer.name} won the game!`);
    // Show record
    player1.printRecord();
    player2.printRecord();
    // Ask if want to play a new game [NOT INCLUDED YET]
    alert("Do you want to play a new game? (y/n)");
  }

  function playTurn() {
    displayController.showBoard(enemyPlayer.board);
    // Get shot coordinates from player
    let shotCoordinates = activePlayer.shoot();

    // Process shot
    enemyPlayer.board.receiveAttack(shotCoordinates);
    activePlayer.shotHistory.push(shotCoordinates);
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
    setupGame,
    playGame,
  };
}
