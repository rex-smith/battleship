function getCellFromCoordinates(coordinates) {
  let cell = document.getElementById(`${coordinates[0]}x${coordinates[1]}`);
  return cell;
}

function setCellColor(cell, color) {
  cell.style.background = color;
}

export const resetPlayerBoard = () => {
  const board = document.querySelector(".board");
  const finalBoard = board.cloneNode(true);
  board.parentNode.replaceChild(finalBoard, board);
};

export function showBoard(board) {
  // Refresh coloring to base level
  for (let i = 1; i <= 10; i++) {
    for (let j = 1; j <= 10; j++) {
      let cell = getCellFromCoordinates([i, j]);
      setCellColor(cell, "skyblue");
    }
  }

  // Show missed shots
  for (let i = 0; i < board.missedAttacks.length; i++) {
    const missedCellCoordinates = board.missedAttacks[i];
    const cell = getCellFromCoordinates(missedCellCoordinates);
    setCellColor(cell, "red");
  }

  // Show hit shots
  for (let i = 0; i < board.shipArray.length; i++) {
    const ship = board.shipArray[i];
    for (let j = 0; j < ship.locationArray.length; j++) {
      if (ship.healthArray[j] === 1) {
        const hitCellCoordinates = ship.locationArray[j];
        const cell = getCellFromCoordinates(hitCellCoordinates);
        setCellColor(cell, "green");
      }
    }
  }
}

export function displayMessage(message) {
  let messageContainer = document.getElementById("message");
  messageContainer.innerText = message;
}

export function displayRecords(player1, player2) {
  let playerOneRecord = document.getElementById("player-one-record");
  let playerTwoRecord = document.getElementById("player-two-record");
  playerOneRecord.innerText = player1.printRecord();
  playerTwoRecord.innerText = player2.printRecord();
}
