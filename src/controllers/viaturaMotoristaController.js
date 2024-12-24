// controllers/viaturaMotoristaController.js
const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

module.exports = {
  //Viatura Motorista Controllers

  async vincularViaturaMotorista(req, res) {
    try {
      const { viaturaId, motoristaId } = req.body;
      const tipo = await prisma.viaturaMotorista.create({
        data: { viaturaId, motoristaId },
      });
      res.status(201).json({message: "Viatura atribuida ao motorista com sucesso", tipo});
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: "Erro ao atribuir viatura ao motorista" });
    }
  },

  async deleteVinculo(req, res) {
    try {
      const { id } = req.params;
      await prisma.viaturaMotorista.delete({
        where: { motoristaId: parseInt(id) },
      });
      res.status(200).json({ message: "Atribuição de viatura ao motorista deletado com sucesso" });
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: "Erro ao deletar atribuição de viatura ao motorista" });
    }
  },
};