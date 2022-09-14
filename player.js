export default function playerFactory(name, board) {
  let wins = 0;
  let losses = 0;
  function printRecord() {
    console.log(`${name}: ${wins} win(s), ${losses} loss(es)`);
  }

  const shotHistory = [];

  function win() {
    wins += 1;
  }

  function lose() {
    losses += 1;
  }

  return {
    name,
    board,
    shotHistory,
    printRecord,
    win,
    lose,
  };
}
