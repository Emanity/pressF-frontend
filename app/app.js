const express = require('express');
const app = express();
const nunjucks = require('nunjucks');
const bodyParser = require('body-parser');
const session = require('express-session');
const restsession = require('restsession');
const HTTPStore = restsession(session);

/* Storing to the session */
app.use(session({
    secret: 'ThisSecret',
    resave: false,
    saveUninitialized: true,
    store: new HTTPStore('http://localhost:8080/api/sessions'),
    cookie: {
		httpOnly: true,
        maxAge: 1000 * 60 * 60 * 24
    },
	name: "secretname"
}));

/* Body parser middleware */
app.use(bodyParser.urlencoded({ extended: true }));

/* Configuring Express to use Nunjucks */
nunjucks.configure('views', {
	autoescape: true,
	express: app 
}); 

/* Provide Public files such as Images & Styling */
app.use(express.static('public'));

/* Nunjucks view engine */
app.set('view engine', 'html');

/* Routes */
const routes = require('./routes.js');
app.use(routes);

module.exports = app;