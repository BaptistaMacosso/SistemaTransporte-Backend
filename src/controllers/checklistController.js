const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

module.exports = {
    async createChecklist(req, res){
        const { 
            viaturaId,
            tipoManutencaoId,
            quilometragem,
            itemsVerificados,
            observacao
        } = req.body;

        if (!viaturaId || !tipoManutencaoId || !quilometragem || !itemsVerificados || !observacao) {
            return res.status(400).json({ message: 'Todos os campos são obrigatórios' });
        }

        try {
            const checklist = await prisma.checklist.create({
                data: {
                    viaturaId: viaturaId,
                    tipoManutencaoId: tipoManutencaoId,
                    quilometragem: quilometragem,
                    itemsVerificados: itemsVerificados,
                    observacao: observacao
                }
            });

            res.status(201).json({ message: 'Checklist cadastrado com sucesso', checklist });
        } catch (error) {
            res.status(500).json({ message: 'Erro ao cadastrar checklist: ' + error });
        }
    },

    async listarChecklist(req, res){
        try {
            const checklist = await prisma.checklist.findMany({
                select:{
                    id: true,
                    viaturaId: true,
                    tipoManutencaoId: true,
                    quilometragem: true,
                    itemsVerificados: true,
                    observacao: true,
                    viatura:{
                        select:{
                            viaturaMatricula: true
                        }
                    },
                    tipoManutencao:{
                        select:{
                            tipoManutencao: true
                        }
                    }
                }
            });
            res.status(200).json({ checklist: checklist });
        } catch (error) {
            res.status(500).json({ message: 'Erro ao listar checklists: ' + error });
        }
    },

    async deleteChecklist (req, res){
        const { id } = req.params;

        try {
            const checklistExists = await prisma.checklist.findUnique({ where: { id: parseInt(id) } });
            if (!checklistExists) {
                return res.status(404).json({ message: 'Checklist não encontrado' });
            }

            await prisma.checklist.delete({ where: { id: parseInt(id) } });
            res.status(201).json({ message: 'Checklist deletado com sucesso' });
        } catch (error) {
            res.status(500).json({ message: 'Erro ao deletar checklist: ' + error });
        }
},};