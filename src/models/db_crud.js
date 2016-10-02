
const db = require('./db');

// obj of tables in the DB
const tables = {
  maumasiFyURL: db.maumasiFyURL,
  originalURL: db.originalURL,
};


exports.table = (table) => {
  const dbInteractions = {

// ==========================================   CREATE
    // same as create: () => {...}
    create(payload, err, success) {
      tables[table].create(payload).then(success).catch(err);
    },

  // ==========================================   READ
    findByLinkKey(payload, err, success) {
      tables[table].find({
        where: {
          maumasiFyKey: payload.maumasiFyKey,
        },
        include: [{
          all: true,
          nested: true,
        }],
      }).then(success).catch(err);
    },

  // ==========================================   READ
    findByUrl(payload, err, success) {
      tables[table].find({
        where: {
          originalURL: payload.originalURL,
        },
        include: [{
          all: true,
          nested: true,
        }],
      }).then(success).catch(err);
    },

  // ==========================================   READ
    findByOriginalUrlId(payload, err, success) {
      tables[table].find({
        where: {
          originalURL_ID: payload.id,
        },
        include: [{
          all: true,
          nested: true,
        }],
      }).then(success).catch(err);
    },
  // ==========================================   UPDATE

  // ==========================================   DELETE
    destroy(payload, err, success) {
      console.log(payload);
      tables[table].destroy({
        where: {
          id: payload.id,
        },
      }).then(success).catch(err);
    },
  };// dbInteractions obj

  return dbInteractions;
};// exports.careateRecord
