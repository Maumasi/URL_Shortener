
const services = {
  randomKey: require('./serviceRepo/randomKeyMaker'),
  pingPreper: require('./serviceRepo/pingPreper'),
  checkUrlInput: require('./serviceRepo/checkUrlInput'),
};

exports.services = services;
