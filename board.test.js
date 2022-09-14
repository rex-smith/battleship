import boardFactory from "./board";

// Receiving attacks
test("attack hits a boat", () => {
  const testBoard = boardFactory();
  testBoard.receiveAttack([7, 2]);
  expect(testBoard.shipArray[2].healthArray).toStrictEqual([1, 0, 0]);
});

test("attack misses a boat", () => {
  const testBoard = boardFactory();
  testBoard.receiveAttack([8, 2]);
  expect(testBoard.missedAttacks).toStrictEqual([[8, 2]]);
});

// Checking if allSunk

test("all boats are not sunk", () => {
  const testBoard = boardFactory();
  expect(testBoard.allSunk()).toBe(false);
});

test("all boats are sunk", () => {
  const testBoard = boardFactory();
  testBoard.receiveAttack([1, 1]);
  testBoard.receiveAttack([1, 2]);
  testBoard.receiveAttack([1, 3]);
  testBoard.receiveAttack([1, 4]);
  testBoard.receiveAttack([1, 5]);
  testBoard.receiveAttack([5, 10]);
  testBoard.receiveAttack([5, 9]);
  testBoard.receiveAttack([5, 8]);
  testBoard.receiveAttack([5, 7]);
  testBoard.receiveAttack([7, 2]);
  testBoard.receiveAttack([6, 2]);
  testBoard.receiveAttack([5, 2]);
  testBoard.receiveAttack([8, 7]);
  testBoard.receiveAttack([7, 7]);
  testBoard.receiveAttack([6, 7]);
  testBoard.receiveAttack([3, 9]);
  testBoard.receiveAttack([4, 9]);
  expect(testBoard.allSunk()).toBe(true);
});
