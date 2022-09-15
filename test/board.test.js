import boardFactory from "../src/board";

let testBoard;

// Build Location Array
describe("build location array", () => {
  testBoard = boardFactory();
  it("builds the right location array vertically", () => {
    let locationArray = testBoard.buildLocationArray(2, [5, 1], "v");
    expect(locationArray).toStrictEqual([
      [5, 1],
      [5, 2],
    ]);
  });

  it("builds the right location array horizontally", () => {
    let locationArray = testBoard.buildLocationArray(3, [7, 3], "h");
    expect(locationArray).toStrictEqual([
      [7, 3],
      [8, 3],
      [9, 3],
    ]);
  });
});

// Place ship
describe("place ship", () => {
  testBoard = boardFactory();

  it("places a boat correctly vertically", () => {
    testBoard.placeShip(2, [5, 1], "v");
    expect(testBoard.shipArray[0].locationArray).toStrictEqual([
      [5, 1],
      [5, 2],
    ]);
  });

  it("places a boat correctly horizontally", () => {
    testBoard.placeShip(3, [7, 3], "h");
    expect(testBoard.shipArray[1].locationArray).toStrictEqual([
      [7, 3],
      [8, 3],
      [9, 3],
    ]);
  });
});

// Receiving attacks
describe("receive attack", () => {
  testBoard = boardFactory();
  testBoard.placeShip(2, [5, 1], "v");
  testBoard.placeShip(3, [7, 3], "h");

  it("hits a boat", () => {
    testBoard.receiveAttack([5, 2]);
    expect(testBoard.shipArray[0].healthArray).toStrictEqual([0, 1]);
  });

  it("misses a boat", () => {
    testBoard.receiveAttack([8, 2]);
    expect(testBoard.missedAttacks).toStrictEqual([[8, 2]]);
  });
});

// Checking if allSunk
describe("allSunk", () => {
  testBoard = boardFactory();
  testBoard.placeShip(2, [5, 1], "v");
  testBoard.placeShip(3, [7, 3], "h");

  it("returns false when all boats are not sunk", () => {
    expect(testBoard.allSunk()).toBe(false);
  });

  it("returns true when all boats are sunk", () => {
    testBoard.receiveAttack([5, 1]);
    testBoard.receiveAttack([5, 2]);
    testBoard.receiveAttack([9, 3]);
    testBoard.receiveAttack([8, 3]);
    testBoard.receiveAttack([7, 3]);

    expect(testBoard.allSunk()).toBe(true);
  });
});
