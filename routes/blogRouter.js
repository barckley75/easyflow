const express = require('express');
const authController = require('../controllers/authController');
const blogController = require('../controllers/blogController');

const router = express.Router();

router.route('/')
    .get(blogController.getBlog)
    .post(authController.protect, blogController.uploadImage, blogController.resizeImage, blogController.postBlog);

router.route('/popular/:id')
    .patch(blogController.popularPost);

router.route('/:id')
    .patch(authController.protect, blogController.uploadImage, blogController.resizeImage, blogController.updateBlog)
    .delete(authController.protect, blogController.deleteBlog);

module.exports = router;