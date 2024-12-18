const express = require('express');
const app = express();
const PORT = process.env.PORT || 3000; // Porta definida pela Vercel ou 3000

// Middleware para interpretar JSON
app.use(express.json());

// Rota inicial
app.get('/', (req, res) => {
    res.send('Hello World! Bem-vindo ao meu e-commerce.');
});

// Rotas do E-commerce
app.get('/produtos', (req, res) => {
  res.json({ mensagem: 'Listagem de produtos' });
});

app.post('/checkout', (req, res) => {
  const pedido = req.body; // Simulação de recebimento de pedido
  res.json({ mensagem: 'Pedido recebido!', pedido });
});

app.get('/status-pedido/:id', (req, res) => {
  const pedidoId = req.params.id;
  res.json({ mensagem: `Status do pedido ${pedidoId}`, status: 'Processando' });
});

// Inicia o servidor
app.listen(PORT, () => {
    console.log(`Servidor rodando na porta ${PORT}`);
});

module.exports = app; // Exporta para a Vercel
