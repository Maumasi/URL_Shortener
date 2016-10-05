
const db = require('./db');


// obj of tables in the DB
const tables = {
  maumasiFyURL: db.maumasiFyURL,
  originalURL: db.originalURL,
};


exports.table = (table) => {
  const dbInteractions = {

// ==========================================   CREATE
    // same as create: () => {...} this is short hand for annonimus functions in an object
    create(payload, err, success) {
      tables[table].create(payload).then(success).catch(err);
    },

  // ==========================================   READ: find by short link key
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

  // ==========================================   READ: find by full original URL
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

  // ==========================================   READ: find by originalURL table ID
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

  // ==========================================   READ: find all records in DB
    findAllRecords(err, success) {
      tables[table].findAll({
        include: [{
          all: true,
          nested: true,
        }],
      }).then(success).catch(err);
    },

  // ==========================================   UPDATE
    updateUrlByShortKey(payload, err, success) {
      tables[table].find({
        where: {
          maumasiFyKey: payload.maumasiFyKey,
        },
      })
      .then((shortKeyJoinUrl) => {
        // if success, update the URL in DB
        tables.originalURL.find({
          where: {
            id: shortKeyJoinUrl.originalURL_ID,
          },
        }).then((currentUrl) => {
          currentUrl.updateAttributes(payload.urlUpdate).then(success).catch(err);
        }).catch(err);// tables.originalURL.find
      }).catch(err);// tables[table].find
    },

  // ==========================================   DELETE
    destroy(payload, err, success) {
      tables[table].destroy({
        where: {
          id: payload.id,
        },
      }).then(success).catch(err);
    },
  };// dbInteractions obj

  return dbInteractions;
};// exports.careateRecord
