require('dotenv').config();
const express = require('express');
const cors = require('cors');
//Rotas do sistema.
const Rotas = require('./routes');


//Configuração Inicial.
const app = express();
//Configuração para permitir o JSON
app.use(express.json());

app.use('*', cors({
  //origin: 'https://sistema-transporte-react-js.vercel.app',
  origin: 'http://localhost:3000',
  methods: ['GET', 'POST', 'PUT', 'DELETE'],
  allowedHeaders: ['Content-Type', 'Authorization'],
  
  }));
  
  
  //Usar as Rotas.
  app.use('/api', Rotas);
  
  //Iniciar o servidor.
  const PORT = process.env.PORT || 5000;
  app.listen(PORT, () => {
    console.log(`Servidor rodando no endereço http://localhost:${PORT}`);
  });
