const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

module.exports = {
    //Create CheckList
    async createChecklist(req, res){
        const { viaturaId,motoristaId,odometro,nivelCombustivel,condicaoPneus,
                observacao,status,itens} = req.body;

        if (!viaturaId || !motoristaId || !odometro || !nivelCombustivel || !condicaoPneus || !status) {
            return res.status(409).json({ message: 'Todos os campos são de preenchimento obrigatórios.' });
        };

        if (isNaN(Number(odometro))) {
            return res.status(500).json({message:"Quilometragem deve ser um número."});
        };

        try {
            const insertedChecklist = await prisma.checklist.create({
                data: {
                    viaturaId: viaturaId,
                    motoristaId: motoristaId,
                    odometro: Number(odometro),
                    nivelCombustivel: nivelCombustivel,
                    condicaoPneus: condicaoPneus,
                    observacao: observacao,
                    status: status,
                    itens: {
                        create: itens.map(item => ({
                            descricao: item.descricao,
                            marcado: item.marcado,
                            status: item.status
                        }))
                    }
                },
                include: { itens: true } 
            });

            return res.status(201).json({ message: 'Checklist criado com sucesso.', insertedChecklist });
        } catch (error) {
            return res.status(500).json({ message: 'Erro ao criar checklist, por favor verifique a console.',error });
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

    //Listar CheckListItem Pelo ID
    async listarChecklistItemById(req, res) {
        const { id } = req.params;
    
        try {
            const item = await prisma.checklistItem.findUnique({ where: { id: Number(id) }});
            if (!item) {
                return res.status(404).json({ message: 'Item não encontrado.' });
            }
    
            return res.status(200).json({ item });
        } catch (error) {
            return res.status(500).json({ message: 'Erro ao buscar item, por favor verifique a console.', error});
        }
    },    

    //Update CheckListeItem
    async updateChecklistItem(req, res) {
        const { id } = req.params;
        const { descricao, marcado, status } = req.body;
    
        try {
            const item = await prisma.checklistItem.update({
                where: { id: Number(id) },
                data: { descricao, marcado, status }
            });
    
            return res.status(200).json({ message: 'Item atualizado com sucesso.', item });
        } catch (error) {
            return res.status(500).json({ message: 'Erro ao atualizar item, por favor verifique a console.', error });
        }
    },

    //Delete CheckListItem
    async deleteChecklistItem(req, res) {
        const { id } = req.params;
    
        try {
            await prisma.checklistItem.delete({where: { id: Number(id) }});
    
            return res.status(200).json({ message: 'Item deletado com sucesso.' });
        } catch (error) {
            return res.status(500).json({ message: 'Erro ao deletar item, por favor verifique a console.', error});
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
            return res.status(500).json({ message: 'Erro ao deletar checklist, por favor verifique a console.',error });
        }
    },

};