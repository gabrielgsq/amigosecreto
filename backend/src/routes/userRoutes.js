const express = require('express');
const { getAllUsers, createUser, loginUser, isAuth, changePass } = require('../controllers/userController');
const { authenticateJWT } = require("../middlewares/authMiddleware")

const router = express.Router();

router.post('/login', loginUser);

router.get('/', getAllUsers);
router.post('/', createUser);
router.post('/auth', isAuth);
router.post('/changepass', authenticateJWT, changePass);


module.exports = router;
