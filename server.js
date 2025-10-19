require('dotenv').config();
const express = require('express');
const app = express();
const routes = require('./routes');
const cors = require('cors');
const cookieParser = require('cookie-parser');
const PORT = process.env.PORT || 3000;
const path = require('path');



app.use(cors());
app.use(cookieParser());

// Configuração do motor de template EJS
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));

// Proteger arquivos JSON sensíveis
app.use('/produtos.json', (req, res) => {
  res.status(404).send('Not Found');
});

app.use('/pedidos.json', (req, res) => {
  res.status(404).send('Not Found');
});

app.use('/clientes.json', (req, res) => {
  res.status(404).send('Not Found');
});

app.use('/atividades.json', (req, res) => {
  res.status(404).send('Not Found');
});

// Configuração para arquivos estaticos
app.use(express.static(path.join(__dirname, 'src')));

// Middleware para interpretar JSON
app.use(express.json());

// Configurar rotas
app.use(routes);

// Inicia o servidor
app.listen(PORT, () => {
    console.log(`Servidor rodando na porta ${PORT}`);
});