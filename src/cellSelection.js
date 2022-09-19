let delay = 500;

export async function getRandomCell() {
  return new Promise((resolve) => {
    setTimeout(() => {
      let x = Math.floor(Math.random() * 10) + 1;
      let y = Math.floor(Math.random() * 10) + 1;
      resolve([x, y]);
    }, delay);
  });
}

export async function getRandomDirection() {
  return new Promise((resolve) => {
    setTimeout(() => {
      let directions = ["h", "v"];
      let direction = directions[Math.floor(Math.random() * 2)];
      resolve(direction);
    }, delay);
  });
}

export function cellCoordinatesFromCellId(cellId) {
  let coordinates = cellId.split("x");
  coordinates = coordinates.forEach((string) => parseInt(string));
  return coordinates;
}

export function sameCoordinates(coordinatesPairOne, coordinatesPairTwo) {
  if (
    coordinatesPairOne[0] === coordinatesPairTwo[0] &&
    coordinatesPairOne[1] === coordinatesPairTwo[1]
  ) {
    return true;
  }
  return false;
}

export function coordinatesOnBoard(coordinateArray) {
  for (let i = 0; i < coordinateArray.length; i++) {
    if (
      !(
        coordinateArray[i][0] >= 1 &&
        coordinateArray[i][0] <= 10 &&
        coordinateArray[i][1] >= 1 &&
        coordinateArray[i][1] <= 10
      )
    ) {
      return false;
    }
  }
  return true;
}

export function overlappingCoordinates(
  primaryCoordinateArray,
  secondaryCoordinateArray
) {
  // Check if overlaps with occupied
  for (let i = 0; i < primaryCoordinateArray.length; i++) {
    for (let j = 0; j < secondaryCoordinateArray.length; j++) {
      if (
        sameCoordinates(primaryCoordinateArray[i], secondaryCoordinateArray[j])
      ) {
        return true;
      }
    }
  }
  return false;
}
