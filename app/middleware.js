const middleware = {
	
	/* Requires user to login before accessing system */
	loginMiddleware(req, res, next) {
		console.log('Email on request: ' + req.session.email);
		if (req.session.email != null) {
			next();
			return true;
		} else {
			res.redirect('/login');
			return false;
		}
	},
	
	/* Requires user to be an admin to view the page */
	roleMiddleware(req, res, next) {
		if (req.session.role == 1) {
			// is admin
			next();
			return true;
		} else {
			// is regular employee
			res.render('error-page', {error: 'You do not have access to view this page. If you think you should have access, please contact a site administrator'})
			return false;
		}
	}
};

module.exports = middleware;