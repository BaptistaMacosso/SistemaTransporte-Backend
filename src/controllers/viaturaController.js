const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

module.exports = {
async createViatura(req, res){
    const { 
        viaturaMarca,
        viaturaModelo,
        viaturaMatricula,
        viaturaAnoFabrica,
        viaturaCombustivel, 
        viaturaCor,
        viaturaNumeroChassi,
        viaturaNumeroLugar,
        viaturaNumeroMotor,
        quilometragem
    } = req.body;


    if (!viaturaMarca || !viaturaModelo || !viaturaNumeroMotor || !viaturaNumeroChassi || !viaturaCor 
     || !viaturaCombustivel || !viaturaMatricula || !viaturaAnoFabrica || !viaturaNumeroLugar || !quilometragem) {
        return res.status(400).json({ message: 'Todos os campos são obrigatórios' });
    }

    try {
        const viaturaExists = await prisma.viatura.findUnique({ where: { viaturaMatricula } });
        if (viaturaExists) {
            return res.status(400).json({ message: 'Viatura já cadastrada' });
        }
        
        const viatura = await prisma.viatura.create({
            data: {
                viaturaMarca : viaturaMarca,
                viaturaModelo: viaturaModelo,
                viaturaMatricula: viaturaMatricula,
                viaturaAnoFabrica: viaturaAnoFabrica,
                viaturaCombustivel: viaturaCombustivel, 
                viaturaCor: viaturaCor,
                viaturaNumeroChassi: viaturaNumeroChassi,
                viaturaNumeroLugar: viaturaNumeroLugar,
                viaturaNumeroMotor: viaturaNumeroMotor,
                quilometragem: quilometragem
            }
        });

        res.status(201).json({ message: 'Viatura cadastrada com sucesso.', viatura });
    } catch (error) {
        res.status(500).json({ message: 'Erro ao cadastrar viatura: ' + error });
    }
},

async listarViatura (req, res){
    
    try {
        const viatura = await prisma.viatura.findMany({
            select:{
                viaturaId: true,
                viaturaModelo: true,
                viaturaMatricula: true,
                quilometragem: true,
                viaturaCombustivel: true,
                viaturaAnoFabrica: true,
                viaturaNumeroLugar: true,
                viaturaCor: true,
                viaturaMarca: true,
                viaturaNumeroChassi: true,
                viaturaNumeroMotor: true,
                planoManutencao:{
                    select:{
                        dataManutencao: true,
                    }
                }
            },
        });
        res.status(200).json({ viatura: viatura });
    } catch (error) {
        res.status(500).json({ message: 'Erro ao listar viaturas: ' + error });
    }
},

async getViaturaById (req, res){
    const { id } = req.params;

    try {
        const viatura = await prisma.viatura.findUnique({ where: { viaturaId: parseInt(id) } });
        if (!viatura) {
            return res.status(404).json({ message: 'Viatura não encontrada' });
        }
        res.json(viatura);
    }catch (error) {
        res.status(500).json({ message: 'Erro ao listar viaturas: ' + error });
    }
},

async updateViatura (req, res){
    const { id } = req.params;
    const { 
        viaturaMarca,
        viaturaModelo,
        viaturaMatricula,
        viaturaAnoFabrica,
        viaturaCombustivel, 
        viaturaCor,
        viaturaNumeroChassi,
        viaturaNumeroLugar,
        viaturaNumeroMotor,
        quilometragem
    } = req.body;

    try {
        const viaturaExists = await prisma.viatura.findUnique({ where: { viaturaId: parseInt(id) } });
        if (!viaturaExists) {
            return res.status(404).json({ message: 'Viatura não encontrada.' });
        }

        const updatedViatura = await prisma.viatura.update({
            where: { viaturaId: parseInt(id) },
            data: {
                viaturaMarca : viaturaMarca,
                viaturaModelo: viaturaModelo,
                viaturaMatricula: viaturaMatricula,
                viaturaAnoFabrica: viaturaAnoFabrica,
                viaturaCombustivel: viaturaCombustivel, 
                viaturaCor: viaturaCor,
                viaturaNumeroChassi: viaturaNumeroChassi,
                viaturaNumeroLugar: viaturaNumeroLugar,
                viaturaNumeroMotor: viaturaNumeroMotor,
                quilometragem: quilometragem
            }
        });

        res.status(201).json({ message: 'Viatura atualizada com sucesso.', updatedViatura });
    } catch (error) {
        res.status(500).json({ message: 'Erro ao atualizar viatura: ' + error });
    }
},

async deleteViatura (req, res) {
    const { id } = req.params;

    try {
        const viaturaExists = await prisma.viatura.findUnique({ where: { viaturaId: parseInt(id) } });
        if (!viaturaExists) {
            return res.status(404).json({ message: 'Viatura não encontrada' });
        }

        await prisma.viatura.delete({ where: { viaturaId: parseInt(id) } });
        res.status(200).json({ message: 'Viatura deletada com sucesso.' });
    } catch (error) {
        res.status(500).json({ message: 'Erro ao deletar viatura: ' + error });
    }
},
};
