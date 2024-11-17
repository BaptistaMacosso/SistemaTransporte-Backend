const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

const createChecklist = async (req, res) => {
    const { 
        tipo,
        data,
        observacoes,
        viaturaId,
        createdAt,
        updatedAt
    } = req.body;

    if (!tipo || !data || !observacoes || !viaturaId) {
        return res.status(400).json({ message: 'Todos os campos são obrigatórios' });
    }

    try {
        const checklist = await prisma.checklist.create({
            data: {
                tipo: tipo,
                data: data,
                observacoes: observacoes,
                viaturaId: viaturaId,
                createdAt: createdAt,
                updatedAt: updatedAt
            }
        });

        res.status(201).json({ message: 'Checklist cadastrado com sucesso', checklist });
    } catch (error) {
        res.status(500).json({ message: 'Erro ao cadastrar checklist: ' + error });
    }
};

const listarChecklist = async (req, res) => {
    try {
        const checklist = await prisma.checklist.findMany();
        res.status(200).json({ checklist });
    } catch (error) {
        res.status(500).json({ message: 'Erro ao listar checklists: ' + error });
    }
};

const deleteChecklist = async (req, res) => {
    const { id } = req.params;

    try {
        const checklistExists = await prisma.checklist.findUnique({ where: { checklistId: parseInt(id) } });
        if (!checklistExists) {
            return res.status(404).json({ message: 'Checklist não encontrado' });
        }

        await prisma.checklist.delete({ where: { checklistId: parseInt(id) } });
        res.status(201).json({ message: 'Checklist deletado com sucesso' });
    } catch (error) {
        res.status(500).json({ message: 'Erro ao deletar checklist: ' + error });
    }
};


module.exports = { createChecklist, listarChecklist, deleteChecklist };