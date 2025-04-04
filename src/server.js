require('dotenv').config();
const express = require('express');
const cors = require('cors');
//Rotas do sistema.
const Rotas = require('./routes');


//Configuração Inicial.
const app = express();
//Configuração para permitir o JSON
app.use(express.json());

  // Middleware CORS
  app.use(cors({
    origin: [
      'http://localhost:3000', // Desenvolvimento
      'https://sistema-transporte-react-js.vercel.app' // Produção
    ],
    methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
    allowedHeaders: [
      'Content-Type',
      'Authorization',
      'X-Requested-With',
      'Accept'
    ],
    credentials: true,
    maxAge: 86400
  }));

  // Middleware para headers manuais (Vercel necessita)
  app.use((req, res, next) => {
    res.header('Access-Control-Allow-Origin', req.headers.origin || '*');
    res.header('Access-Control-Allow-Credentials', 'true');
    res.header('Access-Control-Allow-Methods', 'GET,POST,PUT,DELETE,OPTIONS');
    res.header('Access-Control-Allow-Headers', 
      'Origin, X-Requested-With, Content-Type, Accept, Authorization');
    
    if (req.method === 'OPTIONS') {
      return res.status(204).end();
    }
    next();
  });
  
  //Usar as Rotas.
  app.use('/api', Rotas);
  
  //Iniciar o servidor.
  const PORT = process.env.PORT || 5000;
  app.listen(PORT, () => {
    console.log(`Servidor rodando no endereço http://localhost:${PORT}`);
  });
