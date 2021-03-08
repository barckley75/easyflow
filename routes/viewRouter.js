const express = require('express');
const authController = require('../controllers/authController');
const viewController = require('../controllers/viewController');
const cartController = require('../controllers/cartController');

const router = express.Router();

router.get('/login', viewController.login);
router.get('/admin', authController.protect, viewController.admin);

router.get('/', viewController.getHomepage);
router.get('/works', viewController.getAllWorks);
router.get('/workDescription/:id', viewController.getWork);
router.get('/cart', viewController.getcart);
router.get('/blog', viewController.getBlog);
router.get('/contacts', viewController.getContacts);

module.exports = router;