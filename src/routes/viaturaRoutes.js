const express = require('express');
const { createViatura, listarViatura, updateViatura, deleteViatura, getViaturaById } = require('../controllers/viaturaController');
const { protect } = require('../middlewares/authMiddleware');

const router = express.Router();

router.post('/registar',protect, createViatura);
router.get('/listar',protect, listarViatura);
router.put('/update/:id',protect, updateViatura);
router.delete('/delete/:id',protect, deleteViatura);
router.get('/listarPeloId/:id',protect, getViaturaById);

module.exports = router;