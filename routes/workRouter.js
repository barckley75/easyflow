const express = require('express');
const authController = require('../controllers/authController');
const workController = require('../controllers/workController');

const router = express.Router();

router
    .route('/')
    .get(workController.getAllWorks)
    .post(
        authController.protect,
        workController.uploadImage,
        workController.resizeImage,
        workController.createWork);

router.route('/:id')
    .get(
        workController.getWork)
    .patch(
        authController.protect,
        workController.updateWork)
    .delete(
        authController.protect,
        workController.deleteWork);

module.exports = router;