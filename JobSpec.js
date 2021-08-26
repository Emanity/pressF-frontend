const fetch = require('node-fetch');

exports.getJobSpec = async ( jobRoleID ) => {

    jobRoleID = jobRoleID;

    api_url = 'http://localhost:8080/api/getjobspec';

    const fetch_response = await fetch(api_url)
        if (fetch_response.status >= 200 && fetch_response.status <= 299) {
            
            console.log("Job Spec Fetched");
            return await fetch_response.json();

        }
        else {
            
        }
}