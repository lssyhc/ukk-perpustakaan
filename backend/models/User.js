module.exports = (sequelize, Sequelize) => {
  const User = sequelize.define('user', {
    nama: {
      type: Sequelize.STRING
    },
    username: {
      type: Sequelize.STRING
    },
    password: {
      type: Sequelize.STRING
    },
    role: {
      type: Sequelize.ENUM('Admin', 'Peminjam')
    }
  });

  return User;
};