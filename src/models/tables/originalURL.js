
module.exports = (Sequelize, sequelize) => {
  const originalURL = sequelize.define('originalURL', {

    originalURL: {
      type: Sequelize.STRING,
      validate: {
        // isUrl: true,  <----- this check is causing good URLs to be rejected
      },
    },

  });

  return originalURL;
};
