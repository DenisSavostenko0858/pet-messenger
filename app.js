const express = require('express');
const app = express();
const path = require('path');
const ejs = require('ejs');
const session = require('express-session');
const cookieParser = require('cookie-parser');
const bodyParser = require('body-parser');
const passport = require('passport');
const req = require('express/lib/request');

const router = require('./router/index_router');
const passportGoogle = require('./middleware/passport-google');
const passportYandex = require('./middleware/passport-yandex');

require('dotenv').config();

const port = process.env.PORT;

app.use(express.static(path.join(__dirname, 'public')));
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));

const { sequelize } = require("./models/database_controller");

passportGoogle(passport);
passportYandex(passport);

app.use(cookieParser());
app.use(bodyParser.urlencoded({ extended: false }));

app.use(session({
    secret: 'your_secret_key',
    resave: false,
    saveUninitialized: true
  }));

app.use(router);
app.listen(port, async function(){
    await sequelize.sync();
    console.log('Сервер запущен http://localhost:'+ port);
});