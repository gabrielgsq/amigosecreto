const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const userRoutes = require('./routes/userRoutes');
const groupRoutes = require('./routes/groupRoutes');


const app = express();

// Middlewares globais
app.use(express.json());
app.use(cors());
app.use(bodyParser.urlencoded({ extended: true })); // Para dados de formulário HTML (x-www-form-urlencoded)
app.use(bodyParser.json()); // Para dados JSON

// Rotas
app.use('/users', userRoutes);
app.use('/groups', groupRoutes);

module.exports = app;
