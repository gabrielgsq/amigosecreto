const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const userRoutes = require('./routes/userRoutes');
const groupRoutes = require('./routes/groupRoutes');


const app = express();

// Middlewares globais
app.use(express.json());
app.use(cors({
    origin: ['https://gsqhub.com', 'https://www.gsqhub.com'], // Domínios permitidos
    methods: ['GET', 'POST', 'PUT', 'DELETE'], // Métodos HTTP permitidos
    credentials: true // Permitir cookies e cabeçalhos de autenticação
}));
app.use(bodyParser.urlencoded({ extended: true })); // Para dados de formulário HTML (x-www-form-urlencoded)
app.use(bodyParser.json()); // Para dados JSON

// Rotas
app.use('/users', userRoutes);
app.use('/groups', groupRoutes);

module.exports = app;
