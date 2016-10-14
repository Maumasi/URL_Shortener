const log = require('log-me');
const request = require('request');

module.exports = (url, res, callback) => {
  const options = {
    url: url.originalURL,
  };

  function evaluateUrl(response) {
    let isActive;
    const status = response.statusCode;
    if (status <= 308) {
      isActive = true;
    } else {
      log(null, __filename,
        'Service: rootUrlExists',
        `URL is unreachable with status code of: ${status}`);
      isActive = false;
    }
    callback(isActive);
  }

  log(null, __filename,
    'Service: rootUrlExists',
    'rootUrlExists executed');

  request(options, evaluateUrl(res));
};
