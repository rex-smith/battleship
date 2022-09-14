export default function shipFactory(length, locationArray) {
  const healthArray = new Array(length).fill(0);

  function hit(position) {
    healthArray[position] = 1;
  }

  function isSunk() {
    for (let i = 0; i < healthArray.length; i++) {
      if (healthArray[i] === 0) {
        return false;
      }
    }
    return true;
  }

  return {
    healthArray,
    locationArray,
    hit,
    isSunk,
  };
}
