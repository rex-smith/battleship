export default function shipFactory(locationArray) {
  const healthArray = new Array(locationArray.length).fill(0);

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
