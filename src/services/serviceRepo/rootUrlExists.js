
// const extractRootUrl = require('./pingPreper');
const request = require('request');

module.exports = (url, callback) => {
  const options = {
    url: url.originalURL,
  };

  function evaluateUrl(error, response) {
    let isActive;
    if (!error && response.statusCode <= 308) {
      // console.log(response.statusCode);
      isActive = true;
    } else {
      console.log('URL is unreachable');
      isActive = false;
    }
    callback(isActive);
  }

  request(options, evaluateUrl);
};
