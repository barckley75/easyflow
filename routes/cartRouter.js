const express = require('express');
const cartController = require('../controllers/cartController');

const router = express.Router();


router.get('/', cartController.getcart);

module.exports = router;