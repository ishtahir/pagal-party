function shuffle(array) {
  let currentIndex = array.length,
    temporaryValue,
    randomIndex;

  while (0 !== currentIndex) {
    randomIndex = Math.floor(Math.random() * currentIndex);
    currentIndex -= 1;

    temporaryValue = array[currentIndex];
    array[currentIndex] = array[randomIndex];
    array[randomIndex] = temporaryValue;
  }

  return array;
}

export function createHitler(players) {
  if (players < 5 || players > 10)
    return 'Please enter correct amount of players.';

  const chars = {
    5: [3, 1],
    6: [4, 1],
    7: [4, 2],
    8: [5, 2],
    9: [5, 3],
    10: [6, 3],
  };

  const envelope = (party, secret) => ({
    cards: {
      party,
      secret,
    },
  });

  const result = [];

  for (let i = 0; i < chars[players][0]; i++) {
    result.push(envelope('liberal', 'liberal'));
  }

  for (let i = 0; i < chars[players][1]; i++) {
    result.push(envelope('fascist', 'fascist'));
  }

  result.push(envelope('fascist', 'hitler'));

  for (let i = 0; i < 10; i++) {
    shuffle(result);
  }

  return result;
}
