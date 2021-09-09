const authorisation = {
	
	/* Requires user to login before accessing system */
<<<<<<< HEAD:app/middleware.js
	loginMiddleware(req, res, next) {
		console.log('Email on request: ' + req.session.email);
=======
	isLoggedIn(req, res, next) {
>>>>>>> 5e2da5645ad079a5355ce935269f47a56826a050:app/authorisation.js
		if (req.session.email != null) {
			next();
			return true;
		} else {
			res.redirect('/login');
			return false;
		}
	},
<<<<<<< HEAD:app/middleware.js
	
	/* Requires user to be an admin to view the page */
	roleMiddleware(req, res, next) {
=======

	isAdmin(req, res, next) {
>>>>>>> 5e2da5645ad079a5355ce935269f47a56826a050:app/authorisation.js
		if (req.session.role == 1) {
			// is admin
			next();
			return true;
		} else {
<<<<<<< HEAD:app/middleware.js
			// is regular employee
			res.render('error-page', {error: 'You do not have access to view this page. If you think you should have access, please contact a site administrator'})
=======
			// is regular employee, cannot do the admin
			res.render('error-page', {error: 'You do not have access to view this page. If you think you should have access, please contact a site administrator'});
>>>>>>> 5e2da5645ad079a5355ce935269f47a56826a050:app/authorisation.js
			return false;
		}
	}
};

module.exports = authorisation;