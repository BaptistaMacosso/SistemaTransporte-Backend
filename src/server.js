require('dotenv').config();
const express = require('express');
const cors = require('cors');

//Rotas do sistema.
const Rotas = require('./routes');


//Configuração Inicial.
const PORT = process.env.PORT || 5000;
const app = express();
app.use(express.json());
app.use(cors({
  origin: 'https://sistema-transporte-react-js.vercel.app',
  //origin: '*',
  methods: ['GET', 'POST', 'PUT', 'DELETE'],
  allowedHeaders: ['Content-Type', 'Authorization'],
}));

//Usar as Rotas.
app.use('/api', Rotas);

//Iniciar o servidor.
app.listen(PORT, () => {
  console.log(`Servidor rodando no endereço http://localhost:${PORT}`);
});
