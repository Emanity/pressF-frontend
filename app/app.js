const express = require('express');
const app = express();
const nunjucks = require('nunjucks');
const bodyParser = require('body-parser');
const session = require('express-session');
const restsession = require('restsession');
const HTTPStore = restsession(session);

let sessionConfig = {
	secret: 'key',
	resave: false,
	saveUninitialized: true,
	secure: false,
	// store: new HTTPStore('http://localhost:8080/api/sessions'), // causing problems...
	cookie: {
		maxAge: 1000 * 60 * 60 * 24,
		httpOnly: false
	}
}
/* Storing to the session */
app.use(session(sessionConfig));

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