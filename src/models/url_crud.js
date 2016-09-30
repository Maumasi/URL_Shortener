
const db = require('./db');

exports.create = (data, err, success) => {

// TODO: run sanitize func on data before passing it along. IF it passes
//       sanitation then run create func else throw an error

  db.maumasiFyURL.create(data).then(success).catch(err);
}
