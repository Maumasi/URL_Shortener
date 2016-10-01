
const ping = require('ping');
// const sessions = require('express-session');
const prep = require('../services/services').services.pingPreper;

// module.exports = (req, res, next) => {

module.exports = (req, res, url) => {


  // const url = req.body;

  // var host = 'google.com';
  var host = prep(url.originalURL);

  return ping.promise.probe(host);
    // .then(function (data) {
    //     console.log(data);
    //     // req.Tbody = res.json(res);
    //     // console.log('inside: '+ req.Tbody);
    //     pingTest = res.alive;
    //
    //     // return data;
    //
    // });

    // return data;


}
