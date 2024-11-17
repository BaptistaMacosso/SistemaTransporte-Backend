const express = require('express');
const { 
    createManutencao, 
    listarManutencao,  
    deleteManutencao
} = require('../controllers/manutencaoController');
const { protect } = require('../middlewares/authMiddleware');

const router = express.Router();

router.post('/registar', protect, createManutencao);
router.get('/listar', protect, listarManutencao);
router.delete('/delete/:id', protect, deleteManutencao);

module.exports = router;