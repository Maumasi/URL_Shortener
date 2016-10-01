
const db = require('./db');

// obj of tables in the DB
var tables = {
  'maumasiFyURL': db.maumasiFyURL,
  'originalURL': db.originalURL,
}


exports.table = (table) => {

  // console.log(tables[table]);
  var careateRecord = {

// ==========================================   CREATE
    // same as create: () => {...}
    create(payload, err, success) {
      tables[table].create(payload).then(success).catch(err);
    },

  // ==========================================   READ
    findByLinkKey(payload, err, success) {
      tables[table].find({
        where: {
          maumasiFyKey: payload.maumasiFyKey
        },
        include: [{
          all: true,
          nested: true
        }]
      }).then(success).catch(err);
    },

  // ==========================================   UPDATE

  // ==========================================   DELETE

  }// careateRecord obj

  return careateRecord;
}// exports.careateRecord
