const express = require('express');
const app = express();
const nunjucks = require('nunjucks');
const bodyParser = require('body-parser');
const { check, validationResult } = require('express-validator');
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

/* Add Job Band Routes */
// GET route for add-job-band form
app.get('/add-job-band', function (req, res) {
	res.render('add-job-band');
});

/* POST route to validate and send add-job-band form */
app.post('/add-job-band', [
	check('jobBand', 'Job Band: Must contain letters').exists().isAlpha(),
	check('jobBand', 'Job Band: Must be longer than 0').isLength({min: 1})
], async (req, res) => {
	// variable to store error details
	errors = validationResult(req);

	// check to ensure there are no errors
	if (!errors.isEmpty()){
		const alert = errors.array();
		// if there are errors return details to the form and the details
		res.render('add-job-band', {jobBand : req.body, alert});
	} else {
		// send the body to addJobBand function in JobRoles.js
		await JobRoles.addJobCapbility(req.body);
		res.render('add-job-band-complete');
		console.log('add-job-band: POST Sent');
	}
});

/* Add Job Capability Routes */
// GET route for add-job-capability form
app.get('/add-job-capability', function (req, res) {
	res.render('add-job-capability');
});

/* POST route to validate and send add-job-capability form */
app.post('/add-job-capability', [
	check('jobCapability', 'Job Capability: Must contain letters').exists().isAlpha(),
	check('jobCapability', 'Job Capability: Must be longer than 0').isLength({min: 1})
], async (req, res) => {
	// variable to store error details
	errors = validationResult(req);

	// check to ensure there are no errors
	if (!errors.isEmpty()){
		const alert = errors.array();
		// if there are errors return details to the form and the details
		res.render('add-job-capability', {jobCapability : req.body, alert});
	} else {
		// send the body to addJobBand function in JobRoles.js
		await JobRoles.addJobCapbility(req.body);
		res.render('add-job-capability-complete');
		console.log('add-job-capability: POST Sent');
	}
});

/* Add Job Role Routes */
// GET route for add-job-role form
app.get('/add-job-role', async (req, res) => {
	let bandResult = await JobRoles.getJobBand();
	let capabilityResult = await JobRoles.getJobCapability();
	let disciplineResult = await JobRoles.getJobDiscipline();
	res.render('add-job-role', {bands : bandResult, capabilities : capabilityResult, disciplines : disciplineResult});
});

/* POST route to validate and send add-job-role form */
app.post('/add-job-role', [
	check('jobTitle', 'Job Title: Must contain letters').exists().isAlpha(),
	check('jobTitle', 'Job Title: Must be longer than 0').isLength({min: 1}),
	check('jobBand', 'Job Band: Must contain letters').exists().isAlpha(),
	check('jobBand', 'Job Band: Must be longer than 0').isLength({min: 1}),
	check('jobCapability', 'Job Capability: Must contain letters').exists().isAlpha(),
	check('jobCapability', 'Job Capability: Must be longer than 0').isLength({min: 1}),
	check('jobSpecification', 'Job Specification: Must contain letters').exists().isAlpha(),
	check('jobSpecification', 'Job Specification: Must be longer than 0').isLength({min: 1}),
	check('jobDiscipline', 'Job Discipline: Must contain letters').exists().isAlpha(),
	check('jobDiscipline', 'Job Discipline: Must be longer than 0').isLength({min: 1}),
	check('jobSpecification', 'Job Specification: Must contain letters').exists().isAlpha(),
	check('jobSpecification', 'Job Specification: Must be longer than 0').isLength({min: 1})
], async (req, res) => {
	// variable to store error details
	errors = validationResult(req);

	// check to ensure there are no errors
	if (!errors.isEmpty()){
		const alert = errors.array();
		// if there are errors return the details to the form and error
		res.render('add-job-role', {jobRole : req.body, alert});
	} else {
		// send the body to addJobRole function in JobRoles.js
		await JobRoles.addJobRole(req.body);
		res.render('add-job-role-complete');
		console.log('add-job-role: POST Sent');
	}
});

module.exports = app;