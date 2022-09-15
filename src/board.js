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
    } else {
      throw Error("You do not have a valid direction!!");
    }
    return locationArray;
  }

  function possibleStartCells(length, direction) {
    let possibleStartArray = [];
    if (direction === "h") {
      for (let i = 1; i <= 10 - length; i++) {
        for (let j = 1; j <= 10; j++) {
          possibleStartArray.push([i, j]);
        }
      }
    } else if (direction === "v") {
      for (let i = 1; i <= 10; i++) {
        for (let j = 1; j <= 10 - length; j++) {
          possibleStartArray.push([i, j]);
        }
      }
    } else {
      throw Error("You do not have a valid direction!!");
    }
    return possibleStartArray;
  }

  function placeShip(length, startCell, direction) {
    let locationArray = buildLocationArray(length, startCell, direction);
    let newShip = shipFactory(locationArray);
    shipArray.push(newShip);
  }

  function placeShips(playerType) {
    const battleShipLengths = [5, 4, 3, 3, 2];
    for (let i = 0; i < battleShipLengths.length; i++) {
      let length = battleShipLengths[i];
      console.log(`You are placing a ship with length ${length}`);

      // Direction
      let direction = "";
      if (playerType === "computer") {
        direction = getRandomDirection();
      } else {
        direction = getDirectionFromHuman();
      }

      // Start Cell
      let startCell = [0, 0];
      const possibleStartArray = possibleStartCells(length, direction);
      while (!possibleStartArray.includes(startCell)) {
        if (playerType === "computer") {
          startCell = getRandomCell();
        } else {
          startCell = getCellFromHuman();
        }
      }
      placeShip(length, startCell, direction);
    }
  }

  function sameCoordinates(coordinatesPairOne, coordinatesPairTwo) {
    if (
      coordinatesPairOne[0] === coordinatesPairTwo[0] &&
      coordinatesPairOne[1] === coordinatesPairTwo[1]
    ) {
      return true;
    }
    return false;
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
