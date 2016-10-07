
// private func that produces a random index of the array arg
function randomIndex(array) {
  return Math.floor(Math.random() * (array.length));
}

module.exports = () => {
  // will bemoce a string of random charSets 5 char long
  let randomString = '';

  // get today's 'day of the month' date
  const today = new Date().getDate();

  const charSets = {
    upperCase: [],
    lowerCase: ['q', 'w', 'e', 'r', 't', 'y', 'u', 'i', 'o', 'p', 'a', 's', 'd',
                'f', 'g', 'h', 'j', 'k', 'l', 'z', 'x', 'c', 'v', 'b', 'n', 'm'],
    numbers: [1, 2, 3, 4, 5, 6, 7, 8, 9, 0],
  };

  // fill charSets.upperCase with uppercase letters
  let letter;
  for (letter of charSets.lowerCase) {
    charSets.upperCase.push(letter.toUpperCase());
  }

  // get a random index
  const upperIndex1 = randomIndex(charSets.upperCase);
  const lowerIndex1 = randomIndex(charSets.lowerCase);
  const upperIndex2 = randomIndex(charSets.upperCase);
  const lowerIndex2 = randomIndex(charSets.lowerCase);
  const numIndex = randomIndex(charSets.numbers);

  // build string
  randomString += today;
  randomString += charSets.upperCase[upperIndex1];
  randomString += charSets.upperCase[upperIndex2];
  randomString += charSets.lowerCase[lowerIndex1];
  randomString += charSets.lowerCase[lowerIndex2];
  randomString += charSets.numbers[numIndex];

  // console.log(randomString);
  return randomString;
};
