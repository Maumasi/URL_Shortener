
module.exports = (express) => {


  const router = express.Router();

  // Route: /maumasi.fy/:wild_card
  // Method: get
  // Use: retrevie link from the DB
  router.get('/:linkId', (req, res) => {

    // TODO: make a DB search for the linkId to grab
    //      the stored originalLink by it's ID

    var linkId = req.params.linkId;

    // redirect to link
    // res.redirect(302, 'https://davidwalsh.name/express-redirect-301');
    var originalLink = res.redirect(302, originalLink) || null;
    var err = originalLink ? null : 'Oops, this maumasi.fy link is broken. Please maumasi.fy your link once more.'

    var link = {
      linkId,
      originalLink,
      err,
    };

    res.json({link});
  });





  return router;
}
