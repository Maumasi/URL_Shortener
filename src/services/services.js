
const services = {
  randomKey: require('./serviceRepo/randomKeyMaker'),
  pingPreper: require('./serviceRepo/pingPreper'),
  checkUrlInput: require('./serviceRepo/checkUrlInput'),
  shortKeyExtractor: require('./serviceRepo/shortKeyExtractor'),
};

exports.services = services;
