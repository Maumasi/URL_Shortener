const log = require('../../../utility/util');
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
      log(null, __filename,
        'Service: rootUrlExists',
        'URL is unreachable');

      isActive = false;
    }
    callback(isActive);
  }

  log(null, __filename,
    'Service: rootUrlExists',
    'rootUrlExists executed');

  request(options, evaluateUrl);
};
