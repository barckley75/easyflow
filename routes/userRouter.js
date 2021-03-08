const express = require('express');
const authController = require('../controllers/authController');
const userController = require('../controllers/userController');

const router = express.Router();

router.post('/signup', authController.signup);
router.post('/login', authController.login);
router.get('/logout', authController.logout );

router.route('/')
    .get(userController.getAllUsers)
    .patch(userController.updateUser)
    .delete(userController.deteteUser);

module.exports = router; 