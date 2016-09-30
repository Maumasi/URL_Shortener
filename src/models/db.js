
const Sequelize = require('sequelize');

// only used in the dev environment
require('dotenv').config();

// connect to the db
const sequelize  = new Sequelize(process.env.DB_NAME, process.env.DB_USER, process.env.DB_PW, {
  host: process.env.DB_HOST,
  dialect: process.env.DB_SCHEMA,
  port: process.env.DB_PORT,
  pool: {
    min: 5,
    max: 0,
    idle: 1000,
  },
  logging: false,
});


// table name: originalURL
// fields:
//  - originalURL
require('./tables/originalURL');


// table name: maumasiFyURL
// fields:
//  - maumasiFyURL
require('./tables/maumasiFyURL');


// connect the two tables
maumasiFyURL.belongsTo(originalURL, {
  foreignKey: 'originalURL_ID',
});

sequilize.sync();

exports.sequelize = sequelize;
exports.originalURL = originalURL;
exports.maumasiFyURL = maumasiFyURL;
