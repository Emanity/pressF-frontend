const express = require('express');
const app = express();
const nunjucks = require('nunjucks');
const bodyParser = require('body-parser');
const JobRoles = require('./JobRoles');

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

/* Index (Home Page) Route */
app.get('/', function (req, res) { 
	res.render('index');
	console.log('Request processed'); 
}); 

/* Index (Home Page) Route */
app.get('/index', function (req, res) {
	res.render('index');
	console.log('Request processed'); 
}); 

/* Job Roles Route */
app.get('/job-roles', async (req, res) => {
	let result = await JobRoles.getJobRoles();
	res.render('job-roles', {JobRoles : result});
});

/* Job Role Details Route */
app.get('/job-role-details/:jobRoleID', async (req, res) => {
	var jobRoleID = req.params.jobRoleID;
	let result = await JobRoles.getJobRoleDetails(jobRoleID);
	res.render('job-role-details', {JobRole : result});
});

app.get('/login', function (req, res) {
	res.render('login');
});

app.get('/add-job-band', function (req, res) {
	res.render('add-job-band');
});

app.get('/add-job-capability', function (req, res) {
	res.render('add-job-capability');
});

app.get('/add-job-role', function (req, res) {
	res.render('add-job-role');
});

module.exports = app;