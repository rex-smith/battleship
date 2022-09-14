import shipFactory from "./ship";

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
  expect(ship.isSunk).toBe(true);
});
