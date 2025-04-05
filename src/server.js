  require('dotenv').config();
  const express = require('express');
  const cors = require('cors');
  //Rotas do sistema.
  const Rotas = require('./routes');

  const corsOptions = {
    //origin: 'https://sistema-transporte-react-js.vercel.app',
    origin: 'http://localhost:3000', // ou '*' para testes
    methods: ['GET', 'POST', 'PUT', 'DELETE'],
    allowedHeaders: ['Content-Type', 'Authorization'],
    credentials: true,
  };

  
  //Configuração Inicial.
  const app = express();
  app.use(cors(corsOptions)); // 👈 deve vir antes de tudo
  
  //Configuração para permitir o JSON
  app.use(express.json());
  
  //Usar as Rotas.
  app.use('/api', Rotas);
  
  //Iniciar o servidor.
  const PORT = process.env.PORT || 5000;
  app.listen(PORT, () => {
    console.log(`Servidor rodando no endereço http://localhost:${PORT}`);
  });
