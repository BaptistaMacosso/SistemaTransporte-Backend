const jwt = require('jsonwebtoken');
const { PrismaClient } = require('@prisma/client');

const prisma = new PrismaClient();

const protect = async (req, res, next) => {
  let token;
  
  if (req.headers.authorization && req.headers.authorization.startsWith('Bearer')) {
    try {
      token = req.headers.authorization.split(' ')[1];
      const decoded = jwt.verify(token, process.env.JWT_SECRET);
      console.log('Chave Secreta:', process.env.JWT_SECRET);
      req.user = await prisma.user.findUnique({ where: { userId: decoded.id } });

      if (!req.user) {
        return res.status(401).json({ message: 'Usuário não encontrado' });
      }

      next();
    } catch (error) {
      res.status(401).json({ message: 'Não autorizado, token inválido' });
    }
  } else {
    res.status(401).json({ message: 'Não autorizado, sem token' });
  }
};

module.exports = { protect };