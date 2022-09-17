import playerFactory from "../src/player";

// Set board
let testPlayer;

describe("setting the board", () => {
  beforeAll(() => {
    testPlayer = playerFactory("Player 1", "computer");
  });

  it("sets up a board with 5 ships", async () => {
    await testPlayer.setBoard();
    expect(testPlayer.board.shipArray.length).toBe(5);
  });
});

// Get shot from human
