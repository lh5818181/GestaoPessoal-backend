const express = require('express');
const router = express.Router();
const { getMe } = require('../controllers/authController');
const verifyToken = require('../middleware/verifyToken');

router.get('/me', verifyToken, getMe);

module.exports = router;
