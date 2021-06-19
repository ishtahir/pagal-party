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
  if (players === 4) return 'Incorrect number of players';

  const rolesToCreate = {
    2: [1, 0], // remove this
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

  for (let i = 0; i < rolesToCreate[players][0]; i++) {
    const role = 'liberal';
    result.push(envelope(role, role));
  }

  for (let i = 0; i < rolesToCreate[players][1]; i++) {
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
  const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';

  for (let i = 0; i < 4; i++) {
    const ind = Math.floor(Math.random() * chars.length);
    room += chars[ind];
  }
  return room;
};

export const getDate = () => new Date().toISOString();

export const getName = (players, uid) => {
  return players.filter((player) => player.id === uid)[0].name;
};

export const secretHitlerSettings = () => ({
  game: 'Secret Hitler',
  voteTime: false,
  president: null,
  chancellor: null,
});

export const scattergoriesSettings = () => ({
  game: 'Scattergories',
  list: null,
  letter: null,
  round: 1,
});

export const scattergoriesLetterGenerator = () => {
  const chars = 'ABCDEFGHIJKLMNOPRSTU';
  const ind = Math.floor(Math.random() * chars.length);
  return chars[ind];
};
