const db = require('../models');
const Buku = db.bukus;

exports.createBook = async (req, res ) => {
  try {
    const data = await Buku.create(req.body);
    res.json({
      message: 'Buku sukses ditambahkan',
      data
    });
  } catch(error) {
    res.status(500).json({
      message: error.message,
      data: null
    });
  }
};

exports.getAllBooks = async (_, res) => {
  try {
    const bukus = await Buku.findAll();
    res.json({
      message: 'Sukses mengambil semua data buku',
      data: bukus
    });
  } catch(error) {
    res.status(500).json({
      message: error.message,
      data: null
    });
  }
};

exports.updateBook = async (req, res) => {
  try {
    const id = req.params.id;
    
    const buku = await Buku.findByPk(id, { rejectOnEmpty: true });
    buku.update(req.body, {
      where: { id }
    });
    res.json({
      message: 'Data buku berhasil diubah',
      data: buku
    });
  } catch(error) {
    res.status(500).json({
      message: error.message || 'Terjadi error ketika mengambil data buku',
      data: null
    });
  }
};

exports.deleteBook = async (req, res) => {
  try {
    const buku = await Buku.findByPk(req.params.id, { rejectOnEmpty: true });

    buku.destroy();
    
    res.json({
      message: 'Data buku berhasil dihapus'
    });
  } catch(error) {
    res.status(500).json({
      message: error.message || 'Terjadi error ketika mengambil data buku',
      data: null
    });
  }
};

exports.findOneBook = async (req, res) => {
  try {
    const id = req.params.id;
    const buku = await Buku.findByPk(id, { rejectOnEmpty: true });
    res.json({
      message: `Berhasil mengambil data buku dengan id ${id}`,
      data: buku
    });
  } catch(error) {
    res.status(500).json({
      message: error.message || 'Terjadi error ketika mengambil data buku',
      data: null
    });
  }
};

exports.getBookByCategory = async (req, res) => {
  try {
    const kategori = req.params.kategori;
    const bukus = await Buku.findAll({
      where: {
        kategori_buku: kategori 
      }
    });
    res.json({
      message: `Berhasil mengambil data buku dengan kategori ${kategori}`,
      data: bukus
    });
  } catch(error) {
    res.status(500).json({
      message: error.message || 'Terjadi error ketika mengambil data buku',
      data: null
    });
  }
};

exports.getBookByPengarang = async (req, res) => {
  try {
    const pengarang = req.params.pengarang;
    const bukus = await Buku.findAll({
      where: {
        nama_pengarang: pengarang 
      }
    });
    res.json({
      message: `Berhasil mengambil data buku dengan pengarang ${pengarang}`,
      data: bukus
    });
  } catch(error) {
    res.status(500).json({
      message: error.message || 'Terjadi error ketika mengambil data buku',
      data: null
    });
  }
};

exports.getBookByTahunTerbit = async (req, res) => {
  try {
    const tahunTerbit = req.params.terbit;
    const bukus = await Buku.findAll({
      where: {
        tahun_terbit: tahunTerbit
      }
    });
    res.json({
      message: `Berhasil mengambil data buku dengan tahun terbit ${tahunTerbit}`,
      data: bukus
    });
  } catch(error) {
    res.status(500).json({
      message: error.message || 'Terjadi error ketika mengambil data buku',
      data: null
    });
  }
};

exports.getBookByPenerbit = async (req, res) => {
  try {
    const penerbit = req.params.penerbit;
    const bukus = await Buku.findAll({
      where: {
        penerbit
      }
    });
    res.json({
      message: `Berhasil mengambil data buku dengan penerbit ${penerbit}`,
      data: bukus
    });
  } catch(error) {
    res.status(500).json({
      message: error.message || 'Terjadi error ketika mengambil data buku',
      data: null
    });
  }
};