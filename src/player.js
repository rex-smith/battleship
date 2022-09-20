import boardFactory from "./board";
import {
  getRandomCell,
  cellCoordinatesFromCellId,
  overlappingCoordinates,
  coordinatesOnBoard,
  sameCoordinates,
} from "./cellSelection";
import * as displayController from "./displayController";

const transformations = [
  [-1, 0],
  [-1, 1],
  [0, 1],
  [1, 1],
  [1, 0],
  [1, -1],
  [0, -1],
  [-1, -1],
];

export default function playerFactory(name, playerType, wins = 0, losses = 0) {
  let board = boardFactory();
  let shotHistory = [];
  let openHitHistory = [];
  let sinkHistory = [];

  function win() {
    this.wins += 1;
  }

  function lose() {
    this.losses += 1;
  }

  async function setBoard() {
    await board.placeShips(playerType);
  }

  function recordSink(ship) {
    for (let i = 0; i < ship.locationArray.length; i++) {
      sinkHistory.push(ship.locationArray[i]);
      removeSinkHits(ship);
    }
  }

  function removeSinkHits(ship) {
    for (let i = 0; i < ship.locationArray.length; i++) {
      for (let j = openHitHistory.length - 1; j >= 0; j--) {
        if (sameCoordinates(ship.locationArray[i], openHitHistory[j])) {
          openHitHistory.splice(j, 1);
        }
      }
    }
  }

  async function getHumanShot() {
    return new Promise((resolve) => {
      let cells = document.querySelectorAll(".cell");
      cells.forEach((cell) => {
        cell.addEventListener("click", (e) => {
          let shotCoordinates = cellCoordinatesFromCellId(e.target.id);
          if (overlappingCoordinates(shotHistory, [shotCoordinates])) {
            displayController.displayMessage(
              "You have already shot at this cell. Please choose another one."
            );
          } else {
            displayController.resetPlayerBoard();
            resolve(shotCoordinates);
          }
        });
      });
    });
  }

  async function getNearbyCell() {
    let newShotCoordinates;
    let availableNearbyCell = false;
    for (let i = 0; i < transformations.length; i++) {
      let previousHit = openHitHistory.at(-1);
      let shotCoordinates = [
        transformations[i][0] + previousHit[0],
        transformations[i][1] + previousHit[1],
      ];
      if (
        coordinatesOnBoard([shotCoordinates]) &&
        !overlappingCoordinates(shotHistory, [shotCoordinates])
      ) {
        newShotCoordinates = shotCoordinates;
        availableNearbyCell = true;
        break;
      }
    }
    if (availableNearbyCell === false) {
      newShotCoordinates = await getRandomCell();
    }
    return newShotCoordinates;
  }

  async function getComputerShot() {
    let shotCoordinates;
    if (openHitHistory.length > 0) {
      shotCoordinates = await getNearbyCell();
    } else {
      shotCoordinates = await getRandomCell();
    }
    if (overlappingCoordinates(shotHistory, [shotCoordinates])) {
      shotCoordinates = getComputerShot();
    }
    return shotCoordinates;
  }

  async function getShotCoordinates() {
    let shotCoordinates;
    if (playerType === "computer") {
      shotCoordinates = await getComputerShot();
    } else {
      shotCoordinates = await getHumanShot();
    }
    return shotCoordinates;
  }

  return {
    wins,
    losses,
    playerType,
    name,
    board,
    setBoard,
    shotHistory,
    openHitHistory,
    sinkHistory,
    win,
    lose,
    getShotCoordinates,
    recordSink,
  };
}
