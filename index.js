const express = require('express');
const mongoose = require('mongoose');
const server = express();

const produtoRoutes = require('./routes/produtoRoutes');

//Middleware
server.use(
    express.urlencoded({
        extended: true,
    }),
);

server.use(express.json());

//Criando o endpoint e rotas da minha API
server.use('/produto', produtoRoutes);

//Conexão com MongoDB Atlas
const DB_USER = 'mernproject';
const DB_PASSWORD = 'morango123'

//Conexão com MongoDB Atlas
mongoose.connect(
    `mongodb+srv://${DB_USER}:${DB_PASSWORD}@cluster0.idilir7.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0`
)
.then(()=>{
    console.log('Conectado ao MongoDB!');
})
.catch((err)=>{
    console.log(err);
})

//Porta do servidor
server.listen(3000);