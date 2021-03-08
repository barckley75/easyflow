const Work = require('../models/workModel');
const WorkPage = require('../models/workPageModel');
const Homepage = require('../models/homepageModel');
const BlogPage = require('../models/blogPageModel');
const Blog = require('../models/blogModel');
const Contacts = require('../models/contactsModel');
const User = require('../models/userModel');
const catchAsync = require('../utils/catchAsync');
const AppError = require('../utils/appError');

exports.getHomepage = catchAsync(async (req, res, next) => {
    const homepage = await Homepage.find();
    const work = await Work.find();
    res.status(200).render('homepage', {
        title: 'Homepage',
        homepage,
        work
    });
});

exports.getAllWorks = catchAsync(async (req, res, next) => {
    const works = await Work.find();
    const workPage = await WorkPage.find();

    res.status(200).render('works', {
        title: 'Works',
        workPage,
        works
    });
});

exports.getWork = catchAsync(async (req, res, next) => {
    const works = await Work.find();
    const work = await Work.findById(req.params.id);

    const cookies = req.cookies;
    const fullUrl = req.protocol + `://${req.get('host')}${req.originalUrl}`;
    const urlCookie = fullUrl.split('/')[2];
    delete cookies[urlCookie];

    res.status(200).render('workDescription', {
        title: 'Work Details',
        works,
        work,
        cookies
    });
});

exports.getcart = catchAsync(async (req, res, next) => {
    const cookies = req.cookies;
    const fullUrl = req.protocol + `://${req.get('host')}${req.originalUrl}`;
    const urlCookie = fullUrl.split('/')[2];
    console.log(urlCookie);
    delete cookies[urlCookie];
    delete cookies['jwt'];

    let value = {};
    let items = [];
    let total = 0;

    if (cookies) {
        for (let key in cookies) {
            // create new array with works obj
            items.push(value.work = await Work.findById({ _id: cookies[key] }).lean());
            items[items.length - 1].description = items[items.length - 1].description.replace(/<[^>]*>/g, '');
            total += items[items.length - 1].price;
        }
    }

    const itemsMap = items.reduce((acc, item) => {
        const accItem = acc[item._id] || { quantity: 0, totalPrice: 0 };
        acc[item._id] = {
            ...item,
            quantity: accItem.quantity + 1,
            totalPrice: accItem.totalPrice + item.price
        };
        return acc;
    }, {});

    const results = Object.values(itemsMap);

    // console.log(results);
    // console.log(total);

    res.status(200).render('cart', {
        title: 'cart',
        results,
        total
    });
});

exports.getBlog = catchAsync(async (req, res, next) => {
    const homepage = await Homepage.find();
    const blog = await Blog.find();
    const blogPage = await BlogPage.find();

    res.status(200).render('blog', {
        title: 'Blog',
        homepage,
        blog,
        blogPage
    });
});

exports.login = catchAsync(async (req, res, next) => {
    const user = User.find();

    res.status(200).render('login', {
        title: 'log in into your account',
        user
    });
});

exports.getContacts = catchAsync(async (req, res, next) => {
    const contacts = await Contacts.findById('5ec9650b545d615f3c7be4bc');
    res.status(200).render('contacts', {
        title: 'Contacts',
        contacts
    });
});

exports.admin = catchAsync(async (req, res, next) => {
    const homepage = await Homepage.find();
    const workPage = await WorkPage.find();
    const works = await Work.find();
    const blog = await Blog.find();

    res.status(200).render('admin', {
        title: 'Admin Area',
        homepage,
        workPage,
        works,
        blog
    });
});