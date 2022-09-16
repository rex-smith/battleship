import gameFactory from "../src/game";
import playerFactory from "../src/player";

let testPlayerOne;
let testPlayerTwo;
let testGame;

describe("game creation", () => {
  beforeAll(() => {
    testPlayerOne = playerFactory("Player 1", "computer");
    testPlayerTwo = playerFactory("Player 2", "computer");
    testGame = gameFactory(testPlayerOne, testPlayerTwo);
  });

  it("begins with player 1 as the active player", () => {
    expect(testGame.activePlayer).toBe(testPlayerOne);
  });

  it("begins with player 2 as the enemy", () => {
    expect(testGame.enemyPlayer).toBe(testPlayerTwo);
  });
});

describe("switching active player", () => {
  beforeAll(() => {
    testPlayerOne = playerFactory("Player 1", "computer");
    testPlayerTwo = playerFactory("Player 2", "computer");
    testGame = gameFactory(testPlayerOne, testPlayerTwo);
  });

  it("switches from player 1 to player 2", () => {
    testGame.switchActivePlayer();
    expect(testGame.activePlayer).toBe(testPlayerTwo);
  });

  it("switches from player 2 to player 1", () => {
    testGame.switchActivePlayer();
    expect(testGame.activePlayer).toBe(testPlayerOne);
  });
});

describe("setup board", () => {
  beforeAll(() => {
    testPlayerOne = playerFactory("Player 1", "computer");
    testPlayerTwo = playerFactory("Player 2", "computer");
    testGame = gameFactory(testPlayerOne, testPlayerTwo);
    testGame.setupGame();
  });

  it("sets up the board with two boards of 5 ships", () => {
    expect(testPlayerOne.board.shipArray.length).toBe(5);
    expect(testPlayerTwo.board.shipArray.length).toBe(5);
  });
});

describe("game over", () => {
  beforeAll(() => {
    testPlayerOne = playerFactory("Player 1", "computer");
    testPlayerTwo = playerFactory("Player 2", "computer");
    testGame = gameFactory(testPlayerOne, testPlayerTwo);
    testGame.setupGame();
  });

  afterEach(() => {
    jest.restoreAllMocks();
  });

  it("returns false when game is not over", () => {
    expect(testGame.gameOver()).toBe(false);
  });

  it("returns true when game is over", () => {
    let { board } = testGame.enemyPlayer;
    const spy = jest.spyOn(board, "allSunk").mockReturnValueOnce(true);
    expect(testGame.gameOver()).toBe(true);
  });
});
