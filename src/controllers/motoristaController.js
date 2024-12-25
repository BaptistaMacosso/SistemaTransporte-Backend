const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

module.exports = {
async createMotorista (req, res){
    const { 
        motoristaNome,
        numeroBI,
        motoristaEmail, 
        motoristaTelefone, 
        CartaDeConducaoNr, 
        DataValidade, 
    } = req.body;

    if (!motoristaNome || !numeroBI || !motoristaEmail || !motoristaTelefone || !CartaDeConducaoNr || !DataValidade ) {
        return res.status(400).json({ message: 'Todos os campos são obrigatórios' });
    }

    try {
        const motoristaExists = await prisma.motorista.findUnique({ where: { numeroBI } });
        if (motoristaExists) {
            return res.status(400).json({ message: 'Motorista já cadastrado' });
        }
        
        const motorista = await prisma.motorista.create({
            data: {
                motoristaNome : motoristaNome,
                numeroBI: numeroBI,
                motoristaEmail: motoristaEmail,
                motoristaTelefone: motoristaTelefone,
                CartaDeConducaoNr: CartaDeConducaoNr,
                DataValidade: DataValidade
            }
        });

        res.status(201).json({ message: 'Motorista cadastrado com sucesso', motorista });
    } catch (error) {
        res.status(500).json({ message: 'Erro ao cadastrar motorista: ' + error });
    }
},

async listarMotorista (req, res){
    try {
        const motorista = await prisma.motorista.findMany();
        res.status(200).json({ motoristas: motorista });
    } catch (error) {
        res.status(500).json({ message: 'Erro ao listar motoristas: ' + error });
    }
},

async getMotoristaById (req, res){
    const { id } = req.params;

    try {
        const motorista = await prisma.motorista.findUnique({ where: { motoristaId: parseInt(id) } });
        if (!motorista) {
            return res.status(404).json({ message: 'Motorista não encontrado.' });
        }
        res.status(200).json({motorista: motorista});
    } catch (error) {
        res.status(500).json({ message: 'Erro ao buscar motorista: ' + error});
    }
},

async updateMotorista (req, res){
    const { id } = req.params;
    const { 
        motoristaNome,
        numeroBI, 
        motoristaEmail, 
        motoristaTelefone, 
        CartaDeConducaoNr, 
        DataValidade
    } = req.body;

    try {
        const motoristaExists = await prisma.motorista.findUnique({ where: { motoristaId: parseInt(id) } });
        if (!motoristaExists) {
            return res.status(404).json({ message: 'Motorista não encontrado' });
        }

        const updatedMotorista = await prisma.motorista.update({
            where: { motoristaId: parseInt(id) },
            data: {
                motoristaNome : motoristaNome,
                numeroBI: numeroBI,
                motoristaEmail: motoristaEmail,
                motoristaTelefone: motoristaTelefone,
                CartaDeConducaoNr: CartaDeConducaoNr,
                DataValidade: DataValidade
            }
        });

        res.status(201).json({ message: 'Motorista atualizado com sucesso', updatedMotorista });
    } catch (error) {
        res.status(500).json({ message: 'Erro ao atualizar motorista: ' + error });
    }
},

async deleteMotorista (req, res){
    const { id } = req.params;

    try {
        const motoristaExists = await prisma.motorista.findUnique({ where: { motoristaId: parseInt(id) } });
        if (!motoristaExists) {
            return res.status(404).json({ message: 'Motorista não encontrado' });
        }

        await prisma.motorista.delete({ where: { motoristaId: parseInt(id) } });
        res.status(201).json({ message: 'Motorista deletado com sucesso' });
    } catch (error) {
        res.status(500).json({ message: 'Erro ao deletar motorista: ' + error });
    }
},
};