const express = require('express');
const router = express.Router();
const axios = require('axios');

// Listar produtos
router.get('/', async (req, res) => {
  try {
      const response = await axios.get(`${process.YAMPI_API_BASE}/catalog/products?include=images`, {
          headers: {
            "User-Token": process.env.YAMPI_TOKEN,
            "User-Secret-Key": process.env.YAMPI_SECRET_KEY,
          },
      });
      res.json(response.data);
  } catch (error) {
      console.error(error.message);
      res.status(500).json({ erro: 'Erro ao conectar com a API da Yampi.' });
  }
});

module.exports = router;
