let delay = 0;

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
