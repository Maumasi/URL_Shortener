
const ping = require('ping');
const prep = require('../services/services').services.pingPreper;

// module.exports = (req, res, next) => {

module.exports = (req, res, url) => {

  // var host = 'google.com';
  host = prep(url.originalURL);
  var t = {};

  ping.promise.probe(host)
        .then(function (res) {
            // console.log(res);
            t = res;
            return res;
        });

  // console.log(t);
  var cfg = {
      timeout: 10,
      // WARNING: -i 2 may not work in other platform like window
      extra: ["-i 2"],
  };

  ping.sys.probe(host, function(isAlive){
      var msg = isAlive ? 'host ' + host + ' is alive' : 'host ' + host + ' is dead';
      // console.log(msg);
      req.param.msg = msg;
  }, cfg)

      console.log(req.param.msg);
  return req.param.msg;
}
