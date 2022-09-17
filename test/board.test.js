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
  it("places a boat correctly vertically", () => {
    testBoard = boardFactory();
    testBoard.placeShip([
      [5, 1],
      [5, 2],
    ]);
    expect(testBoard.shipArray[0].locationArray).toStrictEqual([
      [5, 1],
      [5, 2],
    ]);
  });

  it("places a boat correctly horizontally", () => {
    testBoard = boardFactory();
    testBoard.placeShip([
      [7, 3],
      [8, 3],
      [9, 3],
    ]);
    expect(testBoard.shipArray[0].locationArray).toStrictEqual([
      [7, 3],
      [8, 3],
      [9, 3],
    ]);
  });
});

// Place SHIPS (multiple)

describe("places ships (all 5)", () => {
  beforeAll(async () => {
    testBoard = boardFactory();
    await testBoard.placeShips("computer");
  });

  it("has 5 ships in the ship array", () => {
    expect(testBoard.shipArray.length).toBe(5);
  });

  it("has the correct length for each ship", () => {
    expect(testBoard.shipArray[0].locationArray.length).toBe(5);
    expect(testBoard.shipArray[1].locationArray.length).toBe(4);
    expect(testBoard.shipArray[2].locationArray.length).toBe(3);
    expect(testBoard.shipArray[3].locationArray.length).toBe(3);
    expect(testBoard.shipArray[4].locationArray.length).toBe(2);
  });
});

// Receiving attacks
describe("receive attack", () => {
  beforeAll(() => {
    testBoard = boardFactory();
    testBoard.placeShip([
      [5, 1],
      [5, 2],
    ]);
    testBoard.placeShip([
      [7, 3],
      [8, 3],
      [9, 3],
    ]);
  });

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
  beforeAll(() => {
    testBoard = boardFactory();
    testBoard.placeShip([
      [5, 1],
      [5, 2],
    ]);
    testBoard.placeShip([
      [7, 3],
      [8, 3],
      [9, 3],
    ]);
  });

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
