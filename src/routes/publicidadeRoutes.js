const express = require('express');
const { createPublicidade, listarPublicidade, updatePublicidade, deletePublicidade, getPublicidadeById } = require('../controllers/publicidadeController');
const { protect } = require('../middlewares/authMiddleware');

const router = express.Router();

router.post('/registar', createPublicidade);
router.get('/listar', listarPublicidade);
router.put('/update/:id', protect, updatePublicidade);
router.delete('/delete/:id', protect, deletePublicidade);
router.get('/listarPeloId/:id', protect, getPublicidadeById);

module.exports = router;