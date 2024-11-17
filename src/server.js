require('dotenv').config();
const express = require('express');
const cors = require('cors');

//Rotas do sistema.
const userRoutes = require('./routes/userRoutes');
const usertipoRoutes = require('./routes/usertipoRoutes');
const planoManutencaoRoutes = require('./routes/planoManutencaoRoutes');
const motoristaRoutes = require('./routes/motoristaRoutes');
const viaturaRoutes = require('./routes/viaturaRoutes');
const publicidadeRoutes = require('./routes/publicidadeRoutes');
const manutencaoRoutes = require('./routes/manutencaoRoutes');


//Configuração Inicial.
const PORT = process.env.PORT || 5000;
const app = express();
app.use(express.json());
app.use(cors({
  origin: 'sistema-transporte-react-js.vercel.app',
  methods: ['GET', 'POST', 'PUT', 'DELETE'],
  allowedHeaders: ['Content-Type', 'Authorization'],
}));

//Usar as Rotas.
app.use('/api/auth', userRoutes);
app.use('/api/usertipo', usertipoRoutes);
app.use('/api/planomanutencao', planoManutencaoRoutes);
app.use('/api/motorista', motoristaRoutes);
app.use('/api/viatura', viaturaRoutes);
app.use('/api/publicidade', publicidadeRoutes);
app.use('/api/manutencao', manutencaoRoutes);



//Iniciar o servidor.
app.listen(PORT, () => {
  console.log(`Servidor rodando no endereço http://localhost:${PORT}`);
});