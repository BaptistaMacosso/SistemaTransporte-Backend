const { PrismaClient }  = require('@prisma/client');
const prisma = new PrismaClient();

module.exports = {
  //Criar Função
  async createFuncao (req, res){
    const { funcaoId } = req.body;
    //Verificar campos vazios.
    if (!funcaoId) {
      return res.status(400).json({ message: 'O campo é obrigatório.' });
    }
      
    const funcaoExists = await prisma.funcaoTipo.findFirst({ where: { funcaoId: funcaoId } });
    if (funcaoExists) {
      return res.status(400).json({ message: 'Função já existe' });
    }

    // Salvar os dados no banco de dados
    const funcao = await prisma.funcaoTipo.create({
        data: { funcaoId: funcaoId, },
    });

    return res.status(201).json({ message: 'Função criada com sucesso.', funcao });
  },

  //Listar Funções
  async getAllFuncao (req, res){
      try {
          const listaFuncao = await prisma.funcaoTipo.findMany();
          return res.status(200).json({ funcoes: listaFuncao });
      } catch (error) {
          return res.status(500).json({message: 'error ao listar Funções '+error.message });
      }
  },

  //Deletar Função
  async deleteFuncao (req, res){
    const { funcaoId } = req.params;
    try {
      const funcaoExiste = await prisma.funcaoTipo.findUnique({ where: { funcaoId: funcaoId } });
      if (!funcaoExiste) {
        return res.status(404).json({ message: 'Função não encontrado.' });
      }
      const funcaoDelete = await prisma.funcaoTipo.delete({ where: { funcaoId: funcaoId } });
      return res.status(200).json({ message: 'Função deletada com sucesso. ', funcaoDelete });
    }catch(error){
        return res.status(500).json({message: 'error ao deletar função '+error });
    }
  },
  
};