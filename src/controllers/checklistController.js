const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

module.exports = {
    //Create CheckList
    async createChecklist(req, res){
        const { 
            viaturaId,
            tipoManutencaoId,
            quilometragem,
            itemsVerificados,
            observacao,
            tecnicoResponsavel
        } = req.body;

        if (!viaturaId || !tipoManutencaoId || !quilometragem || !itemsVerificados || !observacao || !tecnicoResponsavel) {
            return res.status(400).json({ message: 'Todos os campos são obrigatórios' });
        }

        if (isNaN(Number(quilometragem))) {
            return res.status(500).json({message:"Quilometragem deve ser um número."});
          }

        try {
            const checklist = await prisma.checklist.create({
                data: {
                    viaturaId: viaturaId,
                    tipoManutencaoId: tipoManutencaoId,
                    quilometragem: Number(quilometragem),
                    itemsVerificados: itemsVerificados,
                    observacao: observacao,
                    tecnicoResponsavel: tecnicoResponsavel
                }
            });

            res.status(201).json({ message: 'Checklist cadastrado com sucesso', checklist });
        } catch (error) {
            res.status(500).json({ message: 'Erro ao cadastrar checklist: ' + error });
        }
    },

    //Obter CheckList
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
                    dataCheckList: true,
                    tecnicoResponsavel: true,
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
            console.log('Lista de checklists: '+checklist);
            res.status(200).json({ checklist: checklist });
        } catch (error) {
            res.status(500).json({ message: 'Erro ao listar checklists: ' + error });
        }
    },

    //Deletar Checklist por ID
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