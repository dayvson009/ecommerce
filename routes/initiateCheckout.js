const express = require('express');
const router = express.Router();
const fs = require('fs');
const path = require('path');

// Função para carregar produtos do JSON
function carregarProdutos() {
  try {
    const data = fs.readFileSync(path.join(__dirname, '../produtos.json'), 'utf8');
    const produtosData = JSON.parse(data);
    return produtosData.produtos;
  } catch (error) {
    console.error('Erro ao carregar produtos:', error);
    return [];
  }
}

const src = {
  currentPage: 'detalhes',
  styles: ["header.css", "checkout.css", 'cardProduct.css', "notification.css", "footer.css"],
  scripts: ["activity.js", "notification.js", "cookies.js", "swipe.js", "checkout.js"]
}

router.get('/:product', async (req, res) => {
  const productId = req.params.product.split('-')[0];
  
  try {
    // Carregar produtos do JSON
    const produtos = carregarProdutos();
    
    // Encontrar o produto pelo ID
    const product = produtos.find(p => p.id === parseInt(productId));
    
    if (!product) {
      return res.status(404).render('404');
    }

    res.render('initiateCheckout', { 
      src, 
      product: product
    });

  } catch (error) {
    console.error(error.message);
    res.status(500).json({ erro: 'Erro interno do servidor.' });
  }
});

module.exports = router;
