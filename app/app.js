const express = require('express');
const app = express();
const nunjucks = require('nunjucks');
const bodyParser = require('body-parser');
const session = require('express-session');
// const restsession = require('restsession');
// const HTTPStore = restsession(session);

/* Storing to the session */
app.use(session({
	secret: 'ThisSecret',
	resave: false,
	saveUninitialized: true,
	// store: new HTTPStore('http://localhost:8080/api/sessions'),
	cookie: {
		secure: false,
		maxAge: 1000 * 60 * 60
	},
	name: 'secretname'
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
const router = require('./routes.js');

app.use(router);
module.exports = app;