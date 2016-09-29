
module.exports = (express) => {
// exports default function routes(express) {


  var router = express.Router();
  const URL_API = '/api/v1';
  const URL_SMALL_LINK = '/maumasi-fy/:linkId';




  router.get(URL_API, (req, res) => {

    // req.get('host') == the current host
    var maumasi_fied_link = `${req.protocol}://${req.get('host')}/maumasi-fy`;
    var hello = 'world';

    res.json({hello, maumasi_fied_link});
  });

  router.get(URL_SMALL_LINK, (req, res) => {
    var link = req.params.linkId;

    // TODO: make a DB search for the linkId
    //      to grab the stored link by ID

    // redirect to link
    // return res.redirect(302, 'https://davidwalsh.name/express-redirect-301');
    res.json({link});
  });

  return router;
}


// exports {routes};
