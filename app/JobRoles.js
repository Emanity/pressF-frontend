// Node fetch
const fetch = require('node-fetch');

/* Method that calls API and returns Job Roles list */
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

/* Method that calls API and returns the Job Role Details for the Job Role ID */
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

/* Method that calls API and returns Job bands */
exports.getJobBand = async () => {
	try {
		var api_url = 'http://localhost:8080/api/getjobband';
		const fetch_response = await fetch(api_url);
	
		// If statement to catch errors
		if (fetch_response.status >= 200 && fetch_response.status <= 299) {
		// Return response
			console.log('Job Bands Fetched');
			return await fetch_response.json();
		} else {
		// Return NULL and log error
			console.log(fetch_response.status, ' | ' ,  fetch_response.statusText, ' | Unable to Fetch Job Bands');
			return null;
		}
	} catch(err) {
		console.log('API connection failed: ' + err);
		return 'Error: There was a problem retrieving Job Bands.'; 
	}
};

/* Method that calls API and returns Job capabilities */
exports.getJobCapability = async () => {
	try {
		var api_url = 'http://localhost:8080/api/getjobcapability';
		const fetch_response = await fetch(api_url);
	
		// If statement to catch errors
		if (fetch_response.status >= 200 && fetch_response.status <= 299) {
		// Return response
			console.log('Job Capabilities Fetched');
			return await fetch_response.json();
		} else {
		// Return NULL and log error
			console.log(fetch_response.status, ' | ' ,  fetch_response.statusText, ' | Unable to Fetch Job Capabilities');
			return null;
		}
	} catch(err) {
		console.log('API connection failed: ' + err);
		return 'Error: There was a problem retrieving job Capabilities.'; 
	}
};

/* Method that calls API and returns Job disciplines */
exports.getJobDiscipline = async () => {
	try {
		var api_url = 'http://localhost:8080/api/getjobdiscipline';
		const fetch_response = await fetch(api_url);
	
		// If statement to catch errors
		if (fetch_response.status >= 200 && fetch_response.status <= 299) {
		// Return response
			console.log('Job Disciplines Fetched');
			return await fetch_response.json();
		} else {
		// Return NULL and log error
			console.log(fetch_response.status, ' | ' ,  fetch_response.statusText, ' | Unable to Fetch Job Disciplines');
			return null;
		}
	} catch(err) {
		console.log('API connection failed: ' + err);
		return 'Error: There was a problem retrieving job disciplines.'; 
	}
};

/* Method that adds a job role */
exports.addJobRole = async (jobRole) => {
	try {
		// API url for adding a job role
		var api_url = 'http://localhost:8080/api/addjobrole';
		// data from post request
		var data = jobRole;
		// creating POST request to POST to API
		const options = {
			method: 'POST',
			headers: {
				'Content-Type': 'application/json'
			},
			body: JSON.stringify(data)
		};
		// POSTing to API
		const fetch_response = await fetch(api_url, options);

		// If statement to catch errors
		if (fetch_response.status >= 200 && fetch_response.status <= 299) {
			// Return response
			console.log('Added Job Role');
		} else {
			// Return NULL and log error
			console.log(fetch_response.status, ' | ', fetch_response.statusText, ' | Unable to add a Job Role');
		}
	} catch (err) {
		return 'Error: There was a problem adding the job role.';
	}
};

/* Method that adds a job role */
exports.addJobBand = async (jobBand) => {
	try {
		// API url for adding a job role
		var api_url = 'http://localhost:8080/api/addjobrole';
		// data from post request
		var data = jobBand;
		// creating POST request to POST to API
		const options = {
			method: 'POST',
			headers: {
				'Content-Type': 'application/json'
			},
			body: JSON.stringify(data)
		};
		// POSTing to API
		const fetch_response = await fetch(api_url, options);

		// If statement to catch errors
		if (fetch_response.status >= 200 && fetch_response.status <= 299) {
			// Return response
			console.log('Added Job Band');
		} else {
			// Return NULL and log error
			console.log(fetch_response.status, ' | ', fetch_response.statusText, ' | Unable to add a Job Band');
		}
	} catch (err) {
		return 'Error: There was a problem adding the job band.';
	}
};

/* Method that adds a job role */
exports.addJobCapbility = async (jobCapability) => {
	try {
		// API url for adding a job role
		var api_url = 'http://localhost:8080/api/addjobrole';
		// data from post request
		var data = jobCapability;
		// creating POST request to POST to API
		const options = {
			method: 'POST',
			headers: {
				'Content-Type': 'application/json'
			},
			body: JSON.stringify(data)
		};
		// POSTing to API
		const fetch_response = await fetch(api_url, options);

		// If statement to catch errors
		if (fetch_response.status >= 200 && fetch_response.status <= 299) {
			// Return response
			console.log('Added Job Capability');
		} else {
			// Return NULL and log error
			console.log(fetch_response.status, ' | ', fetch_response.statusText, ' | Unable to add a Job Capability');
		}
	} catch (err) {
		return 'Error: There was a problem adding the job Capability.';
	}
};