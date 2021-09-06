// Node fetch
const fetch = require('node-fetch');
const crypto = require('crypto');


this.exampleUser = {
		email: null,
		role: null
	};

exports.updateUser = (req, role) => {
	this.exampleUser.email = req.body.email
	this.exampleUser.role = role
}

exports.getUser = () => { return this.exampleUser}

// Gets response to attempted login from API
exports.getLoginResponse = async (req) => {
	try {
		let hash = crypto.createHash('sha256').update(req.body.password).digest('hex');
		let data = Buffer.from(req.body.email + ':' + hash).toString('base64');
		const api_url = `http://localhost:8080/api/login`;
		const fetch_response = await fetch(api_url, {
            method: 'POST',
        	headers: {'Authorization': 'Basic ' + data},
			credentials: 'include'
        });

		// If statement to catch errors
		if (fetch_response.status >= 200 && fetch_response.status <= 299) {
		// Return response
			console.log('Test Auth Fetched');
			return await fetch_response.text();
		}
		else {
		// Return NULL and log error
			console.log(fetch_response.status, ' | ', fetch_response.statusText, ' | Unable to fetch Test Auth ');
			return fetch_response.status;
		}
	} catch(err) {
		console.log(err);
		return 'Error: There was a problem retrieving Test Auth.'; 
	}
};
