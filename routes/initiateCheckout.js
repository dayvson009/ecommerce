const express = require('express');
const router = express.Router();
const axios = require('axios');

router.get('/:product', async (req, res) => {

  const product = req.params.product.split('-')[0];

  try {
      const response = await axios.get(`${process.env.YAMPI_API_BASE}/catalog/products/${product}?include=texts,images,skus.firstImage`, {
          headers: {
            "User-Token": process.env.YAMPI_TOKEN,
            "User-Secret-Key": process.env.YAMPI_SECRET_KEY,
          },
      });
      
      res.render('initiateCheckout', { product: response.data.data });

  } catch (error) {
      console.error(error.message);
      res.status(500).json({ erro: 'Erro ao conectar com a API da Yampi.' });
  }
});

module.exports = router;
