// controllers/statusManutencaoController.js
const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

module.exports = {
  // Status Serviço Controllers

  async createStatusServico(req, res) {
    try {
      const { descricao } = req.body;
      const status = await prisma.status.create({
        data: { descricao },
      });
      res.status(201).json({message: "Status de serviço criado com sucesso", status});
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: "Erro ao criar status de serviço" });
    }
  },

  async getAllStatusServico(req, res) {
    try {
      const status = await prisma.status.findMany();
      res.status(200).json({statusServico: status});
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: "Erro ao buscar status de serviço" });
    }
  },

  async deleteStatusServico(req, res) {
    try {
      const { id } = req.params;
      await prisma.status.delete({ where: { id: parseInt(id) }});
      res.status(200).json({ message: "Status de serviço deletado com sucesso" });
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: "Erro ao deletar status de serviço" });
    }
  },
};