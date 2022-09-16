import boardFactory from "./board";
import { getCellFromHuman, getRandomCell } from "./randomCell";

export default function playerFactory(name, playerType) {
  let wins = 0;
  let losses = 0;
  let board = boardFactory();

  function printRecord() {
    console.log(`${name}: ${wins} win(s), ${losses} loss(es)`);
  }

  const shotHistory = [];

  function win() {
    wins += 1;
  }

  function lose() {
    losses += 1;
  }

  function setBoard() {
    board.placeShips(playerType);
  }

  function getHumanShot() {
    let shotCoordinates = getCellFromHuman();
    if (shotHistory.includes(shotCoordinates)) {
      console.log(
        "You have already shot at this cell. Please choose another one."
      );
      shotCoordinates = getCellFromHuman();
    }
    return shotCoordinates;
  }

  function getComputerShot() {
    let shotCoordinates = getRandomCell();
    if (shotHistory.includes(shotCoordinates)) {
      shotCoordinates = getComputerShot();
    }
    return shotCoordinates;
  }

  function shoot() {
    let shotCoordinates;
    if (playerType === "computer") {
      shotCoordinates = getComputerShot();
    } else {
      shotCoordinates = getHumanShot();
    }
    return shotCoordinates;
  }

  return {
    playerType,
    name,
    board,
    setBoard,
    shotHistory,
    printRecord,
    win,
    lose,
    shoot,
  };
}
