const express = require('express');
const { getAllUsers, createUser, loginUser, isAuth, changePass, ExcluirConta } = require('../controllers/userController');
const { authenticateJWT } = require("../middlewares/authMiddleware")

const router = express.Router();

router.post('/login', loginUser);

router.get('/', getAllUsers);
router.post('/', createUser);
router.post('/auth', isAuth);
router.post('/changepass', authenticateJWT, changePass);
router.post('/excluirconta', authenticateJWT, ExcluirConta);


module.exports = router;
