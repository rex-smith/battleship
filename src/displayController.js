export default function () {
  function getCellFromCoordinates(coordinates) {
    let cell = document.getElementById(`${coordinates[0]}x${coordinates[1]}`);
    return cell;
  }

  function displayMissedCell(cell) {
    cell.style.background = "red";
  }

  function displayHitCell(cell) {
    cell.style.background = "green";
  }

  function showBoard(board) {
    // Show missed shots
    for (let i = 0; i < board.missedAttacks.length; i++) {
      const missedCellCoordinates = board.missedAttacks[i];
      const cell = getCellFromCoordinates(missedCellCoordinates);
      displayMissedCell(cell);
    }

    // Show hit shots
    for (let i = 0; i < board.shipArray.length; i++) {
      const ship = board.shipArray[i];
      for (let j = 0; j < ship.locationArray.length; j++) {
        if (ship.healthArray[j] === 1) {
          const hitCellCoordinates = ship.locationArray[j];
          const cell = getCellFromCoordinates(hitCellCoordinates);
          displayHitCell(cell);
        }
      }
    }
  }

  return {
    showBoard,
  };
}
