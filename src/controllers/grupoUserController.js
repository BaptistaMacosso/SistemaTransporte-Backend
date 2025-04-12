const { PrismaClient }  = require('@prisma/client');
const prisma = new PrismaClient();

module.exports = {
  //Criar Grupo de Usuário
  async createGrupoUser (req, res){
    const { grupoName, descricao } = req.body;
    try {
      //Verificar campos vazios.
      if (!grupoName || !descricao) {
        return res.status(409).json({ message: 'Todos os campos são obrigatórios.' });
      }
        
      const grupoUserExists = await prisma.grupoUser.findUnique({ where: { grupoName: grupoName } });
      if (grupoUserExists) {
        return res.status(409).json({ message: 'Grupo de usuário já existe.' });
      }

      // Salvar os dados no banco de dados
      const grupoUser = await prisma.grupoUser.create({
            data: {
                grupoName: grupoName,
                descricao: descricao,
            },
      });

      return res.status(201).json({ grupoUser: grupoUser });
    } catch (error) {
      return res.status(500).json({message: 'error ao criar grupo de usuários, por favor verifique a console.',error });
    }
  },

  //Listar Grupo de Usuários
  async listarGrupoUser (req, res){
      try {
          const listaGrupoUser = await prisma.grupoUser.findMany();
          if(listaGrupoUser.length === 0){
              return res.status(404).json({ message: 'Nenhum grupo de usuário encontrado.' });
          }
          return res.status(200).json({ grupoUser: listaGrupoUser });
      } catch (error) {
          return res.status(500).json({message: 'error ao listar grupo de usuários, por favor verifique a console.',error });
      }
  },

  //Deletar Grupo de Usuário
  async deleteGrupoUser (req, res){
    const { id } = req.params;
    try {
      const grupoUserExiste = await prisma.grupoUser.findUnique({ where: { id: parseInt(id) } });
      if (!grupoUserExiste) {
        return res.status(404).json({ message: 'Grupo de usuário não encontrado.' });
      }
      const grupoUserDelete = await prisma.grupoUser.delete({ where: { id: parseInt(id) } });
      return res.status(200).json({ grupoUserDeleted: grupoUserDelete });
    }catch(error){
        return res.status(500).json({message: 'error ao deletar grupo de usuário, por favor verifique a console.',error });
    }
  },

};