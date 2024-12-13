const jwt = require('jsonwebtoken');

const authenticateJWT = (req, res, next) => {
    const token = req.headers.authorization?.split(" ")[1]; // Token vindo do header Authorization: Bearer <token>

    if (!token) {
        return res.status(403).send({ message: "Token não fornecido" });
    }

    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        req.user = decoded; // Adiciona os dados do usuário no objeto `req`
        next();
    } catch (error) {
        return res.status(401).send({ message: "Token inválido ou expirado" });
    }
};

module.exports = { authenticateJWT };
