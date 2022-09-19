import { getRandomCell, getRandomDirection } from "../src/cellSelection";

describe("getRandomCell", () => {
  it("returns a valid cell", async () => {
    let cell = await getRandomCell();
    expect(cell[0]).toBeGreaterThanOrEqual(1);
    expect(cell[0]).toBeLessThanOrEqual(10);
    expect(cell[1]).toBeGreaterThanOrEqual(1);
    expect(cell[1]).toBeLessThanOrEqual(10);
  });
});

describe("getRandomDirection", () => {
  it("returns a valid direction", async () => {
    let direction = await getRandomDirection();
    expect(["h", "v"]).toContain(direction);
  });
});

// Comparing two arrays of coordinates

describe("comparing two arrays of coordinates to check for overlap", () => {
  it("returns true when coordinates overlap", () => {
    let occupiedCells = [
      [1, 2],
      [1, 3],
      [1, 4],
    ];
    let newLocationArray = [
      [4, 2],
      [3, 2],
      [2, 2],
      [1, 2],
    ];
    let result = overlappingCoordinates(occupiedCells, newLocationArray);
    expect(result).toBe(true);
  });

  it("returns false when coordinates don't overlap", () => {
    let occupiedCells = [
      [1, 2],
      [1, 3],
      [1, 4],
    ];
    let newLocationArray = [
      [4, 2],
      [3, 2],
      [2, 2],
    ];
    let result = overlappingCoordinates(occupiedCells, newLocationArray);
    expect(result).toBe(false);
  });
});

// Comparing two coordinate pairs

describe("compare coordinate pairs", () => {
  it("returns true when the coordinate pairs are the same", () => {
    let result = sameCoordinates([1, 2], [1, 2]);
    expect(result).toBe(true);
  });

  it("returns false when the coordinate pairs are not the same", () => {
    let result = sameCoordinates([1, 2], [2, 1]);
    expect(result).toBe(false);
  });
});
