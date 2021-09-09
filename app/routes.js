/* eslint-disable no-useless-escape */
const express = require('express');
const router = express.Router();
const { check, validationResult } = require('express-validator');
const jobRoles = require('./jobRoles');
const user = require('./user');
const {isLoggedIn, isAdmin} = require('./authorisation');

/* Index (Home Page) Route */
router.get('/', isLoggedIn, function (req, res) {
	res.redirect('index');
	console.log('Request processed');
});

/* Index (Home Page) Route */
router.get('/index', isLoggedIn, function (req, res) {
	res.render('index');
	console.log('Request processed');
});

/* Job Roles Route */
router.get('/job-roles', isLoggedIn, async (req, res) => {
	let result = await jobRoles.getJobRoles();
	res.render('job-roles', {
		jobRoles: result
	});
});

/* Job Role Details Route */
router.get('/job-role-details/:jobRoleID', isLoggedIn, async (req, res) => {
	var jobRoleID = req.params.jobRoleID;
	let result = await jobRoles.getJobRoleDetails(jobRoleID);
	res.render('job-role-details', {
		jobRole: result
	});
});

router.get('/login', function (req, res) {
	res.render('login');
});

router.post('/login', async (req, res) => {
	let result = await user.getLoginResponse(req);
	
	if (result == '401') {
		res.render('login', {error: 'Invalid email/password'});
	} else {
		user.updateUser(req, JSON.parse(result).role);
		req.session.save((err) => {
			if (err) {
				console.log(err);
			}
		});
		res.redirect('index');
	}
});

router.get('/user-profile', isLoggedIn, (req, res) => {
	if (req.session.role == 1) {
		res.render('admin-profile', {
			exuser: req.session
		});
	} else {
		res.render('user-profile', {
			exuser: req.session
		});
	}
});

router.get('/logout', isLoggedIn, (req, res) => {
	req.session.destroy((err) => {
		if (err) {
			return console.log(err);
		}
		res.redirect('/');
	});
});

/* Add Job Band Routes */
// GET route for add-job-band form
router.get('/add-job-band', isLoggedIn, isAdmin, function (req, res) {
	res.render('add-job-band');
});

/* POST route to validate and send add-job-band form */
router.post('/add-job-band', [
	check('jobBand', 'Job Band: Must be longer than 0 characters and shorter than 100 characters').isLength({
		min: 1,
		max: 100
	}),
	check('jobBand', 'Job Band must only contain letters and space').matches('^[a-zA-Z0-9 ]*$'),
	check('jobBandTraining', 'Job Band Training: Must be a URL').matches('((http|https)://)?[a-zA-Z0-9@:%._\\+~#?&//=]{2,256}\\.[a-z]{2,6}\\b([-a-zA-Z0-9@:%._\\+~#?&//=]*)')
], async (req, res) => {
	// variable to store error details
	let errors = validationResult(req);

	// check to ensure there are no errors
	if (!errors.isEmpty()) {
		const alert = errors.array();
		// if there are errors return details to the form and the details
		res.render('add-job-band', {
			jobBand: req.body,
			alert
		});
	} else {
		// send the body to addJobBand function in JobRoles.js
		await jobRoles.addJobBand(req.body);
		res.render('add-job-band-complete');
		console.log('add-job-band: POST Sent');
	}
});

/* Add Job Capability Routes */
// GET route for add-job-capability form
router.get('/add-job-capability', isLoggedIn, isAdmin, function (req, res) {
	res.render('add-job-capability');
});

/* POST route to validate and send add-job-capability form */
router.post('/add-job-capability', [
	check('jobCapability', 'Job Capability: Must be longer than 0 characters and shorter than 100 characters').isLength({
		min: 1,
		max: 100
	}),
	check('jobCapability', 'Job Capability must only contain letters and space').matches('^[a-zA-Z ]*$')
], async (req, res) => {
	// variable to store error details
	let errors = validationResult(req);

	// check to ensure there are no errors
	if (!errors.isEmpty()) {
		const alert = errors.array();
		// if there are errors return details to the form and the details
		res.render('add-job-capability', {
			jobCapability: req.body,
			alert
		});
	} else {
		// send the body to addJobBand function in JobRoles.js
		await jobRoles.addJobCapbility(req.body);
		res.render('add-job-capability-complete');
		console.log('add-job-capability: POST Sent');
	}
});

/* Add Job Role Routes */
// GET route for add-job-role form
router.get('/add-job-role', isLoggedIn, isAdmin, async (req, res) => {
	let bandResult = await jobRoles.getJobBand();
	let capabilityResult = await jobRoles.getJobCapability();
	let disciplineResult = await jobRoles.getJobDiscipline();
	res.render('add-job-role', {
		bands: bandResult,
		capabilities: capabilityResult,
		disciplines: disciplineResult
	});
});

/* POST route to validate and send add-job-role form */
router.post('/add-job-role', [
	check('jobTitle', 'Job Title: Must be longer than 0 characters and shorter than 200 characters').isLength({
		min: 1,
		max: 200
	}),
	check('jobTitle', 'Job Title: Must only contain letters and space').matches('^[a-zA-Z ]*$'),
	check('jobSpecification', 'Job Specification: Must be longer than 0 characters and shorter than 5000 characters').isLength({
		min: 1,
		max: 5000
	}),
	check('jobSpecification', 'Job Specification: Must not contain special characters (e.g. @~|/(){}[]"`)').matches('^[\.a-zA-Z0-9,!? ]*$'),
	check('jobCompetencies', 'Job Competencies: Must be longer than 0 characters and shorter than 500 characters').isLength({
		min: 1,
		max: 5000
	}),
	check('jobCompetencies', 'Job Competencies: Must not contain special characters (e.g. @~|/(){}[]"`)').matches('^[\.a-zA-Z0-9,!? ]*$')
], async (req, res) => {
	let bandResult = await jobRoles.getJobBand();
	let capabilityResult = await jobRoles.getJobCapability();
	let disciplineResult = await jobRoles.getJobDiscipline();
	// variable to store error details
	let errors = validationResult(req);

	// check to ensure there are no errors
	if (!errors.isEmpty()) {
		const alert = errors.array();
		// if there are errors return the details to the form and error
		res.render('add-job-role', {
			bands: bandResult,
			capabilities: capabilityResult,
			disciplines: disciplineResult,
			jobRole: req.body,
			alert
		});
	} else {
		// send the body to addJobRole function in JobRoles.js
		await jobRoles.addJobRole(req.body);
		res.render('add-job-role-complete');
		console.log('add-job-role: POST Sent');
	}
});

module.exports = router;