
const ping = require('ping');
const prep = require('./pingPreper');

module.exports = (req, res, url) => {
  let host;
  if (url.originalURL) {
    host = prep(url.originalURL);
  } else {
    host = prep(url);
  }

  return ping.promise.probe(host);
};
