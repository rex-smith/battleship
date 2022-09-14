export default function shipFactory(length) {
  const healthArray = new Array(length).fill(0);
  const locationArray = new Array(length).fill(null);

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
    id,
    healthArray,
    locationArray,
    hit,
    isSunk,
    setLocation,
  };
}
