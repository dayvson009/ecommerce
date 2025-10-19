const express = require('express');
const router = express.Router();
const fs = require('fs');
const path = require('path');

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

router.get('/atividades', (req, res) => {
  res.json(JSON.parse(fs.readFileSync(path.join(__dirname, '../atividades.json'), 'utf8')));
  const atividades = JSON.parse(fs.readFileSync(path.join(__dirname, '../atividades.json'), 'utf8'));
  res.json(atividades);
});

router.get('/contato', (req, res) => {
  res.render('contato');
});

// Endpoint para receber dados de atividade (substitui o externo)
router.post('/api/activity', (req, res) => {
  try {
    const { cliente, device, activity } = req.body;
    
    // Log da atividade no console do servidor
    console.log(`[ACTIVITY] ${cliente} (${device}): ${activity}`);
    
    // Salvar atividade no arquivo JSON
    const fs = require('fs');
    const path = require('path');
    
    try {
      const atividadesPath = path.join(__dirname, '../atividades.json');
      let atividades = { atividades: [] };
      
      // Carregar atividades existentes
      if (fs.existsSync(atividadesPath)) {
        const data = fs.readFileSync(atividadesPath, 'utf8');
        atividades = JSON.parse(data);
      }
      
      // Adicionar nova atividade
      atividades.atividades.push({
        cliente: cliente,
        device: device,
        activity: activity,
        timestamp: new Date().toISOString()
      });
      
      // Manter apenas as últimas 1000 atividades
      if (atividades.atividades.length > 1000) {
        atividades.atividades = atividades.atividades.slice(-1000);
      }
      
      // Salvar arquivo
      fs.writeFileSync(atividadesPath, JSON.stringify(atividades, null, 2));
      
    } catch (fileError) {
      console.error('Erro ao salvar atividade:', fileError);
    }
    
    res.json({ 
      success: true, 
      message: 'Atividade registrada com sucesso' 
    });
    
  } catch (error) {
    console.error('Erro ao processar atividade:', error);
    res.status(500).json({ 
      success: false, 
      message: 'Erro interno do servidor' 
    });
  }
});

router.use('/*', function(req, res, next) {
 res.redirect('/');
});

module.exports = router;
