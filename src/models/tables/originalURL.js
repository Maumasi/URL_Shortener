
module.exports = (Sequelize, sequelize) => {

  const originalURL = sequelize.define('originalURL', {

    originalURL: {
      type: Sequelize.STRING,
    }

  });

  return originalURL;
}
