const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

module.exports = {
  // Salvar funcionário
  async createFuncionario(req, res) {
    try {
      const { 
            funcionarioNome, numeroBI, nacionalidade, genero, provincia, funcionarioEmail,funcionarioTelefone, 
            CartaDeConducaoNr, DataEmissao, DataValidade, categoriaId, funcaoTipoId,
            copiaBI, copiaCartaConducao, copiaLicencaConducao, fotografia, estado } = req.body;
                  
      if (!funcionarioNome || !numeroBI || !nacionalidade || !genero || !provincia || !funcionarioTelefone || !funcaoTipoId || !estado) {
        return res.status(409).json({ message: 'Todos os campos obrigatórios devem ser preenchidos.' });
      }

      const funcionario = await prisma.funcionario.create({ data:{
        funcionarioNome:      funcionarioNome,
        numeroBI:             numeroBI,
        nacionalidades:{ connect: { nacionalidadeId: nacionalidade }},
        genero:               genero,
        provincia:            provincia,
        funcionarioEmail:     funcionarioEmail,
        funcionarioTelefone:  funcionarioTelefone,
        CartaDeConducaoNr:    CartaDeConducaoNr,
        DataEmissao:          DataEmissao,
        DataValidade:         DataValidade,
        categorias: { connect: { categoriaId: categoriaId } },
        funcaoTipo: { connect: { funcaoId: funcaoTipoId } },
        copiaBI:              copiaBI,
        copiaCartaConducao:   copiaCartaConducao,
        copiaLicencaConducao: copiaLicencaConducao,
        fotografia:           fotografia,
        estado:               estado
      } });
      return res.status(201).json({ message: 'O registo foi salvo com sucesso.', funcionario });
    } catch (error) {
      console.error("❌ Erro ao salvar criar o registo:", error);
      return res.status(500).json({ message: 'Erro ao criar o registo, por favor verifique a console.', error });
    }
  },

  async atribuirViaturaFuncionario(req, res){
    try {
      const {viaturaId, funcionarioId } = req.body;
      if (!viaturaId || !funcionarioId ) {
        return res.status(409).json({ message: 'Os campos viatura ID e funcionário ID são obrigatórios.' });
      }
      //Verificar Viatura Atribuida.
      const viaturaAtribuida = await prisma.viaturaFuncionario.findUnique({where: {viaturaId: viaturaId}});
      if (viaturaAtribuida) {
        return res.status(409).json({ message: 'A viatura selecionada já se encontra atribuida.' });
      }
      //Verificar Funcionário já Atribuido.
      const funcionarioAtribuido = await prisma.viaturaFuncionario.findUnique({where: {funcionarioId: funcionarioId}});
      if (funcionarioAtribuido) {
        return res.status(409).json({ message: 'O funcionário selecionado já possui uma viatura atribuida.' });
      }

      const atribuicao = await prisma.viaturaFuncionario.create({ 
        data:{
          viaturaId: viaturaId,
          funcionarioId: funcionarioId,
        } });
      return res.status(201).json({ message: 'Viatura atribuida com sucesso.', atribuicao });
    } catch (error) {
      console.error("❌ Erro ao salvar atribuição de viatura ao funcionário:", error);
      return res.status(500).json({ message: 'Erro ao atribuir a viatura, por favor verifique a console.', error });
    }
  },

  // Editar funcionário
  async updateFuncionario(req, res) {
    try {
      const { id } = req.params;
      const { 
        funcionarioNome, numeroBI, nacionalidade, genero, provincia, funcionarioEmail,funcionarioTelefone, 
        CartaDeConducaoNr, DataEmissao, DataValidade, categoriaId, funcaoTipoId,
        copiaBI, copiaCartaConducao, copiaLicencaConducao, fotografia, estado } = req.body;

      const funcionarioExiste = await prisma.funcionario.findUnique({ where: { funcionarioId: parseInt(id) } });
      if (!funcionarioExiste) {
        return res.status(404).json({ message: 'Funcionário não encontrado.' });
      }

      if (!funcionarioNome || !numeroBI || !nacionalidade || !genero || !provincia || !funcionarioTelefone || !funcaoTipoId || !estado) {
        return res.status(409).json({ message: 'Todos os campos (*) são de preenchimento obrigatório.' });
      }
      
      const funcionario = await prisma.funcionario.update({ where: { funcionarioId: parseInt(id) }, 
      data: {
        funcionarioNome:      funcionarioNome,
        numeroBI:             numeroBI,
        nacionalidade:        nacionalidade,
        genero:               genero,
        provincia:            provincia,
        funcionarioEmail:     funcionarioEmail,
        funcionarioTelefone:  funcionarioTelefone,
        CartaDeConducaoNr:    CartaDeConducaoNr,
        DataEmissao:          DataEmissao,
        DataValidade:         DataValidade,
        categoriaId:          categoriaId,
        funcaoTipoId:         funcaoTipoId,
        copiaBI:              copiaBI,
        copiaCartaConducao:   copiaCartaConducao,
        copiaLicencaConducao: copiaLicencaConducao,
        fotografia:           fotografia,
        estado:               estado 
      } });
      return res.status(200).json({ message: 'O registo foi actualizado com sucesso.', funcionario });
    } catch (error) {
      return res.status(500).json({ message: 'Erro ao editar o registo, por favor verifique a console.', error });
    }
  },

  // Eliminar funcionário
  async deleteFuncionario(req, res) {
    try {
      const { id } = req.params;
      const funcionarioExiste = await prisma.funcionario.findUnique({ where: { funcionarioId: parseInt(id) } });
      if (!funcionarioExiste) {
        return res.status(404).json({ message: 'Não foi encontrado registo com este ID.' });
      }
      
      await prisma.funcionario.delete({ where: { funcionarioId: parseInt(id) } });
      return res.status(200).json({ message: 'O registo foi eliminado com sucesso.' });
    } catch (error) {
      return res.status(500).json({ message: 'Erro ao eliminar o registo, por favor verifique a console.' + error.message });
    }
  },

  // Listar funcionário por nome
  async listarPeloNumeroBI(req, res) {
    try {
      const { funcionarioBI } = req.body;
      const BIFormatada = funcionarioBI.trim().toUpperCase();
      
      const funcionarios = await prisma.funcionario.findUnique({ where: { numeroBI: BIFormatada } });
      if (!funcionarios){ 
        return res.status(404).json({ message: 'Funcionário não encontrado.' });
      };
      
      return res.status(200).json({ funcionario: funcionarios });
    } catch (error) {
      return res.status(500).json({ message: 'Erro ao listar funcionário pelo número de identificação, por favor verifique a console.', error});
    }
  },

  // Listar funcionário por ID
  async getFuncionarioById(req, res) {
    try {
      const { id } = req.params;
      const funcionario = await prisma.funcionario.findUnique({ where: { funcionarioId: parseInt(id) } });
      if (!funcionario) return res.status(404).json({ message: 'Funcionário não encontrado.' });
      return res.status(200).json({ funcionario: funcionario });
    } catch (error) {
      return res.status(500).json({ message: 'Erro ao listar funcionário por ID, por favor verifique a console.',error });
    }
  },

  // Listar todos os funcionários
  async listarTodos(req, res) {
    try {
      const funcionarios = await prisma.funcionario.findMany({orderBy: {funcionarioId: 'asc'}});
      return res.status(200).json({ funcionarios });
    } catch (error) {
      return res.status(500).json({ message: 'Erro ao listar todos os funcionários, por favor verifique a console.',error });
    }
  },

  // Listar quantos estão com a função de motorista
  async listarFuncionariosMotoristas(req, res) {
    try {
      const motoristas = await prisma.funcionario.count({ where: { funcaoTipoId: 'motorista' } });
      return res.status(200).json({ quantidade: motoristas });
    } catch (error) {
      return res.status(500).json({ message: 'Erro ao listar motoristas, por favor verifique a console.',error });
    }
  },
};
