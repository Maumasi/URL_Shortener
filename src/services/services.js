
const services = {
  randomKey: require('./serviceRepo/randomKeyMaker'),
  pingPreper: require('./serviceRepo/pingPreper'),
  checkUrlInput: require('./serviceRepo/checkUrlInput'),
  shortKeyExtractor: require('./serviceRepo/shortKeyExtractor'),
  rootUrlExists: require('./serviceRepo/rootUrlExists'),
};

exports.services = services;
