const express = require('express');
const { createPlanoManutencao, listarPlanoManutencao, updatePlanoManutencao, deletePlanoManutencao } = require('../controllers/planoManutencaoController');
const { protect } = require('../middlewares/authMiddleware');

const router = express.Router();

router.post('/registar', createPlanoManutencao);
router.get('/listar', listarPlanoManutencao);
router.put('/update/:id', protect, updatePlanoManutencao);
router.delete('/delete/:id', protect, deletePlanoManutencao);

module.exports = router;