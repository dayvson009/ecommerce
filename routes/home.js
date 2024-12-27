const express = require('express');
const router = express.Router();
const axios = require('axios');

const categories = [
  {
    title: "Rastreadores",
    image:"https://down-br.img.susercontent.com/file/br-50009109-9dbe7bbd415f53473ed0eab848605dc6@resize_w320_nl.webp"
  },
  {
    title: "Celulares",
    image:"https://down-br.img.susercontent.com/file/br-50009109-f95f82fd3a325a3a994cda7263b145e9@resize_w320_nl.webp"
  },
  {
    title: "Para o Lar",
    image:"https://down-br.img.susercontent.com/file/br-50009109-3a92b15549fcbb1ba5e5558dfdb72b61@resize_w320_nl.webp"
  },
  {
    title: "Informática",
    image:"https://down-br.img.susercontent.com/file/br-50009109-8227fa610864a8efb18c7ee15290dd7b@resize_w320_nl.webp"
  },
  {
    title: "Eletrônicos",
    image:"https://down-br.img.susercontent.com/file/br-50009109-95f61dbceab2e978e67235030a9932b4@resize_w320_nl.webp"
  },
  {
    title: "Ferramentas",
    image:"https://down-br.img.susercontent.com/file/br-11134258-7r98o-m3l0rns8dut139@resize_w320_nl.webp"
  },
  {
    title: "Esportes e Fitness",
    image:"https://down-br.img.susercontent.com/file/br-50009109-69c63b2deabe837ed5f41fd5d9b84762@resize_w320_nl.webp"
  },
  {
    title: "Rastreadores",
    image:"https://down-br.img.susercontent.com/file/br-50009109-6a8d385a65f7683d87446cc79f1e10dd@resize_w320_nl.webp"
  },
  {
    title: "Celulares",
    image:"https://down-br.img.susercontent.com/file/br-50009109-41d8fa483dba9777a5ea31f72736ebb2@resize_w320_nl.webp"
  },
  {
    title: "Para o Lar",
    image:"https://down-br.img.susercontent.com/file/br-50009109-3372b5b1d85ce6313c01eca39ab1702f@resize_w320_nl.webp"
  },
  {
    title: "Informática",
    image:"https://down-br.img.susercontent.com/file/br-50009109-e36aea6b03c72d17710e5c1880067be0@resize_w320_nl.webp"
  },
  {
    title: "Eletrônicos",
    image:"https://down-br.img.susercontent.com/file/br-50009109-a3689d12b70b379edaff062e303b2125@resize_w320_nl.webp"
  }
]

// Listar produtos
router.get('/', async (req, res) => {

  try {
      const response = await axios.get(`${process.env.YAMPI_API_BASE}/catalog/products?include=firstImage,skus`, {
          headers: {
            "User-Token": process.env.YAMPI_TOKEN,
            "User-Secret-Key": process.env.YAMPI_SECRET_KEY,
          },
      });

      res.render('home', { produtos: response.data.data, categories });

  } catch (error) {
      console.error(error.message);
      res.status(500).json({ erro: 'Erro ao conectar com a API da Yampi.' });
  }
});

module.exports = router;
