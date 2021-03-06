const express = require('express');
const app = express();
const nunjucks = require('nunjucks');
const bodyParser = require('body-parser');
const router = require('./routes');
const session = require('express-session');

let sessionConfig = {
	secret: 'key',
	resave: false,
	saveUninitialized: true,
	secure: false,
	cookie: {
		maxAge: 1000 * 60 * 60,
		httpOnly: false
	}
};

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

app.use(router);
module.exports = app;