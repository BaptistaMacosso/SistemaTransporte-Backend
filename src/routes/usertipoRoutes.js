const express = require('express');
const { createUsertipo, listarUsertipo } = require('../controllers/tipoUserController');

const router = express.Router();

router.post('/registar', createUsertipo);
router.get('/listar', listarUsertipo);


module.exports = router;