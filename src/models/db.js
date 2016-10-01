
console.log('DB script reached');

const Sequelize = require('sequelize');

// only used in the dev environment
// require('../../.env');
require('dotenv').config({ path: '../.env' });

// DB_NAME='MaumasiFy'
// DB_USER='root'
// DB_PW='root'
// DB_HOST='localhost'
// DB_SCHEMA='mysql'
// DB_PORT=3306


// connect to the db
const sequelize  = new Sequelize(process.env.DB_NAME, process.env.DB_USER, process.env.DB_PW, {
  host: process.env.DB_HOST,
  dialect: process.env.DB_SCHEMA,
  port: 3306,
  pool: {
    min: 5,
    max: 0,
    idle: 1000,
  },
  logging: false,
});



// ==========================   tables

// table name: originalURL
// fields:
//  - originalURL
const originalURL = require('./tables/originalURL')(Sequelize, sequelize);


// table name: maumasiFyURL
// fields:
//  - maumasiFyURL
const maumasiFyURL = require('./tables/maumasiFyURL')(Sequelize, sequelize);



// ==========================   relationships

// connect the two tables
maumasiFyURL.belongsTo(originalURL, {
  foreignKey: 'originalURL_ID',
});


// The following line should only be ran when changes to the DB are made and DB
// records are safely stored some where because this will truncate all tables
// every time the server is started up!!!

// sequelize.sync({force: true});

sequelize.sync();

exports.sequelize = sequelize;
exports.originalURL = originalURL;
exports.maumasiFyURL = maumasiFyURL;
