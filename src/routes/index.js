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
const grupoUserController = require('../controllers/grupoUserController');
const licencaPublicidadeController = require('../controllers/licencaPublicidadeController');
const licencaTransportacaoController = require('../controllers/licencaTransportacaoController');
const statusManutencaoController = require('../controllers/statusManutencaoController');
const tiposManutencaoController = require('../controllers/tipoManutencaoController');
const checkListViatura = require('../controllers/checklistController');
const viaturaCategoriaController = require('../controllers/viaturaCategoriaController');
const viaturaTipoController = require('../controllers/viaturaTipoController');
const manutencaoController = require('../controllers/manutencaoController');
const tipoServicoController = require('../controllers/tipoServicoController');
const statusServicoController = require('../controllers/statusServicoController');
const funcionarioController = require('../controllers/funcionarioController');


// Rotas para Pedido
router.post('/pedidos/novo', protect, pedidoController.createPedido); // Criar Pedido
router.get('/pedidos/listar', protect, pedidoController.getAllPedidos); // Listar Pedidos
router.get('/pedidos/listarPeloId/:id', protect, pedidoController.getPedidoById); // Obter Pedido por ID
router.put('/pedidos/update/:id', protect, pedidoController.updatePedido); // Atualizar Pedido
router.put('/pedidos/updateStatus/:id', protect, pedidoController.updatePedidoStatus); // Atualizar Pedido
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
router.put('/usuario/alterarPassword/:id', protect, userController.alterarPasswordUser);
router.delete('/usuario/delete/:id',protect, userController.deleteUser);

//Rotas Motoristas
router.post('/motoristas/novo',protect, motoristaController.createMotorista);
router.get('/motoristas/listar',protect, motoristaController.listarMotorista);
router.put('/motoristas/update/:id', protect, motoristaController.updateMotorista);
router.delete('/motoristas/delete/:id', protect, motoristaController.deleteMotorista);
router.get('/motoristas/listarPeloId/:id', protect, motoristaController.getMotoristaById);

//Rotas Funcionários
router.post('/funcionarios/novo',protect, funcionarioController.createFuncionario);
router.get('/funcionarios/listar',protect, funcionarioController.listarTodos);
router.put('/funcionarios/update/:id', protect, funcionarioController.updateFuncionario);
router.delete('/funcionarios/delete/:id', protect, funcionarioController.deleteFuncionario);
router.get('/funcionarios/listarPeloId/:id', protect, funcionarioController.getFuncionarioById);

//Rotas Viaturas
router.post('/viaturas/novo',protect, viaturaController.createViatura);
router.get('/viaturas/listar',protect, viaturaController.getAllViaturas);
router.put('/viaturas/update/:id',protect, viaturaController.updateViatura);
router.delete('/viaturas/delete/:id',protect, viaturaController.deleteViatura);
router.get('/viaturas/listarPeloId/:id',protect, viaturaController.getViaturaById);

//Rotas Tipo Usuário
router.post('/usuariotipo/novo',protect, tipoUserController.createUsertipo);
router.get('/usuariotipo/listar',protect, tipoUserController.listarUsertipo);
router.delete('/usuariotipo/delete/:id',protect, tipoUserController.deleteUsertipo);

//Rotas Grupo Usuário
router.post('/grupousuario/novo',protect, grupoUserController.createGrupoUser);
router.get('/grupousuario/listar',protect, grupoUserController.listarGrupoUser);
router.delete('/grupousuario/delete/:id',protect, grupoUserController.deleteGrupoUser);


//Rotas CheckList Viatura
router.post('/checklist/novo',protect, checkListViatura.createChecklist);
router.get('/checklist/listar',protect, checkListViatura.listarChecklist);
router.delete('/checklist/delete/:id',protect, checkListViatura.deleteChecklist);

