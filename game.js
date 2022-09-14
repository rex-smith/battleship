import playerFactory from "./player";
import boardFactory from "./board";

export default function gameFactory() {
  const player1 = playerFactory("Player 1", boardFactory());
  const player2 = playerFactory("Player 2", boardFactory());
  let activePlayer = player1;
  let enemyPlayer = player2;

  // function placeShips() {
  //   for (let i = 0; i < playerArray.length; i++) {
  //     // Ask player to place ships [NOT INCLUDED YET]
  //   }
  // }

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

  function notOnBoard(number) {
    if (number >= 1 && number <= 10) {
      return true;
    }
    return false;
  }

  function requestCoordinates() {
    alert("Please input the column number (1-10): ");
    const x = parseInt(input()) - 1;
    alert("Please input the row number (1-10):");
    const y = parseInt(input()) - 1;
    return [x, y];
  }

  function validShotCoordinates(coordinates) {
    if (notOnBoard(coordinates[0]) || notOnBoard(coordinates[1])) {
      return false;
    }

    for (let i = 0; i < activePlayer.shotHistory.length; i++) {
      if (coordinates === activePlayer.shotHistory[i]) {
        return false;
      }
    }
    return true;
  }

  function getShotCoordinates() {
    let validShot = false;
    let coordinates = [];
    while (!validShot) {
      coordinates = requestCoordinates();
      if (validShotCoordinates(coordinates)) {
        validShot = true;
      }
    }
    return coordinates;
  }

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
    // Get shot coordinates from player
    const shotCoordinates = getShotCoordinates();

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
    playGame,
  };
}
