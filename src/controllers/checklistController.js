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
            const insertedChecklist = await prisma.checklist.create({
                data: {
                    viaturaId: viaturaId,
                    tipoManutencaoId: tipoManutencaoId,
                    quilometragem: Number(quilometragem),
                    itemsVerificados: itemsVerificados,
                    observacao: observacao,
                    tecnicoResponsavel: tecnicoResponsavel
                }
            });

            return res.status(201).json({ message: 'Checklist cadastrado com sucesso.', insertedChecklist });
        } catch (error) {
            return res.status(500).json({ message: 'Erro ao cadastrar checklist: ' + error });
        }
    },

    //Obter CheckList
    async listarChecklist(req, res){
        try {
            const listarTodo = await prisma.Checklist.findMany({orderBy: { id: 'asc', }});
            return res.status(200).json({ RetornoChecklist: listarTodo });
        } catch (error) {
            return res.status(500).json({ message: 'Erro ao listar checklists, por favor verifique a console.',error });
        }
    },

    //Deletar Checklist por ID
    async deleteChecklist (req, res){
        const { id } = req.params;

        try {
            const checklistExists = await prisma.checklist.findUnique({ where: { id: parseInt(id) } });
            if (!checklistExists) {
                return res.status(404).json({ message: 'Checklist não encontrado.' });
            }

            const checklistDeleted = await prisma.checklist.delete({ where: { id: parseInt(id) } });
            return res.status(201).json({ message: 'Checklist deletado com sucesso.', checklistDeleted });
        } catch (error) {
            return res.status(500).json({ message: 'Erro ao deletar checklist: ' + error });
        }
},};