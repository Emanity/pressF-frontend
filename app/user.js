// Node fetch
const fetch = require('node-fetch');

// Gets response to attempted login from API
exports.getLoginResponse = async (req) => {
	try {
        let data = Buffer.from(req.body.email + ':' + req.body.password).toString('base64');
		var api_url = `http://localhost:8080/api/login`;
		const fetch_response = await fetch(api_url, {
            method: 'POST',
        	headers: {'Authorization': 'Basic ' + data},
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
			return null;
		}
	} catch(err) {
		console.log(err);
		return 'Error: There was a problem retrieving Test Auth.'; 
	}
};

