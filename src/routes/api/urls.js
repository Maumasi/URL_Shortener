
module.exports = (express) => {


  const router = express.Router();
  const randomLinkId = require('../../util/linkIdMaker');

  var linkId = randomLinkId();



  // Route: /api/v1/status
  // Method: get
  // Use: get current status of the API
  router.use('/status', (req, res) => {
    res.json({healthy: true});
  });





// Route: /api/v1/newlink
// Method: post
// Use: returns a maumasi.fy link
  router.post('/newlink', (req, res) => {

    var maumasi_fied_link = `${req.get('host')}/maumasi.fy/${linkId}`;
    var hello = 'world';

    res.json({hello, maumasi_fied_link});
  });


  return router;
}
