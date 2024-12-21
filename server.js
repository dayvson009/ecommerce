require('dotenv').config();
const express = require('express');
const app = express();
const routes = require('./routes');
const cors = require('cors');
const PORT = process.env.PORT || 3000;

app.use(cors());

// Configuração do motor de template EJS
app.set('view engine', 'ejs');
// Middleware para interpretar JSON
app.use(express.json());

// Configurar rotas
app.use(routes);

// Inicia o servidor
app.listen(PORT, () => {
    console.log(`Servidor rodando na porta ${PORT}`);
});