// Rotas para Licenças de Publicidade
router.post('/licencapublicidade/novo',protect, licencaPublicidadeController.createLicencaPublicidade); // Criar Licença de Publicidade
router.get('/licencapublicidade/listar',protect, licencaPublicidadeController.getAllLicencasPublicidade); // Listar Licenças de Publicidade
router.get('/licencapublicidade/listarPeloId/:id',protect, licencaPublicidadeController.getLicencaPublicidadeById); // Obter Licença de Publicidade por ID
router.put('/licencapublicidade/update/:id',protect, licencaPublicidadeController.updateLicencaPublicidade); // Atualizar Licença de Publicidade
router.delete('/licencapublicidade/delete/:id',protect, licencaPublicidadeController.deleteLicencaPublicidade); // Deletar Licença de Publicidade

// Rotas para Licenças de Transportação
router.post('/licencatransportacao/novo',protect, licencaTransportacaoController.createLicencaTransportacao); // Criar Licença de Transportação
router.get('/licencatransportacao/listar',protect, licencaTransportacaoController.getAllLicencasTransportacao); // Listar Licenças de Transportação
router.get('/licencatransportacao/listarPeloId/:id',protect, licencaTransportacaoController.getLicencaTransportacaoById); // Obter Licença de Transportação por ID
router.put('/licencatransportacao/update/:id',protect, licencaTransportacaoController.updateLicencaTransportacao); // Atualizar Licença de Transportação
router.delete('/licencatransportacao/delete/:id',protect, licencaTransportacaoController.deleteLicencaTransportacao); // Deletar Licença de Transportação

// Rotas para TipoManutencao
router.post('/tipomanutencao/novo',protect, tiposManutencaoController.createTipoManutencao); // Criar Tipo de Manutenção
router.get('/tipomanutencao/listar',protect, tiposManutencaoController.getAllTiposManutencao); // Listar Tipos de Manutenção
router.delete('/tipomanutencao/delete/:id',protect, tiposManutencaoController.deleteTipoManutencao); // Deletar Tipo de Manutenção

// Rotas para StatusManutencao
router.post('/statusmanutencao/novo',protect, statusManutencaoController.createStatusManutencao); // Criar Status de Manutenção
router.get('/statusmanutencao/listar',protect, statusManutencaoController.getAllStatusManutencao); // Listar Status de Manutenção
router.delete('/statusmanutencao/delete/:id',protect, statusManutencaoController.deleteStatusManutencao); // Deletar Status de Manutenção

//Rotas para Viatura Categoria
router.post('/viaturacategoria/novo',protect, viaturaCategoriaController.createViaturaCategoria);
router.get('/viaturacategoria/listar',protect, viaturaCategoriaController.getAllViaturaCategoria);
router.delete('/viaturacategoria/delete/:id',protect, viaturaCategoriaController.deleteViaturaCategoria);

//Rotas para Viatura Tipo
router.post('/viaturatipo/novo',protect, viaturaTipoController.createViaturaTipo);
router.get('/viaturatipo/listar',protect, viaturaTipoController.getAllViaturaTipo);
router.delete('/viaturatipo/delete/:id',protect, viaturaTipoController.deleteViaturaTipo);

//Rotas para Manutenção
router.post('/manutencao/novo',protect, manutencaoController.criarManutencao);
router.get('/manutencao/listar',protect, manutencaoController.listarManutencao);
router.get('/manutencao/listarPeloId/:id',protect, manutencaoController.listarManutencaoPorId);
router.get('/manutencao/listarPorMatricula/:viaturaMatricula',protect, manutencaoController.listarManutencaoPorMatricula);
router.put('/manutencao/update/:id',protect, manutencaoController.editarManutencao);
router.put('/manutencao/updateStatus/:id',protect, manutencaoController.alterarManutencaoStatus);
router.delete('/manutencao/delete/:id',protect, manutencaoController.deletarManutencao);

//Rotas para Tipo Serviço
router.post('/tiposervico/novo',protect, tipoServicoController.createTipoServico);
router.get('/tiposervico/listar',protect, tipoServicoController.getAllTipoServico);
router.delete('/tiposervico/delete/:id',protect, tipoServicoController.deleteTipoServico);

//Rotas para Status Serviço
router.post('/statusservico/novo',protect, statusServicoController.createStatusServico);
router.get('/statusservico/listar',protect, statusServicoController.getAllStatusServico);
router.delete('/statusservico/delete/:id',protect, statusServicoController.deleteStatusServico);




module.exports = router;