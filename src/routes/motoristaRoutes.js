const express = require('express');
const { createMotorista, listarMotorista, updateMotorista, deleteMotorista, getMotoristaById } = require('../controllers/motoristaController');
const { protect } = require('../middlewares/authMiddleware');

const router = express.Router();

router.post('/registar',protect, createMotorista);
router.get('/listar',protect, listarMotorista);
router.put('/update/:id', protect, updateMotorista);
router.delete('/delete/:id', protect, deleteMotorista);
router.get('/listarPeloId/:id', protect, getMotoristaById);

module.exports = router;