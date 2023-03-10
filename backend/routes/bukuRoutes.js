const bukuController = require('../controllers/bukuController');
const router = require('express').Router();

router.post('/', bukuController.createBook);
router.get('/', bukuController.getAllBooks);
router.get('/:id', bukuController.findOneBook);
router.put('/:id', bukuController.updateBook);
router.delete('/:id', bukuController.deleteBook);
router.get('/kategori/:kategori', bukuController.getBookByCategory);
router.get('/pengarang/:pengarang', bukuController.getBookByPengarang);
router.get('/tahun-terbit/:terbit', bukuController.getBookByTahunTerbit);
router.get('/penerbit/:penerbit', bukuController.getBookByPenerbit);

module.exports = router;