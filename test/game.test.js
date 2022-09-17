import gameFactory from "../src/game";
import playerFactory from "../src/player";

let testPlayerOne;
let testPlayerTwo;
let testGame;

describe("setup board", () => {
  beforeAll(async () => {
    testPlayerOne = playerFactory("Player 1", "computer");
    testPlayerTwo = playerFactory("Player 2", "computer");
    testGame = gameFactory(testPlayerOne, testPlayerTwo);
    await testGame.setupGame();
  });

  it("sets up the board with two boards of 5 ships", () => {
    expect(testPlayerOne.board.shipArray.length).toBe(5);
    expect(testPlayerTwo.board.shipArray.length).toBe(5);
  });
});

describe("game over", () => {
  beforeAll(async () => {
    testPlayerOne = playerFactory("Player 1", "computer");
    testPlayerTwo = playerFactory("Player 2", "computer");
    testGame = gameFactory(testPlayerOne, testPlayerTwo);
    await testGame.setupGame();
  });

  afterEach(() => {
    jest.restoreAllMocks();
  });

  it("returns false when game is not over", () => {
    expect(testGame.gameOver()).toBe(false);
  });

  it("returns true when game is over", () => {
    let { board } = testGame.playerTwo;
    const spy = jest.spyOn(board, "allSunk").mockReturnValueOnce(true);
    expect(testGame.gameOver()).toBe(true);
  });
});
