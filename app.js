const express = require('express'),
    path = require('path'),
    cookieParser = require('cookie-parser'),
    bodyParser = require('body-parser'),
    exphbs = require('express-handlebars'),
    expressValidator = require('express-validator'),
    flash = require('connect-flash'),
    session = require('express-session'),
    passport = require('passport'),
    LocalStrategy = require('passport-local').Strategy,
    mongo = require('mongodb'),
    mongoose = require('mongoose');

//mongoDB connection
mongoose.Promise = require('bluebird');
mongoose.connect('mongodb://localhost/loginapp', {useMongoClient: true});
let db = mongoose.connection;

//Routes
const routes = require('./routes/index'),
    users = require('./routes/users');

//init App
const app = express();

//view Engine
app.set('views', path.join(__dirname, 'views'));
app.engine('handlebars', exphbs({ defaultLayout: 'layout' }));
app.set('view engine', 'handlebars');

//bodyParser Middleware
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());

//set static folder
app.use(express.static(path.join(__dirname, 'public')));

//express session middleware
app.use(session({
    secret: 'secret',
    saveUninitialized: true,
    resave: true
}));

//passport init middleware
app.use(passport.initialize());
app.use(passport.session());

//express validator middleware
app.use(expressValidator({
    errorFormatter: (param, msg, value) => {
        let namespace = param.split('.'),
            root = namespace.shift(),
            formParam = root;

        while (namespace.length) {
            formParam += '[' + namespace.shift() + ']';
        }
        return {
            param: formParam,
            msg: msg,
            value: value
        };
    }
}));

//connect to flash middleware
app.use(flash());

//Global variables for flash
app.use((req, res, next) => {
    res.locals.success_msg = req.flash('success_msg');
    res.locals.error_msg = req.flash('error_msg');
    res.locals.error = req.flash('error');
    res.locals.user = req.user || null;
    next();
});

//Routes
app.use('/', routes);
app.use('/users', users);

//set port
app.set('port', (process.env.PORT || 8000));
app.listen(app.get('port'), ()=>{
    console.log(`http://127.0.0.1:${app.get('port')}`);
});
