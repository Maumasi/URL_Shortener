const log = require('log-me');
const request = require('request');

module.exports = (url, callback) => {
  const options = {
    url: url.originalURL,
  };

  // function evaluateUrl(error, response) {
  //   let isActive;
  //   const status = response.statusCode;
  //   if (!error && status <= 308) {
  //     isActive = true;
  //   } else {
  //     log(error, __filename,
  //       'Service: rootUrlExists',
  //       `URL is unreachable with status code of: ${status}`);
  //     isActive = false;
  //   }
  //   callback(isActive);
  // }

  log(null, __filename,
    'Service: rootUrlExists',
    'rootUrlExists executed');

  request(options, (err, response, body) => {
    let isActive;
    // const status = response.statusCode;
    log(null, __filename, body);
    // log(null, __filename, status);
    if (body) {
      isActive = true;
    } else {
      log(null, __filename,
        'Service: rootUrlExists',
        `URL is unreachable with status code of: ${status}`);
      isActive = false;
    }
    callback(isActive);
  });
};
