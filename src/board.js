import shipFactory from "./ship";
import {
  getRandomCell,
  getRandomDirection,
  cellCoordinatesFromCellId,
  overlappingCoordinates,
  coordinatesOnBoard,
  sameCoordinates,
} from "./cellSelection";
import * as displayController from "./displayController";

export default function boardFactory() {
  let missedAttacks = [];
  let shipArray = [];
  let occupiedCells = [];

  function validLocationArray(locationArray) {
    // Check if any off the board
    if (!coordinatesOnBoard(locationArray)) {
      return false;
    }

    // Check if overlaps with occupied
    if (overlappingCoordinates(occupiedCells, locationArray)) {
      return false;
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

  async function getDirectionFromHuman() {
    // Asynchronous function to wait for human to input using arrow keys or click button
    return new Promise((resolve) => {
      document.addEventListener("keydown", (e) => {
        let direction;
        if (e.keyCode === 40 || e.keyCode === 38) {
          direction = "v";
          resolve(direction);
        } else if (e.keyCode === 37 || e.keyCode === 39) {
          direction = "h";
          resolve(direction);
        }
      });
    });
  }

  async function getStartCellFromHuman(board, length, direction) {
    displayController.displayMessage(
      `Please choose a starting cell for ship with length ${length}`
    );
    return new Promise((resolve) => {
      let cells = document.querySelectorAll(".cell");
      cells.forEach((cell) => {
        // Highlighting potential cells
        cell.addEventListener("mouseover", (e) => {
          let coordinates = cellCoordinatesFromCellId(e.target.id);
          displayController.showPlacementCells(
            board,
            coordinates,
            length,
            direction
          );
        });

        cell.addEventListener("click", (e) => {
          let startCoordinates = cellCoordinatesFromCellId(e.target.id);
          if (
            validLocationArray(
              buildLocationArray(length, startCoordinates, direction)
            )
          ) {
            displayController.resetPlayerBoard();
            resolve(startCoordinates);
          } else {
            displayController.displayMessage(
              "This is not a valid starting cell. Please choose another one."
            );
          }
        });
      });
    });
  }

  function placeShip(locationArray) {
    let newShip = shipFactory(locationArray);
    shipArray.push(newShip);
    for (let i = 0; i < locationArray.length; i++) {
      occupiedCells.push(locationArray[i]);
    }
  }

  async function getStartCell(board, playerType, length, direction) {
    let startCell = [0, 0];
    if (playerType === "computer") {
      startCell = await getRandomCell();
    } else {
      startCell = await getStartCellFromHuman(board, length, direction);
    }
    return startCell;
  }

  async function getDirection(playerType) {
    let direction = "";
    if (playerType === "computer") {
      direction = await getRandomDirection();
    } else {
      displayController.displayMessage(
        "Please choose a direction using your arrow keys. Horizontal: Left or Right Key, Vertical: Up or Down Key."
      );
      direction = await getDirectionFromHuman();
    }
    return direction;
  }

  async function getLocationArray(board, playerType, length) {
    let direction = await getDirection(playerType);
    let startCell = await getStartCell(board, playerType, length, direction);
    let locationArray = buildLocationArray(length, startCell, direction);
    if (!validLocationArray(locationArray)) {
      locationArray = await getLocationArray(board, playerType, length);
    }
    return locationArray;
  }

  async function placeShips(playerType) {
    let locationArray = [];
    const battleShipLengths = [5, 4, 3, 3, 2];
    for (let i = 0; i < battleShipLengths.length; i++) {
      let length = battleShipLengths[i];
      displayController.showPlacementBoard(this);
      locationArray = await getLocationArray(this, playerType, length);
      placeShip(locationArray);
    }
  }

  function processHit(player, ship, location) {
    ship.hit(location);
    player.openHitHistory.push(ship.locationArray[location]);
    if (ship.isSunk()) {
      player.recordSink(ship);
    }
  }

  function receiveAttack(player, coordinates) {
    let confirmedHit = false;
    for (let i = 0; i < shipArray.length; i++) {
      for (let j = 0; j < shipArray[i].locationArray.length; j++) {
        if (sameCoordinates(shipArray[i].locationArray[j], coordinates)) {
          processHit(player, shipArray[i], j);
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
    getDirectionFromHuman,
    receiveAttack,
    allSunk,
    placeShips,
    placeShip,
    validLocationArray,
    sameCoordinates,
    overlappingCoordinates,
  };
}
