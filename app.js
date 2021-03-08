const express = require('express');
const morgan = require('morgan');
const homepageRouter = require('./routes/homepageRouter');
const workRouter = require('./routes/workRouter');
const cartRouter = require('./routes/cartRouter');
const workPageRouter = require('./routes/workPageRouter');
const blogPageRouter = require('./routes/blogPageRouter');
const blogRouter = require('./routes/blogRouter');
const viewRouter = require('./routes/viewRouter');
const userRouter = require('./routes/userRouter');
const contactsRouter = require('./routes/contactsRouter');
const path = require('path');
const helmet = require('helmet');
const cookieParser = require('cookie-parser');
const mongoSanitize = require('express-mongo-sanitize');
const xss = require('xss-clean');
const compression = require('compression');

const AppError = require('./utils/appError');
const globalErrorHandler = require('./controllers/errorController');

const app = express();
app.use(helmet());

// Data sanitization against XSS
app.use(xss());

// setting up PUG 
app.set('view engine', 'pug');
app.set('views', path.join(__dirname, 'views'));

// setting static files
app.use(express.static(path.join(__dirname, 'public')));

if (process.env.NODE_ENV === 'development') {
    app.use(morgan('dev'));
}

app.use(express.json());
app.use(cookieParser());

// Data sanitization against NoSQL query injection
app.use(mongoSanitize());

app.use(compression());

// app.use((req, res, next) => {
//     console.log(req.cookies);
//     next();
// });

// API ROUTES
app.use('/', viewRouter);
app.use('/api/v1/homepage', homepageRouter);
app.use('/api/v1/workpage', workPageRouter);
app.use('/api/v1/works', workRouter);
app.use('/api/v1/cart', cartRouter);
app.use('/api/v1/blogpage', blogPageRouter);
app.use('/api/v1/blog', blogRouter);
app.use('/api/v1/users', userRouter);
app.use('/api/v1/contacts', contactsRouter);

app.all('*', (req, res, next) => {
    next(new AppError(`This route ${req.originalUrl} does not work.`), 404);
});

app.use(globalErrorHandler);

module.exports = app;