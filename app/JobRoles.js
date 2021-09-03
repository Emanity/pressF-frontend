// Node fetch
const fetch = require('node-fetch');

// Method that calls API and returns Job Roles list
exports.getJobRoles = async () => {
	try {
		var api_url = 'http://localhost:8080/api/getjobroles';
		const fetch_response = await fetch(api_url);
	
		// If statement to catch errors
		if (fetch_response.status >= 200 && fetch_response.status <= 299) {
		// Return response
			console.log('Job Roles Fetched');
			return await fetch_response.json();
		} else {
		// Return NULL and log error
			console.log(fetch_response.status, ' | ' ,  fetch_response.statusText, ' | Unable to Fetch Job Roles');
			return null;
		}
	} catch(err) {
		console.log('API connection failed: ' + err);
		return 'Error: There was a problem retrieving job roles.'; 
	}
};

// Method that calls API and returns the Job Role Details for the Job Role ID
exports.getJobRoleDetails = async ( jobRoleID ) => {
	try {
		var api_url = `http://localhost:8080/api/getjobroledetails/${jobRoleID}`;
		const fetch_response = await fetch(api_url);

		// If statement to catch errors
		if (fetch_response.status >= 200 && fetch_response.status <= 299) {
		// Return response
			console.log('Job Spec Fetched');
			return await fetch_response.json();
		}
		else {
		// Return NULL and log error
			console.log(fetch_response.status, ' | ', fetch_response.statusText, ' | Unable to fetch Job Role Details ');
			return null;
		}
	} catch(err) {
		return 'Error: There was a problem retrieving job role details.'; 
	}
};
