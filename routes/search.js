const express = require('express');
const router = express.Router();
const axios = require('axios');

const src = {
  currentPage: 'buscar',
  styles: ["header.css", 'cardProduct.css', "buscar.css", "notification.css", "footer.css"],
  scripts: ["activity.js", "notification.js", "cookies.js"]
}

const API_BASE = process.env.YAMPI_API_BASE;
const HEADERS = {
    "User-Token": process.env.YAMPI_TOKEN,
    "User-Secret-Key": process.env.YAMPI_SECRET_KEY
};

router.get('/', async (req, res) => {
    const item = req.params.item;
    console.log(req);
    console.log(req.query.sort_by);
    const sort_by = req.query.sort_by || 'relevance'; // Define a ordenação padrão como relevância
    const min = req.query.min || null;
    const max = req.query.max || null;
    const category_id = req.query.category_id || null;
    const brand_id = req.query.brand_id || null;
    const page = req.query.page || 1;
    
    // Montar URL com filtros dinâmicos
    let searchUrl = `${API_BASE}/public/search/products?q=${item}&context=search&limit=24&sort_by=${sort_by}&resultsOnly=true&page=${page}`;
    console.log(sort_by);
    console.log(searchUrl);
    if (min) searchUrl += `&min=${min}`;
    if (max) searchUrl += `&max=${max}`;
    if (category_id) searchUrl += `&category_id[]=${category_id}`;
    if (brand_id) searchUrl += `&brand_id[]=${brand_id}`;

    try {
        // Fazendo todas as requisições simultaneamente
        const [products, count, categories, prices, brands] = await Promise.all([
            axios.get(searchUrl, { headers: HEADERS }),
            axios.get(`${API_BASE}/public/search/products/count?q=${item}&context=search`, { headers: HEADERS }),
            axios.get(`${API_BASE}/public/search/products/categories?q=${item}&context=search`, { headers: HEADERS }),
            axios.get(`${API_BASE}/public/search/products/prices?q=${item}&context=search`, { headers: HEADERS }),
            axios.get(`${API_BASE}/public/search/products/brands?q=${item}&context=search`, { headers: HEADERS })
        ]);

        // Renderiza a página passando os dados
        res.render('search', {src, 
            busca: products.data.data,
            pesquisa: item,
            pagination: count.data.meta?.pagination || { total: 0, total_pages: 1, current_page: 1 },
            categorias: categories.data.data || [],
            preco: prices.data.data || { min: 0, max: 0 },
            marcas: brands.data.data || [],
            sort_by
        });

    } catch (error) {
        console.error(error.message);
        res.status(500).json({ erro: 'Erro ao conectar com a API da Yampi.' });
    }
});

module.exports = router;
