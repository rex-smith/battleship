export function getRandomCell() {
  let x = Math.floor(Math.random() * 10) + 1;
  let y = Math.floor(Math.random() * 10) + 1;
  return [x, y];
}

export function getRandomDirection() {
  let directions = ["h", "v"];
  let direction = directions[Math.floor(Math.random() * 2)];
  return direction;
}

export function getDirectionFromHuman() {
  let direction = "";
  while (direction.toLowerCase() !== "h" && direction.toLowerCase() !== "v") {
    direction = prompt("Horizontal (H) or Vertical (V)?");
  }
  return direction;
}

export function getCellFromHuman() {
  const x = parseInt(prompt("Please provide an X coordinate"));
  const y = parseInt(prompt("Please provide a Y coordinate"));
  let cell = [x, y];
  if (!(x <= 10 && x >= 1 && y <= 10 && y >= 1)) {
    console.log("Please choose a cell within the bounds (X: 1-10) (Y: 1-10)");
    cell = getCellFromHuman();
  }
  return cell;
}
