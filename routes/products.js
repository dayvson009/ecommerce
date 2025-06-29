const express = require('express');
const router = express.Router();
const axios = require('axios');

const src = {
  currentPage: 'produtos',
  styles: ["header.css", "products.css", "notification.css", "footer.css"],
  scripts: ["activity.js", "notification.js", "cookies.js"]
}


// Listar produtos
router.get('/', async (req, res) => {

  res.render('products', {src});

  // try {
  //     const response = await axios.get(`${process.env.YAMPI_API_BASE}/catalog/products?include=images`, {
  //         headers: {
  //           "User-Token": process.env.YAMPI_TOKEN,
  //           "User-Secret-Key": process.env.YAMPI_SECRET_KEY,
  //         },
  //     });

  //     res.render('produtos', {src,  produtos: response.data.data });

  // } catch (error) {
  //     console.error(error.message);
  //     res.status(500).json({ erro: 'Erro ao conectar com a API da Yampi.' });
  // }
});
router.get('/:select', async (req, res) => {

  res.render('products');

  // try {
  //     const response = await axios.get(`${process.env.YAMPI_API_BASE}/catalog/products?include=images`, {
  //         headers: {
  //           "User-Token": process.env.YAMPI_TOKEN,
  //           "User-Secret-Key": process.env.YAMPI_SECRET_KEY,
  //         },
  //     });

  //     res.render('produtos', { src, produtos: response.data.data });

  // } catch (error) {
  //     console.error(error.message);
  //     res.status(500).json({ erro: 'Erro ao conectar com a API da Yampi.' });
  // }
});

module.exports = router;
