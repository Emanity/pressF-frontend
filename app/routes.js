const express = require('express');
const router = express.Router();
const JobRoles = require('./JobRoles');
const user = require('./user');

/* Requires user to login before accessing system */
function loginMiddleware(req, res, next) {
	console.log('Email on request: ' + req.session.email);
	
	if (req.session.email != null) {
		next();
	} else {
		res.redirect('/login');
	}
}

function roleMiddleware(req, res, next) {
	if (req.session.role == 1) {
		// is admin - now do admin things
		next();
	} else {
		// is regular employee, cannot do the admin
		res.redirect('/user-profile');
	}
}

/* Index (Home Page) Route */
router.get('/', loginMiddleware, function (req, res) {
	res.redirect('index');
	console.log('Request processed');
});

/* Index (Home Page) Route */
router.get('/index', loginMiddleware, function (req, res) {
	res.render('index');
	console.log('Request processed');
});

/* Job Roles Route */
router.get('/job-roles', loginMiddleware, async (req, res) => {
	let result = await JobRoles.getJobRoles();
	res.render('job-roles', {
		JobRoles: result
	});
});

/* Job Role Details Route */
router.get('/job-role-details/:jobRoleID', loginMiddleware, async (req, res) => {
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
		req.session.save((err) => {
			if (err) {
				console.log(err);
			}
		});
		console.log(req.session);
		res.redirect('index');
	}
});

router.get('/user-profile', loginMiddleware, (req, res) => {
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

router.get('/logout', loginMiddleware, (req, res) => {
	req.session.destroy((err) => {
		if (err) {
			return console.log(err);
		}
		res.redirect('/');
	});
});

router.get('/add-job-band', loginMiddleware, roleMiddleware, function (req, res) {
	res.render('add-job-band');
});

router.get('/add-job-capability', loginMiddleware, roleMiddleware, function (req, res) {
	res.render('add-job-capability');
});

router.get('/add-job-role', loginMiddleware, roleMiddleware, function (req, res) {
	res.render('add-job-role');
});

router.get('/admin-dashboard', function (req, res) {
	res.render('admin-dashboard');
});

router.get('/employee-dashboard', function (req, res) {
	res.render('employee-dashboard');
});

module.exports = router;