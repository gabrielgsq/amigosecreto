const express = require('express');
const userRoutes = require('./routes/userRoutes');
const groupRoutes = require('./routes/groupRoutes');

const app = express();

// Middlewares globais
app.use(express.json());

// Rotas
app.use('/api/users', userRoutes);
app.use('/api/groups', groupRoutes);

module.exports = app;
