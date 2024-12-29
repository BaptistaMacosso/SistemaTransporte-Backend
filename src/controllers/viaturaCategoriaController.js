// controllers/tiposStatusManutencaoController.js
const { PrismaClient } = require('@prisma/client');
const { deleteViatura } = require('./viaturaController');
const prisma = new PrismaClient();

module.exports = {
  // Viatura Categoria Controllers

  async createViaturaCategoria(req, res) {
    try {
      const { viaturaCategoria } = req.body;
      
      //Verificação
      if (!viaturaCategoria) {
        return res.status(400).json({ message: 'Todos os campos são obrigatórios.' });
      };

      const categoria = await prisma.viaturaCategoria.create({
        data: { viaturaCategoria },
      });
      res.status(201).json({message: "Categoria de viatura criado com sucesso.", categoria});
    } catch (error) {
      res.status(500).json({ error: "Erro ao criar categoria de viatura. Detalhes: "+error });
    }
  },

  async getAllViaturaCategoria(req, res) {
    try {
      const categoria = await prisma.viaturaCategoria.findMany({
        select: {
          id: true,
          viaturaCategoria: true,
        },
      });
      console.log(categoria);
      res.status(200).json({Categorias: categoria});
    } catch (error) {
      res.status(500).json({ error: "Erro ao buscar categorias de viatura. Detalhes: "+error });
    }
  },

  async deleteViaturaCategoria(req, res) {
    try {
      const { id } = req.params;
      //Verificação
      const categoriaExiste = await prisma.viaturaCategoria.findUnique({ where: { id: parseInt(id) } });
      if (!categoriaExiste) {
        return res.status(404).json({ message: 'Categoria de viatura não encontrada.' });
      };

      //Deletar Categoria Viatura
      const categoriaDelete = await prisma.viaturaCategoria.delete({where: { id: parseInt(id) }});
      
      res.status(200).json({ message: "Categoria de viatura deletado com sucesso"+categoriaDelete });
    } catch (error) {
      res.status(500).json({ error: "Erro ao deletar categoria de viatura. Detalhes: "+error });
    }
  },
};