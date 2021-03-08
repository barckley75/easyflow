const Contacts = require('../models/contactsModel');
const AppError = require('../utils/appError');
const catchAsync = require('../utils/catchAsync');
const sharp = require('sharp');
const multer = require('multer');
const fs = require('fs');

const multerStorage = multer.memoryStorage();

const multerFilter = (req, file, cb) => {
    if (file.mimetype.startsWith('image')) {
        cb(null, true);
    } else {
        cb(console.log('This is not an image'), false);
    }
};

const upload = multer({
    storage: multerStorage,
    fileFilter: multerFilter
});

exports.uploadImage = upload.fields([{ name: 'socialIcon_1', maxCount: 1 }, { name: 'socialIcon_2', maxCount: 1 }, { name: 'socialIcon_3', maxCount: 1 }, { name: 'imageCover', maxCount: 1 }]);

exports.resizeImage = catchAsync(async (req, res, next) => {
    if (!req.files) return next();

    const { socialIcon_1, socialIcon_2, socialIcon_3, imageCover } = { ...req.files };

    if (socialIcon_1) {
        socialIcon_1[0].fieldname = `socialIcon_1-${Date.now()}.png`;
        await sharp(socialIcon_1[0].buffer)
            .toFile(`public/img/contactsPage/socialIcons/${socialIcon_1[0].fieldname}`);
    };

    if (socialIcon_2) {
        socialIcon_2[0].fieldname = `socialIcon_2-${Date.now()}.png`;
        await sharp(socialIcon_2[0].buffer)
            .toFile(`public/img/contactsPage/socialIcons/${socialIcon_2[0].fieldname}`);
    };
    if (socialIcon_3) {
        socialIcon_3[0].fieldname = `socialIcon_3-${Date.now()}.png`;
        await sharp(socialIcon_3[0].buffer)
            .toFile(`public/img/contactsPage/socialIcons/${socialIcon_3[0].fieldname}`);
    };

    if (imageCover) {
        imageCover[0].fieldname = `imageCover-${Date.now()}.jpeg`;

        await sharp(imageCover[0].buffer)
            .resize(1920, 1080)
            .toFormat('jpeg')
            .jpeg({ quality: 90 })
            .toFile(`public/img/contactsPage/imageCover/desktop/${imageCover[0].fieldname}`);

        await sharp(imageCover[0].buffer)
            .resize(375, 812)
            .toFormat('jpeg')
            .jpeg({ quality: 90 })
            .toFile(`public/img/contactsPage/imageCover/mobile/${imageCover[0].fieldname}`);

    };

    next();
});

exports.getAllContacts = catchAsync(async (req, res, next) => {
    const contacts = await Contacts.find();

    res.status(200).json({
        status: 'success',
        data: {
            contacts
        }
    });
});

exports.createContacts = catchAsync(async (req, res, next) => {
    if (!req.body) {
        next(new AppError('There is no data'), 404);
    }
    const { socialIcon_1, socialIcon_2, socialIcon_3, imageCover } = { ...req.files };
    req.body.socialIcon_1 = socialIcon_1[0].fieldname;
    req.body.socialIcon_2 = socialIcon_2[0].fieldname;
    req.body.socialIcon_3 = socialIcon_3[0].fieldname;
    req.body.imageCover = imageCover[0].fieldname;
    const contacts = await Contacts.create(req.body);

    res.status(200).json({
        status: 'success',
        data: {
            contacts
        }
    });
});

exports.updateContactsPage = catchAsync(async (req, res, next) => {
    const { socialIcon_1, socialIcon_2, socialIcon_3, imageCover } = { ...req.files };
    req.body.socialIcon_1 = socialIcon_1[0].fieldname;
    req.body.socialIcon_2 = socialIcon_2[0].fieldname;
    req.body.socialIcon_3 = socialIcon_3[0].fieldname;
    req.body.imageCover = imageCover[0].fieldname;
    const contacts = await Contacts.findByIdAndUpdate(req.params.id, req.body);

    res.status(200).json({
        status: 'success',
        data: {
            contacts
        }
    });
});