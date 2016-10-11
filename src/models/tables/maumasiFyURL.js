
module.exports = (Sequelize, sequelize) => {
  const maumasiFyURL = sequelize.define('maumasiFyURL', {
    maumasiFyKey: {
      type: Sequelize.STRING,
      unique: true,
      validate: {},
    },
  });

  return maumasiFyURL;
};
