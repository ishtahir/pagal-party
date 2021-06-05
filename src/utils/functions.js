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

export const createHitler = (players) => {
  // if (players < 5 || players > 10)
  if (players < 3 || players > 3)
    return 'Please enter correct amount of players.';

  const chars = {
    3: [2, 0], // remove this
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
    const role = 'liberal';
    result.push(envelope(role, role));
  }

  for (let i = 0; i < chars[players][1]; i++) {
    const role = 'fascist';
    result.push(envelope(role, role));
  }

  result.push(envelope('fascist', 'hitler'));

  for (let i = 0; i < 10; i++) {
    shuffle(result);
  }

  return result;
};

export const getDocId = (arr, key, val) => {
  return arr.filter((item) => item[key] === val)[0].id;
};

export const createRoomName = () => {
  let room = '';
  const chars = 'abcdefghijklmnopqrstuvwxyz';

  for (let i = 0; i < 4; i++) {
    const ind = Math.floor(Math.random() * chars.length);
    room += chars[ind];
  }
  return room.toUpperCase();
};
