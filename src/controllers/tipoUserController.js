const { PrismaClient }  = require('@prisma/client');
const prisma = new PrismaClient();

module.exports = {
  //Criar Tipo de Usuário
  async createUsertipo (req, res){
    const { descricaoTipo, parametro_edit_config } = req.body;
    try {
      //Verificar campos vazios.
      if (!descricaoTipo) {
        return res.status(409).json({ message: 'Todos os campos são obrigatórios' });
      };
        
      const userTipoExists = await prisma.tipoUser.findFirst({ where: { descricaoTipo } });
      if (userTipoExists) {
        return res.status(409).json({ message: 'Usuário já existe' });
      };

      // Salvar os dados no banco de dados
      const tipoUser = await prisma.tipoUser.create({
            data: {
                descricaoTipo: descricaoTipo,
                parametro_edit_config: parametro_edit_config,
            },
      });

      return res.status(201).json({ sucesso: tipoUser });
    } catch (error) {
      return res.status(500).json({message: 'error ao criar tipo de usuários, por favor verifique a console.',error }); 
    }
  },

  //Listar Tipo de Usuários
  async listarUsertipo (req, res){
      try {
          const listaUser = await prisma.tipoUser.findMany();
          return res.status(200).json({ listaUser: listaUser });
      } catch (error) {
          return res.status(500).json({message: 'error ao listar tipo de usuários, por favor verifique a console.',error });
      }
  },

  //Deletar Tipo de Usuário
  async deleteUsertipo (req, res){
    const { id } = req.params;
    try {
      const userExiste = await prisma.tipoUser.findUnique({ where: { id: parseInt(id) } });
      if (!userExiste) {
        return res.status(404).json({ message: 'Tipo de usuário não encontrado.' });
      }
      const userDelete = await prisma.tipoUser.delete({ where: { id: parseInt(id) } });
      return res.status(200).json({ userDeleted: userDelete });
    }catch(error){
        return res.status(500).json({message: 'error ao deletar tipo de usuário, por favor verifique a console.',error });
    }
  },
  
};