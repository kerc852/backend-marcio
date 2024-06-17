const mongoose = require('mongoose');

const Produto = mongoose.model('Produto', {
    nome: String,
    descricao: String,
    cor: String,
    peso: Number,
    tipo: String,
    preco: Number,
    dtcadastro: Number
})

module.exports = Produto;