const authorisation = {
	
	/* Requires user to login before accessing system */
	isLoggedIn(req, res, next) {
		if (req.session.email != null) {
			next();
			return true;
		} else {
			res.redirect('/login');
			return false;
		}
	},

	isAdmin(req, res, next) {
		if (req.session.role == 1) {
			// is admin - now do admin things
			next();
			return true;
		} else {
			// is regular employee, cannot do the admin
			res.render('error-page', {error: 'You do not have access to view that page. If you think you should have access, please contact a site administrator'})
			return false;
		}
	}
};

module.exports = authorisation;