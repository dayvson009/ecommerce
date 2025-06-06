const express = require('express');
const router = express.Router();
const axios = require('axios');

const src = {
  currentPage: 'detalhes',
  styles: ["header.css", "checkout.css", 'cardProduct.css', "notification.css", "footer.css"],
  scripts: ["activity.js", "notification.js", "cookies.js", "swipe.js", "checkout.js"]
}

router.get('/:product', async (req, res) => {

  const product = req.params.product.split('-')[0];

  try {
      const response = await axios.get(`${process.env.YAMPI_API_BASE}/catalog/products/${product}?include=texts,images,skus.firstImage,reviews&skipCache=true`, {
          headers: {
            "User-Token": process.env.YAMPI_TOKEN,
            "User-Secret-Key": process.env.YAMPI_SECRET_KEY,
          },
      });
      const comment = await axios.get(`${process.env.YAMPI_API_BASE}/catalog/products/${product}/comments`, {
          headers: {
            "User-Token": process.env.YAMPI_TOKEN,
            "User-Secret-Key": process.env.YAMPI_SECRET_KEY,
          },
      });
      res.render('initiateCheckout', { src, product: response.data.data, comments: comment.data.data });

  } catch (error) {
      console.error(error.message);
      res.status(500).json({ erro: 'Erro ao conectar com a API da Yampi.' });
  }
});

module.exports = router;
