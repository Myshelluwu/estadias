const express = require('express');
const app = express();

const path = require('path');
const mongoose = require('mongoose');
const passport = require('passport');
const flash = require('flash');
const morgan = require('morgan');
const cookieParser = require('cookie-parser');
const bodyParser = require('body-parser');
const session = require('express-session');

const { url } = require('./config/database');

mongoose.connect(url);

//require('./models/User');
require('./config/passport')(passport);
 
//settings
app.set('port', process.env.PORT || 2000);
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

//middleware
app.use(morgan('dev'));
app.use(cookieParser());
app.use(bodyParser.urlencoded({extended:false})); //false
app.use(session({
    secret: 'secretKiki',
    resave:false,
    saveUninitialized: false
}));


app.use(passport.initialize());
app.use(passport.session());
app.use(flash());

//routes
require('./app/routes')(app, passport);

//static files
app.use(express.static(path.join(__dirname, 'public')))
app.use(express.static('public'));


app.listen(app.get('port'), ()=>{
    console.log('Servidor en puerto', app.get('port'))
});