// controllers/licencaTransportacaoController.js
const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

module.exports = {
    // Criar Licença de Transportação
    async createLicencaTransportacao(req, res) {
      try {
        const { viaturaId, descricao, observacao, proprietario, dataEmissao, dataVencimento, licencaStatus } = req.body;
        //Verificação.
        if (!viaturaId || !descricao || !proprietario || !dataEmissao || !dataVencimento || !licencaStatus) {
          return res.status(400).json({ error: "Todos os campos são obrigatórios." });
        };

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
        return res.status(201).json({ message: "Licença de transportação criada com sucesso.", licenca});
      } catch (error) {
        return res.status(500).json({ error: "Erro ao criar licença de transportação." });
      }
    },
  
    // Listar Licenças de Transportação
    async getAllLicencasTransportacao(req, res) {
      try {
        const licencas = await prisma.licencaTransportacaoViaturas.findMany({
          select:{
            id: true,
            viaturaId: true,
            descricao: true,
            observacao: true,
            proprietario: true,
            dataEmissao: true,
            dataVencimento: true,
            licencaStatus: true,
            select:{
              viaturaMarca: true,
              viaturaModelo: true,
              viaturaMatricula: true,
            },
          }
        });
        return res.status(200).json({licencas: licencas});
      } catch (error) {
        return res.status(500).json({ message: "Erro ao buscar licenças de transportação. "+error });
      }
    },
  
    // Obter Licença de Transportação por ID
    async getLicencaTransportacaoById(req, res) {
      try {
        const { id } = req.params;
        const licenca = await prisma.licencaTransportacaoViaturas.findUnique({ where: { id: parseInt(id) }});
        if (!licenca){ 
          return res.status(404).json({ error: "Licença de transportação não encontrada." });
        }
       return res.status(200).json({licencas: licenca});
      } catch (error) {
        return res.status(500).json({ message: "Erro ao buscar licença de transportação."+error });
      }
    },
  
    // Atualizar Licença de Transportação
    async updateLicencaTransportacao(req, res) {
      try {
        const { id } = req.params;
        const { viaturaId, descricao, observacao, proprietario, dataEmissao, dataVencimento, licencaStatus } = req.body;

        //Verificar se existe
        const licencaExiste = await prisma.licencaTransportacaoViaturas.findUnique({ where: { id: parseInt(id) }});
        if (!licencaExiste){ 
          return res.status(404).json({ message: "Licença de transportação não encontrada." });
        };
        
        // Atualizar licença de transporte
        const licenca = await prisma.licencaTransportacaoViaturas.update({ where: { id: parseInt(id) },
          data: {
            viaturaId: viaturaId,
            descricao: descricao,
            observacao: observacao,
            proprietario: proprietario,
            dataEmissao: dataEmissao,
            dataVencimento: dataVencimento,
            licencaStatus: licencaStatus,
          },
        });
        return res.status(200).json({ message: "Licença de transportação atualizada com sucesso", licenca});
      } catch (error) {
        return res.status(500).json({ message: "Erro ao atualizar licença de transportação."+error });
      }
    },
  
    // Deletar Licença de Transportação
    async deleteLicencaTransportacao(req, res) {
      try {
        const { id } = req.params;
        //Verificar se existe
        const licencaExiste = await prisma.licencaTransportacaoViaturas.findUnique({ where: { id: parseInt(id) }});
        if (!licencaExiste){ 
          return res.status(404).json({ error: "Licença de transportação não encontrada." });
        };

        // Deletar licença de transporte
        await prisma.licencaTransportacaoViaturas.delete({ where: { id: parseInt(id) } });
        return res.status(200).json({ message: "Licença de transportação deletada com sucesso." });
      } catch (error) {
        return res.status(500).json({ message: "Erro ao deletar licença de transportação. "+error });
      }
    },
  };