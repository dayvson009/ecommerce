const express = require('express');
const router = express.Router();

// Importar rotas específicas
const homeRoutes = require('./home');
const searchRoutes = require('./search');
const productsRoutes = require('./products');
const initiateCheckoutRoutes = require('./initiateCheckout');

router.use('/', homeRoutes);
router.use('/buscar', searchRoutes);
router.use('/produtos', productsRoutes);
router.use('/detalhes', initiateCheckoutRoutes);

router.use('/*', function(req, res, next) {
 res.redirect('/');
});

module.exports = router;
