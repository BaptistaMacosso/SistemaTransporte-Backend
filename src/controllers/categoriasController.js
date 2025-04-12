const { PrismaClient }  = require('@prisma/client');
const prisma = new PrismaClient();

module.exports = {
  //Criar Categorias
  async createCategoria (req, res){
    const { categoriaId } = req.body;
    try {
      //Verificar campos vazios.
      if (!categoriaId) {
        return res.status(409).json({ message: 'O campo é obrigatório.' });
      }
        
      const categoriaExists = await prisma.categorias.findFirst({ where: { categoriaId: categoriaId } });
      if (categoriaExists) {
        return res.status(409).json({ message: 'Categoria já existe' });
      }

      // Salvar os dados no banco de dados
      const categorias = await prisma.categorias.create({
          data: { categoriaId: categoriaId,},
      });

      return res.status(201).json({ message: 'Categoria criada com sucesso.', categorias });
    } catch (error) {
      return res.status(500).json({message: 'error ao criar categorias, por favor verifique a console.',error });
    }
  },

  //Listar Categorias
  async getAllCategoria (req, res){
      try {
          const listaCategorias = await prisma.categorias.findMany();
          return res.status(200).json({ categorias: listaCategorias });
      } catch (error) {
          return res.status(500).json({message: 'error ao listar categorias, por favor verifique a console.',error });
      }
  },

  //Deletar Categorias
  async deleteCategorias (req, res){
    const { categoriaId } = req.params;
    try {
      const categoriaExiste = await prisma.categorias.findUnique({ where: { categoriaId: categoriaId } });
      if (!categoriaExiste) {
        return res.status(404).json({ message: 'Categoria não encontrado.' });
      }
      const categoriaDelete = await prisma.categorias.delete({ where: { categoriaId: categoriaId } });
      return res.status(200).json({ message: 'Categoria deletada com sucesso. ', categoriaDelete });
    }catch(error){
        return res.status(500).json({message: 'error ao deletar a categoria, por favor verifique a console.',error });
    }
  },
  
};