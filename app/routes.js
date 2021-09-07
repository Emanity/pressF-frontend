const express = require('express');
const router = express.Router();
const JobRoles = require('./JobRoles');
const user = require('./user');

function middleware1(req, res, next) {
	console.log('Email on request: '+ req.session.email );
	
	if (req.session.email != null ){
		next();
	} else {
		res.redirect('/login');
	}
}

/* Index (Home Page) Route */
router.get('/', middleware1, function (req, res) {
	res.redirect('index');
	console.log('Request processed'); 
}); 

/* Index (Home Page) Route */
router.get('/index', middleware1, function (req, res) {
	res.render('index');
	console.log('Request processed'); 
}); 

/* Job Roles Route */
router.get('/job-roles', middleware1, async (req, res) => {
	let result = await JobRoles.getJobRoles();
	res.render('job-roles', {JobRoles : result});
});

/* Job Role Details Route */
router.get('/job-role-details/:jobRoleID', middleware1, async (req, res) => {
	var jobRoleID = req.params.jobRoleID;
	let result = await JobRoles.getJobRoleDetails(jobRoleID);
	res.render('job-role-details', {JobRole : result});
});

router.get('/login', function (req, res) {
	res.render('login');
});

router.post('/submit-login', async (req, res) => {
	let result = await user.getLoginResponse(req);

	if (result == '401'){
		// TODO error
		res.redirect('login');
	} else {
		user.updateUser(req, JSON.parse(result).role);
		req.session.email = JSON.parse(result).email;
		req.session.role = JSON.parse(result).role;
		req.session.save((err) => {
			if (err) {
				console.log(err);
			}
		});
		console.log(req.session);
		res.redirect('index');
	}
});

router.get('/user-profile', middleware1, (req,res) => {
	if(user.getUser().role == 1){
		res.render('admin-profile', {exuser : user.getUser()});
	} else {
		res.render('user-profile', {exuser : user.getUser()});
	}
});

router.get('/logout', middleware1, (req,res) => {
	req.session.destroy((err) => {
		if(err) {
			return console.log(err);
		}
		res.redirect('/');
	});
	user.resetUser();
});

router.get('/add-job-band', middleware1, function (req, res) {
	res.render('add-job-band');
});

router.get('/add-job-capability', middleware1,function (req, res) {
	res.render('add-job-capability');
});

router.get('/add-job-role', middleware1,function (req, res) {
	res.render('add-job-role');
});

module.exports = router;