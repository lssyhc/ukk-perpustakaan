module.exports = (sequelize, Sequelize) => {
  const Buku = sequelize.define('buku', {
    judul: {
      type: Sequelize.STRING
    },
    stok: {
      type: Sequelize.INTEGER
    },
    kategori: {
      type: Sequelize.ENUM('Fiksi', 'Nonfiksi', 'Ensiklopedia', 'Kuliner', 'Seni', 'Agama')
    },
    pengarang: {
      type: Sequelize.STRING
    },
    penerbit: {
      type: Sequelize.STRING
    },
    tahun_terbit: {
      type: Sequelize.INTEGER
    },
    gambar: {
      type: Sequelize.STRING(9999)
    }
  });

  return Buku;
};