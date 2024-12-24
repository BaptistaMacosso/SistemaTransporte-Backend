// controllers/tiposStatusManutencaoController.js
const { PrismaClient } = require('@prisma/client');
const { deleteViatura } = require('./viaturaController');
const prisma = new PrismaClient();

module.exports = {
  // Viatura Categoria Controllers

  async createViaturaCategoria(req, res) {
    try {
      const { viaturaCategoria } = req.body;
      const tipo = await prisma.viaturacategoria.create({
        data: { viaturaCategoria },
      });
      res.status(201).json({message: "Categoria de viatura criado com sucesso", tipo});
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: "Erro ao criar categoria de viatura" });
    }
  },

  async getAllViaturaCategoria(req, res) {
    try {
      const tipos = await prisma.viaturacategoria.findMany();
      res.status(200).json({viaturaCategoria: viaturaCategoria});
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: "Erro ao buscar categorias de viatura" });
    }
  },

  async deleteViaturaCategoria(req, res) {
    try {
      const { id } = req.params;
      await prisma.viaturacategoria.delete({
        where: { id: parseInt(id) },
      });
      res.status(200).json({ message: "Categoria de viatura deletado com sucesso" });
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: "Erro ao deletar categoria de viatura" });
    }
  },
};