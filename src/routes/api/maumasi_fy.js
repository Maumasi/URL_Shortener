
const maumasiFyURL = require('../../models/db_crud').table('maumasiFyURL');
const originalURL = require('../../models/db_crud').table('originalURL');




module.exports = (express) => {


  const router = express.Router();

  // Route: /maumasi.fy/:wild_card
  // Method: get
  // Use: retrevie link from the DB
  router.get('/:linkKey', (req, res) => {

    // // TODO: make a DB search for the linkId to grab
    // //      the stored originalLink by it's ID
    //
    // var linkId = req.params.linkId;
    //
    // // redirect to link
    // // res.redirect(302, 'https://davidwalsh.name/express-redirect-301');
    // var originalLink = originalLink || null;
    // var err = originalLink ? null : 'Oops, this maumasi.fy link is broken. Please maumasi.fy your link once more.'
    //
    // var link = {
    //   linkId,
    //   originalLink,
    //   err,
    // };
    //
    // res.json({link});

    req.body.maumasiFyKey = req.params.linkKey

    maumasiFyURL.findByLinkKey(
      req.body,

      (err) => {
        console.log('Failed to redirect. Error: ' + err);
        res.status(500).json(err);
      },

      (data) => {

        res.redirect(301, data.originalURL.originalURL);
      }
    );

    // console.log(maumasiFyURL.findByLinkKey(req.body, '', ''));



  });





  return router;
}
