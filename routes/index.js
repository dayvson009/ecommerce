const express = require('express');
const router = express.Router();

// Importar rotas específicas
const homeRoutes = require('./home');
const buscaRoutes = require('./buscar');

router.use('/', homeRoutes);
router.use('/busca', buscaRoutes);

router.use('/*', function(req, res, next) {
 res.redirect('/');
});

module.exports = router;
