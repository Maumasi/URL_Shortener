
const maumasiFyURL = require('../../models/db_crud').table('maumasiFyURL');
const log = require('log-me');

module.exports = (express) => {
  const router = express.Router();

  // Route: /go/:linkKey
  // Method: get
  // Use: retrevie link from the DB
  router.get('/:linkKey', (req, res) => {
    const postBody = req.body;
    postBody.maumasiFyKey = req.params.linkKey;

    maumasiFyURL.findByLinkKey(

      // maumasiFyURL.findByLinkKey: payload
      postBody,

      // maumasiFyURL.findByLinkKey: error function
      (err) => {
        res.status(500).json(err);

        log(err, __filename,
          'Route: /go/:linkKey',
          `Failed to redirect using link key: ${req.params.linkKey}`);
      },

      // maumasiFyURL.findByLinkKey: success function
      (data) => {
        res.redirect(301, data.originalURL.originalURL);
      });
  });

  return router;
};
