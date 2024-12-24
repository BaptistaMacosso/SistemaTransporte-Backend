// controllers/statusManutencaoController.js
const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

module.exports = {
  // StatusManutencao Controllers

  async createStatusManutencao(req, res) {
    try {
      const { statusManutencao } = req.body;
      const status = await prisma.statusManutencao.create({
        data: { statusManutencao },
      });
      res.status(201).json({message: "Status de manutenção criado com sucesso", status});
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: "Erro ao criar status de manutenção" });
    }
  },

  async getAllStatusManutencao(req, res) {
    try {
      const status = await prisma.statusManutencao.findMany();
      res.status(200).json({status: status});
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: "Erro ao buscar status de manutenção" });
    }
  },

  async deleteStatusManutencao(req, res) {
    try {
      const { id } = req.params;
      await prisma.statusManutencao.delete({
        where: { id: parseInt(id) },
      });
      res.status(200).json({ message: "Status de manutenção deletado com sucesso" });
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: "Erro ao deletar status de manutenção" });
    }
  },
};
