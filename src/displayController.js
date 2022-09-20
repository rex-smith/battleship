function getCellFromCoordinates(coordinates) {
  let cell = document.getElementById(`${coordinates[0]}x${coordinates[1]}`);
  return cell;
}

function setCellColor(cell, color) {
  let styledCell = cell;
  styledCell.style.background = color;
}

export const resetPlayerBoard = () => {
  const board = document.getElementById("board");
  const finalBoard = board.cloneNode(true);
  board.parentNode.replaceChild(finalBoard, board);
};

export function showPlacementBoard(board) {
  // Refresh coloring to base level
  refreshBoardView();

  for (let i = 0; i < board.shipArray.length; i++) {
    let ships = board.shipArray;
    for (let j = 0; j < ships[i].locationArray.length; j++) {
      let coordinates = ships[i].locationArray[j];
      let cell = getCellFromCoordinates(coordinates);
      setCellColor(cell, "navy");
    }
  }
}

export function showPlacementCells(board, coordinates, length, direction) {
  // Refresh all cell colors
  refreshBoardView();
  showPlacementBoard(board);
  // Set cell colors in potential placement path to orange
  for (let i = 0; i < length; i++) {
    let cell;
    let newCoordinates;
    if (direction === "h") {
      newCoordinates = [coordinates[0] + i, coordinates[1]];
    } else if (direction === "v") {
      newCoordinates = [coordinates[0], coordinates[1] + i];
    }
    cell = getCellFromCoordinates(newCoordinates);
    if (cell) {
      setCellColor(cell, "orange");
    }
  }
}

export function refreshBoardView() {
  // Refresh coloring to base level
  for (let i = 1; i <= 10; i++) {
    for (let j = 1; j <= 10; j++) {
      let cell = getCellFromCoordinates([i, j]);
      setCellColor(cell, "skyblue");
    }
  }
}

export function showAttackBoard(board) {
  // Refresh coloring to base level
  refreshBoardView();

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

export function displayInfo(player1, player2) {
  const playerOneTitle = document.getElementById("player-one-title");
  const playerTwoTitle = document.getElementById("player-two-title");
  const playerOneWins = document.getElementById("player-one-wins-count");
  const playerOneLosses = document.getElementById("player-one-losses-count");
  const playerTwoWins = document.getElementById("player-two-wins-count");
  const playerTwoLosses = document.getElementById("player-two-losses-count");
  playerOneTitle.innerText = player1.name;
  playerOneWins.innerText = player1.wins;
  playerOneLosses.innerText = player1.losses;
  playerTwoTitle.innerText = player2.name;
  playerTwoWins.innerText = player2.wins;
  playerTwoLosses.innerText = player2.losses;
}
