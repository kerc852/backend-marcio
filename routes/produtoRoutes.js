const router = require('express').Router();
const Produto = require('../models/Produto');

// POST (INSERT) Inserindo um novo Produto no MongoDB
router.post('/', async (req, res) => {
    const { nome, descricao, cor, peso, tipo, preco, dtcadastro } = req.body;
    
    if (!nome || !descricao || !cor || !peso || !tipo || !preco || !dtcadastro) {
        return res.status(422).json({ error: 'Informar o nome, descrição, cor, peso, tipo, preco e data de cadastro é obrigatório!' });
    }

    const produto = {
        nome,
        descricao,
        cor,
        peso,
        tipo,
        preco,
        dtcadastro
    };

    try {
        await Produto.create(produto);
        res.status(201).json({ message: 'Produto cadastrado com sucesso!' });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

// GET (SELECT) Obter todos os produtos
router.get('/', async (req, res) => {
    try {
        const produtos = await Produto.find();
        res.status(200).json(produtos);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

// GET (SELECT) Obter um produto pelo ID
router.get('/:id', async (req, res) => {
    const { id } = req.params;
    try {
        const produto = await Produto.findById(id);
        if (!produto) {
            return res.status(404).json({ error: 'Produto não encontrado!' });
        }
        res.status(200).json(produto);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

// PUT (UPDATE) Atualizar um produto pelo ID
router.put('/:id', async (req, res) => {
    const { id } = req.params;
    const { nome, descricao, cor, peso, tipo, preco, dtcadastro } = req.body;

    if (!nome || !descricao || !cor || !peso || !tipo || !preco || !dtcadastro) {
        return res.status(422).json({ error: 'Informar o nome, descrição, cor, peso, tipo, preco e data de cadastro é obrigatório!' });
    }

    const produto = {
        nome,
        descricao,
        cor,
        peso,
        tipo,
        preco,
        dtcadastro
    };

    try {
        const updatedProduto = await Produto.findByIdAndUpdate(id, produto, { new: true });
        if (!updatedProduto) {
            return res.status(404).json({ error: 'Produto não encontrado!' });
        }
        res.status(200).json(updatedProduto);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

// DELETE (DELETE) Deletar um produto pelo ID
router.delete('/:id', async (req, res) => {
    const { id } = req.params;
    try {
        const deletedProduto = await Produto.findByIdAndDelete(id);
        if (!deletedProduto) {
            return res.status(404).json({ error: 'Produto não encontrado!' });
        }
        res.status(200).json({ message: 'Produto deletado com sucesso!' });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

module.exports = router;