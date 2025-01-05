// controllers/licencaPublicidadeController.js
const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

module.exports = {
  // Criar Licença de Publicidade
  async createLicencaPublicidade(req, res) {
    try {
      const { descricao, licencaNumero, dataEmissao, dataVencimento, licencaStatus } = req.body;
      const licenca = await prisma.licencaPublicidadeViaturas.create({
        data: {
          descricao,
          licencaNumero,
          dataEmissao,
          dataVencimento,
          licencaStatus,
        },
      });
      return res.status(201).json({message: "Licença de publicidade criada com sucesso.", licenca});
    } catch (error) {
      return res.status(500).json({ error: "Erro ao criar licença de publicidade." });
    }
  },

  // Listar Licenças de Publicidade
  async getAllLicencasPublicidade(req, res) {
    try {
      const licencas = await prisma.licencaPublicidadeViaturas.findMany({orderBy: { id: 'asc', },});
      return res.status(200).json({licencas: licencas});
    } catch (error) {
      return res.status(500).json({ error: "Erro ao buscar licenças de publicidade." });
    }
  },

  // Obter Licença de Publicidade por ID
  async getLicencaPublicidadeById(req, res) {
    try {
      const { id } = req.params;
      const licenca = await prisma.licencaPublicidadeViaturas.findUnique({
        where: { id: parseInt(id) },
      });
      if (!licenca){ 
        return res.status(404).json({ error: "Licença de publicidade não encontrada." });
      };

      return res.status(200).json({licenca: licenca});
    } catch (error) {
      return res.status(500).json({ error: "Erro ao buscar licença de publicidade." });
    }
  },

  // Atualizar Licença de Publicidade
  async updateLicencaPublicidade(req, res) {
    try {
      const { id } = req.params;
      const { descricao, licencaNumero, dataEmissao, dataVencimento, licencaStatus } = req.body;

      // Verificar se a licença de publicidade existe
      const licencaExiste = await prisma.licencaPublicidadeViaturas.findUnique({ where: {id: parseInt(id)}});
      if(!licencaExiste){ 
        return res.status(404).json({error: "Licença de publicidade não encontrada."});
      };

      //Actualizar licença de publicidade
      const licenca = await prisma.licencaPublicidadeViaturas.update({
        where: { id: parseInt(id) },
        data: {
          descricao,
          licencaNumero,
          dataEmissao,
          dataVencimento,
          licencaStatus,
        },
      });
      return res.status(200).json({message: "Licença de publicidade atualizada com sucesso", licenca});
    } catch (error) {
      return res.status(500).json({ error: "Erro ao atualizar licença de publicidade" });
    }
  },

  // Deletar Licença de Publicidade
  async deleteLicencaPublicidade(req, res) {
    const { id } = req.params;
    try {
      // Verificar se a licença de publicidade existe
      const licencaExiste = await prisma.licencaPublicidadeViaturas.findUnique({ where: {id: parseInt(id)}});
      if(!licencaExiste){ 
        return res.status(404).json({error: "Licença de publicidade não encontrada."});
      };
     
      // Deletar licença de publicidade
      await prisma.licencaPublicidadeViaturas.delete({ where: { id: parseInt(id) } });
      return res.status(200).json({ message: "Licença de publicidade deletada com sucesso." });
    } catch (error) {
      return res.status(500).json({ error: "Erro ao deletar licença de publicidade." });
    }
  },
};
