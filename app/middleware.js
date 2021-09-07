const middleware = {
	
	/* Requires user to login before accessing system */
	loginMiddleware(req, res, next) {
		console.log('Email on request: ' + req.session.email);

		if (req.session.email != null) {
			next();
		} else {
			res.redirect('/login');
		}
	},

	roleMiddleware(req, res, next) {
		if (req.session.role == 1) {
			// is admin - now do admin things
			next();
		} else {
			// is regular employee, cannot do the admin
			res.redirect('/user-profile');
		}
	}
};

module.exports = middleware;