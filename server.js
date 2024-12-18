require('dotenv').config();
const express = require('express');
const app = express();
const routes = require('./routes');
const PORT = process.env.PORT || 3000;

// Middleware para interpretar JSON
app.use(express.json());

// Configurar rotas
app.use(routes);

// Inicia o servidor
app.listen(PORT, () => {
    console.log(`Servidor rodando na porta ${PORT}`);
});