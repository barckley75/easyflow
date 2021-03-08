const mongoose = require('mongoose');
const dotenv = require('dotenv');

dotenv.config({ path: 'config.env' });

const app = require('./app');

const DB = process.env.DATABASE.replace('<PASSWORD>', process.env.DATABASE_PASSWORD);
mongoose.connect(DB, {
    useNewUrlParser: true,
    useCreateIndex: true,
    useFindAndModify: false,
    useUnifiedTopology: true
}).then(() => console.log('DB connection successful!'));

console.log(app.get('env'));

// START SERVER
const port = process.env.PORT;
if (process.env.NODE_ENV === 'production') {
    const server = app.listen(port, '127.0.0.1');

}
const server = app.listen(port, () => {
    console.log(`App running on port ${port}...`);
});