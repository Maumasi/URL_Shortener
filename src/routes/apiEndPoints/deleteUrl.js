
const maumasiFyURL = require('../../models/db_crud').table('maumasiFyURL');
const originalURL = require('../../models/db_crud').table('originalURL');
const shortKeyExtractor = require('../../services/services').services.shortKeyExtractor;
const log = require('../../../utility/util');

module.exports = (express) => {
  const router = express.Router();

  // Route: /v1/remove-url/:linkKey
  // Method: get
  // Use: delete record from DB
  router.post('/', (req, res) => {
    let keyId;
    let urlId;

    const deleteRequest = {
      maumasiFyKey: shortKeyExtractor(req.body.maumasiFyKey),
    };

    maumasiFyURL.findByLinkKey(

      // maumasiFyURL.findByLinkKey: payload
      deleteRequest,

      // maumasiFyURL.findByLinkKey: error function
      (err) => {
        log(err, __filename,
          'Route: /v1/remove-url/:linkKey',
          'Find by link key failed.');
      },

      // maumasiFyURL.findByLinkKey: success function
      (urlToBeRemoved) => {
        // assign key ID and URL ID to vars to find this record for deletion
        keyId = urlToBeRemoved.dataValues.id;
        urlId = urlToBeRemoved.dataValues.originalURL_ID;

        log(null, __filename,
          'Route: /v1/remove-url/:linkKey',
          `Link key removed by ID: ${keyId}\n
          URL delete by ID: ${urlId}`);

        maumasiFyURL.destroy(

          // object identifier
          { id: keyId },

          // error handling
          (err) => {
            // console.log('Failed to redirect. Error: ' + err);
            res.status(500).json(err);
          },

          // success func
          () => {
            // if this key is deleted then delete the original URL
            originalURL.destroy(

              // object identifier
              { id: urlId },

              // error handling
              (err) => {
                // console.log('Failed to redirect. Error: ' + err);
                res.status(500).json(err);
              },

              // success func
              () => {
                console.log('record deleted');

                // redirect back to the home page
                res.redirect(301, '/');
              });// originalURL.destroy
          });// maumasiFyURL.destroy
      });// maumasiFyURL.findByLinkKey
  });

  return router;
};
