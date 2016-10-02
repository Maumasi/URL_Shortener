
const maumasiFyURL = require('../../models/db_crud').table('maumasiFyURL');
const originalURL = require('../../models/db_crud').table('originalURL');

module.exports = (express) => {
  const router = express.Router();

  // Route: /maumasi.fy/remove-url/:linkKey
  // Method: get
  // Use: retrevie link from the DB
  // /maumasi.fy/remove-url/1QQhh5
  router.get('/:linkKey', (req, res) => {
    req.body.maumasiFyKey = req.params.linkKey;

    const linkKey = req.body;

    console.log(linkKey);

    // maumasiFyURL.findByLinkKey(req.body,
    //   (err) => {
    //     console.log('Error: ' + err);
    //   },
    //
    //   (urlToBeRemoved) => {
    //     console.log('URL to be removed: ');
    //     // console.log(urlToBeRemoved.dataValues);
    //     console.log('key ID: ' + urlToBeRemoved.dataValues.id);
    //     console.log('URL ID: ' + urlToBeRemoved.dataValues.originalURL_ID);
    //     // ===================================  Begin close
    //
    //
    //
    //     // ===================================  Success close
    //   }
    // );




  //   maumasiFyURL.destroy(
  //     // Send to DB
  //     linkKey,
  //
  //     // Error handling
  //     (err) => {
  //       // console.log('Failed to redirect. Error: ' + err);
  //       res.status(500).json(err);
  //     },
  //
  //     // Success func
  //     (data) => {
  //       console.log(` ${req.params.linkKey}`);
  //       // res.redirect(301, '/');
  //     }
  //   );
  // });

  return router;
};

// const maumasiFyURL = require('../../models/db_crud').table('maumasiFyURL');
// const originalURL = require('../../models/db_crud').table('originalURL');
//
// module.exports = (express) => {
//   const router = express.Router();
//
//   // Route: /maumasi.fy/remove-url/:linkKey
//   // Method: get
//   // Use: retrevie link from the DB
//   // /maumasi.fy/remove-url/1QQhh5
//   router.get('/remove-url/:linkKey', (req, res) => {
//     var keyId;
//     var urlId;
//
//
//     const deleteRequest = {
//       maumasiFyKey: req.params.linkKey,
//     };
//
//     maumasiFyURL.findByLinkKey(
//       deleteRequest,
//       (err) => {
//         console.log('Error: ' + err);
//       },
//
//       (urlToBeRemoved) => {
//
//         keyId = urlToBeRemoved.dataValues.id;
//         urlId = urlToBeRemoved.dataValues.originalURL_ID
//         console.log('URL to be removed: ');
//         // console.log(urlToBeRemoved.dataValues);
//         console.log('key ID: ' + keyId);
//         console.log('URL ID: ' + urlId);
//
//         maumasiFyURL.destroy(
//           // Send to DB
//           { id: keyId },
//           // Error handling
//           (err) => {
//             // console.log('Failed to redirect. Error: ' + err);
//             res.status(500).json(err);
//           },
//           // Success func
//           () => {
//             originalURL.destroy(
//               // Send to DB
//               { id: urlId },
//               // Error handling
//               (err) => {
//                 // console.log('Failed to redirect. Error: ' + err);
//                 res.status(500).json(err);
//               },
//               // Success func
//               () => {
//                 console.log('records deleted');
//                 res.redirect(301, '/');
//               })// originalURL.destroy
//           })// maumasiFyURL.destroy
//   });// maumasiFyURL.findByLinkKey
//
//   return router;
// });
