// routes/index.js
const express = require('express');
const router = express.Router();
const pedidoController = require('../controllers/pedidoController');
const prestadorController = require('../controllers/prestadorController');
const { protect } = require('../middlewares/authMiddleware');
const userController = require('../controllers/userController');
const motoristaController = require('../controllers/motoristaController');
const viaturaController = require('../controllers/viaturaController');
const tipoUserController = require('../controllers/tipoUserController');
const licencaPublicidadeController = require('../controllers/licencaPublicidadeController');
const licencaTransportacaoController = require('../controllers/licencaTransportacaoController');
const statusManutencaoController = require('../controllers/statusManutencaoController');
const tiposManutencaoController = require('../controllers/tipoManutencaoController');
const checkListViatura = require('../controllers/checklistController');



// Rotas para Pedido
router.post('/pedidos/novo', protect, pedidoController.createPedido); // Criar Pedido
router.get('/pedidos/listar', protect, pedidoController.getAllPedidos); // Listar Pedidos
router.get('/pedidos/listarPeloId/:id', protect, pedidoController.getPedidoById); // Obter Pedido por ID
router.put('/pedidos/update/:id', protect, pedidoController.updatePedido); // Atualizar Pedido
router.delete('/pedidos/delete/:id', protect, pedidoController.deletePedido); // Deletar Pedido

// Rotas para Prestador
router.post('/prestadores/novo', protect, prestadorController.createPrestador); // Criar Prestador
router.get('/prestadores/listar', protect, prestadorController.getAllPrestadores); // Listar Prestadores
router.get('/prestadores/listarPeloId/:id', protect, prestadorController.getPrestadorById); // Obter Prestador por ID
router.put('/prestadores/update/:id', protect, prestadorController.updatePrestador); // Atualizar Prestador
router.delete('/prestadores/delete/:id', protect, prestadorController.deletePrestador); // Deletar Prestador

// Rotas de usuários
router.post('/usuario/novo', userController.registerUser);
router.get('/usuario/listar',protect, userController.listarUser);
router.post('/auth/login', userController.loginUser);
router.get('/usuario/listarPeloId/:id', protect, userController.getUserById);
router.get('/usuario/profile', protect, userController.getUserProfile);
router.put('/usuario/update/profile', protect, userController.updateUserProfile);
router.put('/usuario/update/:id', protect, userController.updateUser);
router.delete('/usuario/delete/:id',protect, userController.deleteUser);

//Rotas Motoristas
router.post('/motoristas/novo',protect, motoristaController.createMotorista);
router.get('/motoristas/listar',protect, motoristaController.listarMotorista);
router.put('/motoristas/update/:id', protect, motoristaController.updateMotorista);
router.delete('/motoristas/delete/:id', protect, motoristaController.deleteMotorista);
router.get('/motoristas/listarPeloId/:id', protect, motoristaController.getMotoristaById);

//Rotas Viaturas
router.post('/viaturas/novo',protect, viaturaController.createViatura);
router.get('/viaturas/listar',protect, viaturaController.getAllViaturas);
router.put('/viaturas/update/:id',protect, viaturaController.updateViatura);
router.delete('/viaturas/delete/:id',protect, viaturaController.deleteViatura);
router.get('/viaturas/listarPeloId/:id',protect, viaturaController.getViaturaById);

//Rotas Tipo Usuário
router.post('/usuariotipo/novo', tipoUserController.createUsertipo);
router.get('/usuariotipo/listar', tipoUserController.listarUsertipo);

//Rotas CheckList Viatura
router.post('/checklist/novo', checkListViatura.createChecklist);
router.get('/checklist/listar', checkListViatura.listarChecklist);
router.delete('/checklist/delete/:id', checkListViatura.deleteChecklist);

// Rotas para Licenças de Publicidade
router.post('/licencas-publicidade/novo',protect, licencaPublicidadeController.createLicencaPublicidade); // Criar Licença de Publicidade
router.get('/licencas-publicidade/listar',protect, licencaPublicidadeController.getAllLicencasPublicidade); // Listar Licenças de Publicidade
router.get('/licencas-publicidade/listarPeloId/:id',protect, licencaPublicidadeController.getLicencaPublicidadeById); // Obter Licença de Publicidade por ID
router.put('/licencas-publicidade/update/:id',protect, licencaPublicidadeController.updateLicencaPublicidade); // Atualizar Licença de Publicidade
router.delete('/licencas-publicidade/delete/:id',protect, licencaPublicidadeController.deleteLicencaPublicidade); // Deletar Licença de Publicidade

// Rotas para Licenças de Transportação
router.post('/licencas-transportacao/novo',protect, licencaTransportacaoController.createLicencaTransportacao); // Criar Licença de Transportação
router.get('/licencas-transportacao/listar',protect, licencaTransportacaoController.getAllLicencasTransportacao); // Listar Licenças de Transportação
router.get('/licencas-transportacao/listarPeloId/:id',protect, licencaTransportacaoController.getLicencaTransportacaoById); // Obter Licença de Transportação por ID
router.put('/licencas-transportacao/update/:id',protect, licencaTransportacaoController.updateLicencaTransportacao); // Atualizar Licença de Transportação
router.delete('/licencas-transportacao/delete/:id',protect, licencaTransportacaoController.deleteLicencaTransportacao); // Deletar Licença de Transportação

// Rotas para TipoManutencao
router.post('/tipos-manutencao/novo',protect, tiposManutencaoController.createTipoManutencao); // Criar Tipo de Manutenção
router.get('/tipos-manutencao/listar',protect, tiposManutencaoController.getAllTiposManutencao); // Listar Tipos de Manutenção
router.delete('/tipos-manutencao/delete/:id',protect, tiposManutencaoController.deleteTipoManutencao); // Deletar Tipo de Manutenção

// Rotas para StatusManutencao
router.post('/status-manutencao/novo',protect, statusManutencaoController.createStatusManutencao); // Criar Status de Manutenção
router.get('/status-manutencao/listar',protect, statusManutencaoController.getAllStatusManutencao); // Listar Status de Manutenção
router.delete('/status-manutencao/delete/:id',protect, statusManutencaoController.deleteStatusManutencao); // Deletar Status de Manutenção


module.exports = router;