// controllers/viaturaTipoController.js
const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

module.exports = {
  //Viatura Tipo Controllers

  async createViaturaTipo(req, res) {
    try {
      const { viaturaTipo } = req.body;
      const tipo = await prisma.viaturatipo.create({
        data: { viaturaTipo },
      });
      res.status(201).json({message: "Tipo de viatura criado com sucesso", tipo});
    } catch (error) {
      res.status(500).json({ error: "Erro ao criar tipo de viatura" });
    }
  },

  async getAllViaturaTipo(req, res) {
    try {
      const tipos = await prisma.viaturatipo.findMany({
        select: {
          id: true,
          viaturaTipo: true,
        },
      });
      res.status(200).json({viaturatipo: tipos});
    } catch (error) {
      res.status(500).json({ error: "Erro ao buscar tipo de viatura" });
    }
  },

  async deleteViaturaTipo(req, res) {
    try {
      const { id } = req.params;
      await prisma.viaturatipo.delete({
        where: { id: parseInt(id) },
      });
      res.status(200).json({ message: "Tipo de viatura deletado com sucesso" });
    } catch (error) {
      res.status(500).json({ error: "Erro ao deletar tipo de viatura" });
    }
  },
};