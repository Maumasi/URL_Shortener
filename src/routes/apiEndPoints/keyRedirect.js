
const maumasiFyURL = require('../../models/db_crud').table('maumasiFyURL');
// const originalURL = require('../../models/db_crud').table('originalURL');

module.exports = (express) => {
  const router = express.Router();

  // Route: /maumasi.fy/:linkKey
  // Method: get
  // Use: retrevie link from the DB
  router.get('/:linkKey', (req, res) => {
    req.body.maumasiFyKey = req.params.linkKey;

    const linkKey = req.body;

    maumasiFyURL.findByLinkKey(
      // Send to DB
      linkKey,

      // Error handling
      (err) => {
        // console.log('Failed to redirect. Error: ' + err);
        res.status(500).json(err);
      },

      // Success func
      (data) => {
        res.redirect(301, data.originalURL.originalURL);
      }
    );
  });

  return router;
};
