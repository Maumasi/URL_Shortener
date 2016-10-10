
const ping = require('ping');
const prep = require('./pingPreper');
const log = require('../../../utility/util');

module.exports = (req, res, url) => {
  let host;
  if (url.originalURL) {
    host = prep(url.originalURL);
  } else {
    host = prep(url);
  }

  log(null, __filename,
    'Service: ckeckUrlInput',
    'ckeckUrlInput executed');

  return ping.promise.probe(host);
};
