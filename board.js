import shipFactory from "./ship";

export default function boardFactory() {
  const missedAttacks = [];
  const shipArray = [
    // Starting off with ships placed (no option for player to choose yet)
    shipFactory(5, [
      [1, 1],
      [1, 2],
      [1, 3],
      [1, 4],
      [1, 5],
    ]),
    shipFactory(4, [
      [5, 10],
      [5, 9],
      [5, 8],
      [5, 7],
    ]),
    shipFactory(3, [
      [7, 2],
      [6, 2],
      [5, 2],
    ]),
    shipFactory(3, [
      [8, 7],
      [7, 7],
      [6, 7],
    ]),
    shipFactory(2, [
      [3, 9],
      [4, 9],
    ]),
  ];

  // Should validate that coordinates submitted aren't a repeat
  // and that they are on the board
  function receiveAttack(coordinates) {
    let confirmedHit = false;
    for (let i = 0; i < shipArray.length; i++) {
      for (let j = 0; j < shipArray[i].locationArray.length; j++) {
        if (
          coordinates[0] === shipArray[i].locationArray[j][0] &&
          coordinates[1] === shipArray[i].locationArray[j][1]
        ) {
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
    receiveAttack,
    allSunk,
  };
}
