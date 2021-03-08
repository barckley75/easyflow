const express = require('express');
const authController = require('../controllers/authController');
const contactsController = require('../controllers/contactsController');

const router = express.Router();

router
    .route('/')
    .get(contactsController.getAllContacts)
    .post(
        contactsController.uploadImage,
        contactsController.resizeImage,
        contactsController.createContacts);

router
    .route('/:id')
    .patch(
        contactsController.uploadImage,
        contactsController.resizeImage,
        contactsController.updateContactsPage);

module.exports = router;