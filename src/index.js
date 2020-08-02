const express = require('express');
const morgan = require('morgan');
const passport = require('passport');
const authRoutes = require('./routes/auth');
const routes = require('./routes/index');
const session = require('express-session');
const flash = require('express-flash');
require('dotenv').config();

// Initializations
const app = express();
require('./passport/local-auth');
require("./database");

//Settings
app.set('port', process.env.PORT || 3000); //Si existe un puerto usalo sino el 3000
app.set('json spaces', 2);

//Middlewares
app.use(morgan('dev'));
app.use(express.urlencoded({ extended: false })); //Datos de formularios nada de archivos
app.use(express.json()); //Soportando el formato JSON
app.use(flash());
app.use(session({
    secret: process.env.SESSION_SECRET,
    resave: false,
    saveUninitialized: false
}));
app.use(passport.initialize());
app.use(passport.session());

// Routes
app.use('/auth', authRoutes);
app.use('/api', routes);

//Starting the server
app.listen(app.get('port'), () => {
    console.log('Server on port ', app.get('port'))
});