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
