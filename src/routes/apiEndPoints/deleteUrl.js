
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

      // object identifier
      deleteRequest,

      // errors
      (err) => {
        console.log('Error: ' + err);
      },

      // success
      (urlToBeRemoved) => {
        // assign key ID and URL ID to vars to find this record for deletion
        keyId = urlToBeRemoved.dataValues.id;
        urlId = urlToBeRemoved.dataValues.originalURL_ID;

        console.log('URL to be removed: ');
        // console.log(urlToBeRemoved.dataValues);
        console.log('key ID: ' + keyId);
        console.log('URL ID: ' + urlId);

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
