const mongoose = require('mongoose');
const express = require('express');
const server = express();
const produtoRoutes = require('./routes/produtoRoutes');

// Middleware para processar corpos de requisição
server.use(express.urlencoded({ extended: true }));
server.use(express.json());

// Configuração das rotas para o serviço Web no Render
server.use('/api', produtoRoutes); // Use o prefixo /api ou o que for apropriado

// URI de conexão do MongoDB Atlas (usando variável de ambiente)
const MONGODB_URI = process.env.MONGODB_URI;

// Conexão com o MongoDB Atlas
mongoose.connect(MONGODB_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
})
.then(() => {
  console.log('Conectado ao MongoDB!');
  // Iniciar o servidor apenas depois de conectar ao MongoDB
  server.listen(process.env.PORT || 3000, () => {
    console.log(`Servidor rodando na porta ${process.env.PORT || 3000}`);
  });
})
.catch((err) => {
  console.error('Erro ao conectar ao MongoDB:', err);
});