const express = require('express');
const blogPageController = require('../controllers/blogPageController');

const router = express.Router();

router.route('/')
    .post(blogPageController.createBlogPage);

router
    .route('/:id')
    .patch(blogPageController.updateBlogPage);

module.exports = router;