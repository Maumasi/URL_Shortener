
module.exports = (express) => {


  const router = express.Router();
  const randomLinkId = require('../../util/linkIdMaker');





  // Route: /api/v1/status
  // Method: get
  // Use: get current status of the API
  router.use('/status', (req, res) => {
    res.json({stable: true});
  });





// Route: /api/v1/newlink
// Method: get
// Use: returns a maumasi.fy link
// Note: ${req.protocol}:// to use http or https
  // router.get('/url', (req, res) => {
  //
  //   var linkId = randomLinkId();
  //   var maumasi_fied_link = `${req.get('host')}/maumasi.fy/${linkId}`;
  //   // var hello = 'world';
  //
  //   res.json({maumasi_fied_link});
  // });



  // Route: /api/v1/newlink
  // Method: post
  // Use: returns a maumasi.fy link
  // Note: ${req.protocol}:// to use http or https
    router.post('/url', (req, res) => {

      var linkId = randomLinkId();
      var maumasi_fied_link = `${req.get('host')}/maumasi.fy/${linkId}`;
      var originalUrl = req.body.originalUrl || null;
      // var hello = 'world';

      res.json({maumasi_fied_link, originalUrl});
    });



  return router;
}
