// controllers/licencaTransportacaoController.js

module.exports = {
    // Criar Licença de Transportação
    async createLicencaTransportacao(req, res) {
      try {
        const { viaturaId, descricao, observacao, proprietario, dataEmissao, dataVencimento, licencaStatus } = req.body;
        const licenca = await prisma.licencaTransportacaoViaturas.create({
          data: {
            viaturaId,
            descricao,
            observacao,
            proprietario,
            dataEmissao,
            dataVencimento,
            licencaStatus,
          },
        });
        res.status(201).json({ message: "Licença de transportação criada com sucesso",licenca});
      } catch (error) {
        console.error(error);
        res.status(500).json({ error: "Erro ao criar licença de transportação" });
      }
    },
  
    // Listar Licenças de Transportação
    async getAllLicencasTransportacao(req, res) {
      try {
        const licencas = await prisma.licencaTransportacaoViaturas.findMany({ include: { viatura: true } });
        res.status(200).json({licencas: licencas});
      } catch (error) {
        console.error(error);
        res.status(500).json({ error: "Erro ao buscar licenças de transportação" });
      }
    },
  
    // Obter Licença de Transportação por ID
    async getLicencaTransportacaoById(req, res) {
      try {
        const { id } = req.params;
        const licenca = await prisma.licencaTransportacaoViaturas.findUnique({
          where: { id: parseInt(id) },
          include: { viatura: true },
        });
        if (!licenca) return res.status(404).json({ error: "Licença de transportação não encontrada" });
        res.status(200).json({licenca: licenca});
      } catch (error) {
        console.error(error);
        res.status(500).json({ error: "Erro ao buscar licença de transportação" });
      }
    },
  
    // Atualizar Licença de Transportação
    async updateLicencaTransportacao(req, res) {
      try {
        const { id } = req.params;
        const { viaturaId, descricao, observacao, proprietario, dataEmissao, dataVencimento, licencaStatus } = req.body;

        //Verificar se existe
        const licencaExiste = await prisma.licencaTransportacaoViaturas.findUnique({ where: { id: parseInt(id) }});
          if (!licencaExiste) return res.status(404).json({ error: "Licença de transportação não encontrada" });
        
        // Atualizar licença de transporte
        const licenca = await prisma.licencaTransportacaoViaturas.update({
          where: { id: parseInt(id) },
          data: {
            viaturaId,
            descricao,
            observacao,
            proprietario,
            dataEmissao,
            dataVencimento,
            licencaStatus,
          },
        });
        res.status(200).json({ message: "Licença de transportação atualizada com sucesso", licenca});
      } catch (error) {
        console.error(error);
        res.status(500).json({ error: "Erro ao atualizar licença de transportação" });
      }
    },
  
    // Deletar Licença de Transportação
    async deleteLicencaTransportacao(req, res) {
      try {
        const { id } = req.params;
        //Verificar se existe
        const licencaExiste = await prisma.licencaTransportacaoViaturas.findUnique({ where: { id: parseInt(id) }});
        if (!licencaExiste) return res.status(404).json({ error: "Licença de transportação não encontrada" });

        // Deletar licença de transporte
        await prisma.licencaTransportacaoViaturas.delete({ where: { id: parseInt(id) } });
        res.status(200).json({ message: "Licença de transportação deletada com sucesso" });
      } catch (error) {
        console.error(error);
        res.status(500).json({ error: "Erro ao deletar licença de transportação" });
      }
    },
  };