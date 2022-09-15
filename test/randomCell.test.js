import {
  getCellFromHuman,
  getRandomCell,
  getRandomDirection,
  getDirectionFromHuman,
} from "../src/randomCell";

describe("getCellFromHuman", () => {
  afterEach(() => {
    jest.restoreAllMocks();
  });

  it("receives a valid cell and returns the coordinates", () => {
    global.prompt = jest.fn().mockReturnValueOnce(1).mockReturnValueOnce(2);
    let cell = getCellFromHuman();
    expect(cell).toStrictEqual([1, 2]);
  });
});

describe("getRandomCell", () => {
  it("returns a valid cell", () => {
    let cell = getRandomCell();
    expect(cell[0]).toBeGreaterThanOrEqual(1);
    expect(cell[0]).toBeLessThanOrEqual(10);
    expect(cell[1]).toBeGreaterThanOrEqual(1);
    expect(cell[1]).toBeLessThanOrEqual(10);
  });
});

describe("getDirectionFromHuman", () => {
  afterEach(() => {
    jest.restoreAllMocks();
  });

  it("returns a valid direction", () => {
    global.prompt = jest.fn().mockReturnValueOnce("h");
    let direction = getDirectionFromHuman();
    expect(direction).toBe("h");
  });
});

describe("getRandomDirection", () => {
  it("returns a valid direction", () => {
    let direction = getRandomDirection();
    expect(["h", "v"]).toContain(direction);
  });
});
