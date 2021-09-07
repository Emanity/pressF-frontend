const express = require('express');
const router = express.Router();
const JobRoles = require('./JobRoles');
const user = require('./user');

/* Requires user to login before accessing system */
router.all('*', async (req, res, next) => {
	if (req.session.email != undefined || req.url.startsWith('/login') || req.url.startsWith('/submit-login')) {
		next();
	} else {
		res.redirect('/login');
	}
});

/* Index (Home Page) Route */
router.get('/', function (req, res) {
	res.render('index');
	console.log('Request processed');
});

/* Index (Home Page) Route */
router.get('/index', function (req, res) {
	res.render('index');
	console.log('Request processed');
});

/* Job Roles Route */
router.get('/job-roles', async (req, res) => {
	let result = await JobRoles.getJobRoles();
	res.render('job-roles', {
		JobRoles: result
	});
});

/* Job Role Details Route */
router.get('/job-role-details/:jobRoleID', async (req, res) => {
	var jobRoleID = req.params.jobRoleID;
	let result = await JobRoles.getJobRoleDetails(jobRoleID);
	res.render('job-role-details', {
		JobRole: result
	});
});

router.get('/login', function (req, res) {
	res.render('login');
});

router.post('/submit-login', async (req, res) => {
	let result = await user.getLoginResponse(req);

	if (result == '401') {
		// TODO error
		res.redirect('login');
	} else {
		user.updateUser(req, JSON.parse(result).role);
		res.render('login-result', {
			userDetails: result
		});
	}
});

router.get('/user-profile', (req, res) => {
	if (user.getUser().role == 1) {
		res.render('admin-profile', {
			exuser: user.getUser()
		});
	} else {
		res.render('user-profile', {
			exuser: user.getUser()
		});
	}
});

router.get('/logout', (req, res) => {
	req.session.destroy((err) => {
		if (err) {
			return console.log(err);
		}
		res.redirect('/');
	});
});

router.get('/add-job-band', function (req, res) {
	res.render('add-job-band');
});

router.get('/add-job-capability', function (req, res) {
	res.render('add-job-capability');
});

router.get('/add-job-role', function (req, res) {
	res.render('add-job-role');
});

router.get('/admin-dashboard', function (req, res) {
	res.render('admin-dashboard');
});

router.get('/employee-dashboard', function (req, res) {
	res.render('employee-dashboard');
});

module.exports = router;