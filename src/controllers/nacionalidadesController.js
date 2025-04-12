const { PrismaClient }  = require('@prisma/client');
const prisma = new PrismaClient();

module.exports = {
  //Criar Nacionalidade
  async createNacionalidade (req, res){
    const { nacionalidadeId } = req.body;
    try {
      //Verificar campos vazios.
      if (!nacionalidadeId) {
        return res.status(400).json({ message: 'O campos é obrigatório.' });
      }
        
      const nacionalidadeExists = await prisma.nacionalidades.findFirst({ where: { nacionalidadeId: nacionalidadeId } });
      if (nacionalidadeExists) {
        return res.status(400).json({ message: 'Nacionalidade já existe' });
      }

      // Salvar os dados no banco de dados
      const nacionalidade = await prisma.nacionalidades.create({
            data: {
                nacionalidadeId: nacionalidadeId,
            },
      });

      return res.status(201).json({ message: 'Nacionalidade criada com sucesso.', nacionalidade });
    } catch (error) {
      return res.status(500).json({message: 'error ao criar a nacionalidade, por favor verifique a console.',error });
    }
  },

  //Listar Nacionalidades
  async getAllNacionalidade (req, res){
      try {
          const listaNacionalidades = await prisma.nacionalidades.findMany();
          return res.status(200).json({ nacionalidades: listaNacionalidades });
      } catch (error) {
          return res.status(500).json({message: 'error ao listar as nacionalidades, por favor verifique a console.',error });
      }
  },

  //Deletar Nacionalidade
  async deleteNacionalidade (req, res){
    const { nacionalidadeId } = req.params;
    try {
      const nacionalidadeExiste = await prisma.nacionalidades.findUnique({ where: { nacionalidadeId: nacionalidadeId } });
      if (!nacionalidadeExiste) {
        return res.status(404).json({ message: 'Nacionalidade não encontrada.' });
      }
      const nacionalidadeDelete = await prisma.nacionalidades.delete({ where: { nacionalidadeId: nacionalidadeId } });
      return res.status(200).json({ message: 'Nacionalidade deletada com sucesso.', nacionalidadeDelete });
    }catch(error){
        return res.status(500).json({message: 'error ao deletar nacionalidade, por favor verifique a console. ',error });
    }
  },
  
};