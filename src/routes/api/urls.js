
// const sessions = require('express-session');

const maumasiFyURL = require('../../models/db_crud').table('maumasiFyURL');
const originalURL = require('../../models/db_crud').table('originalURL');

const services = require('../../services/services').services;
const urlChecker = require('../../middleware/checkUrlInput');

// console.log(table.careateRecord('maumasiFyURL').create);

// TODO: run sanitize func on data before passing it along. IF it passes
//       sanitation then run create func else throw an error



module.exports = (express) => {

  const router = express.Router();


  // const ping = require('ping');


  // var host = services.pingPreper('https://www.google.com/webhp?sourceid=chrome-instant&ion=1&espv=2&ie=UTF-8#safe=active&q=test');
  // // console.log(host);
  //
  //
  // ping.sys.probe(host, (isAlive) => {
  //
  //     var msg = isAlive ? 'host ' + host + ' is alive' : 'host ' + host + ' is dead';
  //     console.log(msg);
  //     return isAlive;
  // });


// ==========================================   API status
  // Route: /api/v1/status
  // Method: get
  // Use: get current status of the API
  router.use('/status', (req, res) => {
    res.json({stable: true});
  });


// ==========================================   Middleware: sanitize user input








// ==========================================   submit to database
  // Route: /api/v1/url
  // Method: post
  // Use: creates records in the database and returns the user input URL and a maumasi.fy link for that link
  // Note: ${req.protocol}:// to use http or https
    router.post('/url', (req, res, next) => {

      var original_ID;
      var linkKey = services.randomKey();

      // req.param.msg = false;

      var maumasiFy_link = `${req.protocol}://${req.get('host')}/maumasi.fy/${linkKey}`;
      var submitedURL = req.body || null;

      // pingTest = false;
      req.pingTest = urlChecker(req, res, submitedURL);

      req.pingTest.then((data) => {

        // console.log(data);

        req.urlBody = data;

        console.log('req.urlBody: '+ req.urlBody.alive);

        if (data.alive) {

          // submit to DB
          originalURL.create(
            submitedURL,

            (err) => {
              res.status(500).json(err);
              console.log('Error ' + err);
            },

            (submitedURL) => {

              // add maumasi.fy link to obj before sending back a response
              submitedURL.dataValues.maumasi_fied_link = maumasiFy_link;

              res.status(200).json(submitedURL);
              original_ID = submitedURL.dataValues.id;
            });// originalURL.create

          // wait for the code above to finish before try to create a maumasiFyURL record
          res.on('finish', () => {
            maumasiFyURL.create(
              {
                maumasiFyKey: linkKey,
                originalURL_ID: original_ID,
              },

              (err) => {
                res.status(500).json(err);
                console.log('Error ' + err);
              },
              () => {
                console.log('New record created');
              }
            );// maumasiFyURL.create
          });// res.finish

        }else{
          console.log('link failed: ' + req.body.originalURL);


        }// if
      });// then

    });// router.post

  return router;
}
