const express = require('express');
const { myGroups, createGroup, delGroup, sortearGroup } = require('../controllers/groupController');
const { authenticateJWT } = require("../middlewares/authMiddleware")

const router = express.Router();

router.post('/',authenticateJWT, createGroup);
router.post('/meusgrupos',authenticateJWT, myGroups);
router.post('/delgroup',authenticateJWT, delGroup);
router.post('/sorteargroup',authenticateJWT, sortearGroup);

module.exports = router;
