
const maumasiFyURL = require('../../models/db_crud').table('maumasiFyURL');
const originalURL = require('../../models/db_crud').table('originalURL');
const shortKeyExtractor = require('../../services/services').services.shortKeyExtractor;

module.exports = (express) => {
  const router = express.Router();

  // Route: /maumasi.fy/remove-url/:linkKey
  // Method: get
  // Use: delete record from DB
  router.post('/', (req, res) => {
    var keyId;
    var urlId;

    const deleteRequest = {
      maumasiFyKey: shortKeyExtractor(req.body.maumasiFyKey),
    };

    maumasiFyURL.findByLinkKey(
      deleteRequest,
      (err) => {
        console.log('Error: ' + err);
      },

      (urlToBeRemoved) => {
        keyId = urlToBeRemoved.dataValues.id;
        urlId = urlToBeRemoved.dataValues.originalURL_ID;
        console.log('URL to be removed: ');
        // console.log(urlToBeRemoved.dataValues);
        console.log('key ID: ' + keyId);
        console.log('URL ID: ' + urlId);

        maumasiFyURL.destroy(
          // Send to DB
          { id: keyId },
          // Error handling
          (err) => {
            // console.log('Failed to redirect. Error: ' + err);
            res.status(500).json(err);
          },
          // Success func
          () => {
            originalURL.destroy(
              // Send to DB
              { id: urlId },
              // Error handling
              (err) => {
                // console.log('Failed to redirect. Error: ' + err);
                res.status(500).json(err);
              },
              // Success func
              () => {
                console.log('records deleted');
                res.redirect(301, '/');
              });// originalURL.destroy
          });// maumasiFyURL.destroy
      });// maumasiFyURL.findByLinkKey
  });

  return router;
};
