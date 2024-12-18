const express = require('express');
const router = express.Router();

// Importar rotas específicas
const produtosRoutes = require('./produtos');
const categoriasRoutes = require('./categorias');

// Usar as rotas
router.use('/produtos', produtosRoutes);
router.use('/categorias', categoriasRoutes);

module.exports = router;
