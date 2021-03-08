const express = require('express');
const homepageController = require('../controllers/homepageController');
const authController = require('../controllers/authController');

const router = express.Router();

router
    .route('/')
    .get(homepageController.getHomepages)
    .post(authController.protect,
        homepageController.uploadVideoCover,
        homepageController.createHomepage);

router.route('/select/:id')
    .patch(homepageController.selectHomepage);

router
    .route('/:id')
    .get(homepageController.getHomepage)
    .patch(authController.protect,
        homepageController.uploadVideoCover,
        homepageController.updateHomepage)
    .delete(authController.protect,
        homepageController.deleteHomepage);



module.exports = router;