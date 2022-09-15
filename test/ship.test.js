import shipFactory from "../src/ship";

// Builds ship correctly
test("builds a ship with the right health array", () => {
  let testShip = shipFactory([
    [5, 1],
    [5, 2],
  ]);
  expect(testShip.healthArray).toStrictEqual([0, 0]);
});

test("builds a ship with the right location array", () => {
  let testShip = shipFactory([
    [5, 1],
    [5, 2],
  ]);
  expect(testShip.locationArray).toStrictEqual([
    [5, 1],
    [5, 2],
  ]);
});

// hit

test("hits ship", () => {
  // Create fake ship
  const ship = shipFactory(4);
  ship.hit(3);
  // Hit ship
  // Expect hit ship to be shown as hit
  expect(ship.healthArray[3]).toBe(1);
});

// isSunk

test("checks if ship is sunk", () => {
  const ship = shipFactory(3);
  ship.hit(0);
  ship.hit(1);
  ship.hit(2);
  expect(ship.isSunk()).toBe(true);
});
