const express = require('express');
const router = express.Router();
const JobRoles = require('./JobRoles');
const user = require('./user');
const x = 0;

router.all('/', (req, res, next) => {
	if (req.session.user != null){
		next();
	} else {
        res.redirect('login');
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
	res.render('job-roles', {JobRoles : result});
});

/* Job Role Details Route */
router.get('/job-role-details/:jobRoleID', async (req, res) => {
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
        res.redirect('login');
    } else {
        x = 1;
	    res.render('login-result', {test : result});
    }
	
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

module.exports = router;