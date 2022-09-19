import boardFactory from "./board";
import {
  getRandomCell,
  cellCoordinatesFromCellId,
  overlappingCoordinates,
} from "./cellSelection";
import * as displayController from "./displayController";

export default function playerFactory(name, playerType) {
  let wins = 0;
  let losses = 0;
  let board = boardFactory();
  const shotHistory = [];

  function win() {
    this.wins += 1;
  }

  function lose() {
    this.losses += 1;
  }

  async function setBoard() {
    await board.placeShips(playerType);
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

  async function getComputerShot() {
    let shotCoordinates = await getRandomCell();
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
    win,
    lose,
    getShotCoordinates,
  };
}
