const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

module.exports = {
  // Salvar funcionário
  async createFuncionario(req, res) {
    try {
      const { 
            funcionarioNome, numeroBI, nacionalidade, genero, provincia, funcionarioEmail,funcionarioTelefone, 
            CartaDeConducaoNr, DataEmissao, DataValidade, categoriaId, funcaoTipoId, copiaBI, copiaCartaCoducao, 
            copiaLicencaConducao, fotografia, estado } = req.body;

            console.log('=== DADOS DO FUNCIONÁRIO ===');
            console.log('Nome:', funcionarioNome);
            console.log('Número BI:', numeroBI);
            console.log('Nacionalidade:', nacionalidade);
            console.log('Gênero:', genero);
            console.log('Província:', provincia);
            console.log('Email:', funcionarioEmail);
            console.log('Telefone:', funcionarioTelefone);
            console.log('Nº Carta de Condução:', CartaDeConducaoNr);
            console.log('Data de Emissão:', DataEmissao);
            console.log('Data de Validade:', DataValidade);
            console.log('Categoria ID:', categoriaId);
            console.log('Função Tipo ID:', funcaoTipoId);
            console.log('Estado:', estado);
            console.log('Foto:', fotografia);
            console.log('BI:', copiaBI);
            console.log('Carta:', copiaCartaCoducao);
            console.log('Licença:', copiaLicencaConducao);
            console.log('============================');
      
      if (!funcionarioNome || !numeroBI || !nacionalidade || !genero || !provincia || !funcionarioTelefone || !CartaDeConducaoNr || !DataEmissao || !DataValidade || !funcaoTipoId || !estado) {
        return res.status(400).json({ message: 'Todos os campos obrigatórios devem ser preenchidos.' });
      }

      const funcionario = await prisma.funcionario.create({ data:{
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
        copiaCartaCoducao:    copiaCartaCoducao,
        copiaLicencaConducao: copiaLicencaConducao,
        fotografia:           fotografia,
        estado:               estado 
      } });
      return res.status(201).json({ message: 'Funcionário salvo com sucesso.', funcionario });
    } catch (error) {
      return res.status(500).json({ message: 'Erro ao salvar funcionário: ' + error.message });
    }
  },

  // Editar funcionário
  async updateFuncionario(req, res) {
    try {
      const { id } = req.params;
      const funcionarioExiste = await prisma.funcionario.findUnique({ where: { funcionarioId: parseInt(id) } });
      if (!funcionarioExiste) {
        return res.status(404).json({ message: 'Funcionário não encontrado.' });
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
        copiaCartaCoducao:    copiaCartaCoducao,
        copiaLicencaConducao: copiaLicencaConducao,
        fotografia:           fotografia,
        estado:               estado 
      } });
      return res.status(200).json({ message: 'Funcionário atualizado com sucesso.', funcionario });
    } catch (error) {
      return res.status(500).json({ message: 'Erro ao editar funcionário: ' + error.message });
    }
  },

  // Eliminar funcionário
  async deleteFuncionario(req, res) {
    try {
      const { id } = req.params;
      const funcionarioExiste = await prisma.funcionario.findUnique({ where: { funcionarioId: parseInt(id) } });
      if (!funcionarioExiste) {
        return res.status(404).json({ message: 'Funcionário não encontrado.' });
      }
      
      await prisma.funcionario.delete({ where: { funcionarioId: parseInt(id) } });
      return res.status(200).json({ message: 'Funcionário eliminado com sucesso.' });
    } catch (error) {
      return res.status(500).json({ message: 'Erro ao eliminar funcionário: ' + error.message });
    }
  },

  // Listar funcionário por nome
  async listarPorNome(req, res) {
    try {
      const { nome } = req.params;
      const funcionario = await prisma.funcionario.findMany({ where: { funcionarioNome: { contains: nome } } });
      if (!funcionario) return res.status(404).json({ message: 'Funcionário não encontrado.' });
      return res.status(200).json({ funcionario: funcionario });
    } catch (error) {
      return res.status(500).json({ message: 'Erro ao listar funcionário por nome: ' + error.message });
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
      return res.status(500).json({ message: 'Erro ao listar funcionário por ID: ' + error.message });
    }
  },

  // Listar todos os funcionários
  async listarTodos(req, res) {
    try {
      const funcionarios = await prisma.funcionario.findMany();
      return res.status(200).json({ funcionarios });
    } catch (error) {
      return res.status(500).json({ message: 'Erro ao listar todos os funcionários: ' + error.message });
    }
  },

  // Listar quantos estão com a função de motorista
  async listarFuncionariosMotoristas(req, res) {
    try {
      const motoristas = await prisma.funcionario.count({ where: { funcaoTipoId: 'motorista' } });
      return res.status(200).json({ quantidade: motoristas });
    } catch (error) {
      return res.status(500).json({ message: 'Erro ao listar motoristas: ' + error.message });
    }
  },
};
