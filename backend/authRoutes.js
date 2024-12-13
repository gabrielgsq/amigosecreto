const express = require('express');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');

const router = express.Router();

// Dados simulados de usuários (você pode usar um banco de dados real)
const users = [
    { id: 1, username: 'test', password: bcrypt.hashSync('password', 10) }
];

// Chave secreta (ideal usar uma variável de ambiente)
const SECRET_KEY = process.env.JWT_SECRET || 'sua_chave_secreta';

// Login
router.post('/login', (req, res) => {
    const { username, password } = req.body;

    // Verificar se o usuário existe
    const user = users.find(u => u.username === username);
    if (!user) {
        return res.status(401).json({ message: 'Usuário não encontrado' });
    }

    // Verificar a senha
    const isPasswordValid = bcrypt.compareSync(password, user.password);
    if (!isPasswordValid) {
        return res.status(401).json({ message: 'Senha incorreta' });
    }

    // Gerar o token JWT
    const token = jwt.sign({ id: user.id, username: user.username }, SECRET_KEY, {
        expiresIn: '1h', // Expira em 1 hora
    });

    res.json({ token });
});

// Rota protegida (exemplo)
router.get('/protected', (req, res) => {
    const token = req.headers.authorization?.split(' ')[1]; // Bearer <token>

    if (!token) {
        return res.status(401).json({ message: 'Token não fornecido' });
    }

    try {
        const decoded = jwt.verify(token, SECRET_KEY);
        res.json({ message: 'Acesso autorizado', user: decoded });
    } catch (error) {
        res.status(401).json({ message: 'Token inválido ou expirado' });
    }
});

module.exports = router;
