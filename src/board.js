import shipFactory from "./ship";
import {
  getRandomCell,
  getRandomDirection,
  getCellFromHuman,
  getDirectionFromHuman,
} from "./randomCell";

export default function boardFactory() {
  let missedAttacks = [];
  let shipArray = [];
  let occupiedCells = [];

  function sameCoordinates(coordinatesPairOne, coordinatesPairTwo) {
    if (
      coordinatesPairOne[0] === coordinatesPairTwo[0] &&
      coordinatesPairOne[1] === coordinatesPairTwo[1]
    ) {
      return true;
    }
    return false;
  }

  function validLocationArray(locationArray) {
    // Check if any off the board
    for (let i = 0; i < locationArray.length; i++) {
      if (
        !(
          locationArray[i][0] >= 1 &&
          locationArray[i][0] <= 10 &&
          locationArray[i][1] >= 1 &&
          locationArray[i][1] <= 10
        )
      ) {
        return false;
      }
    }

    // Check if overlaps with occupied
    for (let i = 0; i < occupiedCells.length; i++) {
      for (let j = 0; j < locationArray.length; j++) {
        if (sameCoordinates(occupiedCells[i], locationArray[j])) {
          return false;
        }
      }
    }

    return true;
  }

  function buildLocationArray(length, startingCell, direction) {
    let x = startingCell[0];
    let y = startingCell[1];
    let locationArray = [];
    if (direction === "h") {
      for (let i = x; i < x + length; i++) {
        locationArray.push([i, y]);
      }
    } else if (direction === "v") {
      for (let i = y; i < y + length; i++) {
        locationArray.push([x, i]);
      }
    }
    return locationArray;
  }

  function placeShip(locationArray) {
    let newShip = shipFactory(locationArray);
    shipArray.push(newShip);
  }

  function getStartCell(playerType) {
    let startCell = [0, 0];
    if (playerType === "computer") {
      startCell = getRandomCell();
    } else {
      startCell = getCellFromHuman();
    }
    return startCell;
  }

  function getDirection(playerType) {
    let direction = "";
    if (playerType === "computer") {
      direction = getRandomDirection();
    } else {
      direction = getDirectionFromHuman();
    }
    return direction;
  }

  function placeShips(playerType) {
    const battleShipLengths = [5, 4, 3, 3, 2];
    for (let i = 0; i < battleShipLengths.length; i++) {
      let locationArray = [0, 0];
      while (!validLocationArray(locationArray)) {
        let length = battleShipLengths[i];
        // Direction
        let direction = getDirection(playerType);
        // Start Cell
        let startCell = getStartCell(playerType);
        locationArray = buildLocationArray(length, startCell, direction);
      }
      placeShip(locationArray);
    }
  }

  function receiveAttack(coordinates) {
    let confirmedHit = false;
    for (let i = 0; i < shipArray.length; i++) {
      for (let j = 0; j < shipArray[i].locationArray.length; j++) {
        if (sameCoordinates(shipArray[i].locationArray[j], coordinates)) {
          shipArray[i].hit(j);
          confirmedHit = true;
        }
      }
    }
    if (confirmedHit === false) {
      missedAttacks.push(coordinates);
    }
  }

  function allSunk() {
    for (let i = 0; i < shipArray.length; i++) {
      if (shipArray[i].isSunk() === false) {
        return false;
      }
    }
    return true;
  }

  return {
    shipArray,
    missedAttacks,
    buildLocationArray,
    receiveAttack,
    allSunk,
    placeShips,
    placeShip,
  };
}
