
// const maumasiFyURL = require('../../models/db_crud').table('maumasiFyURL');
const lengthOfGen = 6;
// private func that produces a random index of the array arg
var randomIndex = (array) => {
  return Math.floor(Math.random() * (array.length));
};

module.exports = () => {
  // will bemoce a string of random charSets 5 char long

  const strAlphaNum = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";

  var outputString = "";
  for(var i=0; i<lengthOfGen; i++){
    outputString += strAlphaNum.charAt(Math.floor(Math.random() * strAlphaNum.length));
  }

  return outputString;
};
