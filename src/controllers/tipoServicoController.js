// controllers/tipoServicoController.js
const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

module.exports = {
  // Tipo Serviço Controllers

  async createTipoServico(req, res) {
    try {
      const { tipoServico } = req.body;
      const tipo = await prisma.tipoServico.create({
        data: { tipoServico },
      });
      res.status(201).json({message: "Tipo de serviço criado com sucesso", tipo});
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: "Erro ao criar tipo de serviço" });
    }
  },

  async getAllTipoServico(req, res) {
    try {
      const tipo = await prisma.tipoServico.findMany();
      return res.status(200).json({tipoServico: tipo});
    } catch (error) {
      return res.status(500).json({ message: "Erro ao listar tipo de serviço. "+error });
    }
  },

  async deleteTipoServico(req, res) {
    try {
      const { id } = req.params;
      await prisma.tipoServico.delete({
        where: { id: parseInt(id) },
      });
      res.status(200).json({ message: "Tipo de serviço deletado com sucesso" });
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: "Erro ao deletar tipo de serviço" });
    }
  },
};