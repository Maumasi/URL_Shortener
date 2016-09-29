
module.exports = (express) => {
  var router = express.Router();

  router.get('/', (req, res) => {

    // req.get('host') == the current host
    var host = `http://${req.get('host')}/maumasi-fy`;
    var hello = 'world';

    res.json({hello, host});
  });

  router.get('/status', (req, res) => {
    res.json({healthy: true});
  });

  return router;
}
