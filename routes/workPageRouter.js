const express = require('express');
const authController = require('../controllers/authController');
const workPageController = require('../controllers/workPageController');
// const cartController = require('../controllers/cartController');

const router = express.Router();

router;

router
    .route('/')
    .get(workPageController.getWorkPages)
    .post(workPageController.uploadImageCover,
        workPageController.resizeImage,
        workPageController.createWorkPage);

router.route('/select/:id')
    .patch(workPageController.selectWorkPage);

router
    .route('/:id')
    .patch(workPageController.uploadImageCover,
        workPageController.resizeImage,
        workPageController.updateWorkPage)
    .delete(workPageController.deleteWorkPage);

module.exports = router;