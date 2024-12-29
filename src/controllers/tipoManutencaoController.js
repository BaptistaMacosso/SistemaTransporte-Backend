// controllers/tipoManutencaoController.js
const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

module.exports = {
  // TipoManutencao Controllers

  async createTipoManutencao(req, res) {
    try {
      const { tipoManutencao } = req.body;
      const tipo = await prisma.tipoManutencao.create({
        data: { tipoManutencao },
      });
      res.status(201).json({message: "Tipo de manutenção criado com sucesso", tipo});
    } catch (error) {
      res.status(500).json({ error: "Erro ao criar tipo de manutenção" });
    }
  },

  async getAllTiposManutencao(req, res) {
    try {
      const todosTipos = await prisma.tipoManutencao.findMany();
      res.status(200).json({tipos: todosTipos});
    } catch (error) {
      res.status(500).json({ error: "Erro ao buscar tipos de manutenção" });
    }
  },

  async deleteTipoManutencao(req, res) {
    try {
      const { id } = req.params;
      await prisma.tipoManutencao.delete({
        where: { id: parseInt(id) },
      });
      res.status(200).json({ message: "Tipo de manutenção deletado com sucesso" });
    } catch (error) {
      res.status(500).json({ error: "Erro ao deletar tipo de manutenção" });
    }
  },};
