const express = require('express');
const router = express.Router();

// Importar rotas específicas
const homeRoutes = require('./home');
const searchRoutes = require('./search');
const productsRoutes = require('./products');
const initiateCheckoutRoutes = require('./initiateCheckout');
const paymentRoutes = require('./payment');
const clienteRoutes = require('./cliente');

router.use('/', homeRoutes);
router.use('/buscar', searchRoutes);
router.use('/produtos', productsRoutes);
router.use('/detalhes', initiateCheckoutRoutes);
router.use('/payment', paymentRoutes);
router.use('/cliente', clienteRoutes);

// Rotas para páginas legais
router.get('/politica-privacidade', (req, res) => {
  res.render('politica_de_privacidade');
});

router.get('/termos-condicoes', (req, res) => {
  res.render('termos_e_condicoes');
});

router.get('/contato', (req, res) => {
  res.render('contato');
});

router.use('/*', function(req, res, next) {
 res.redirect('/');
});

module.exports = router;
